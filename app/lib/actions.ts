'use server';

import { auth } from 'auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { v4 as uuid } from 'uuid';
import { format, startOfWeek, addDays } from 'date-fns';
import { Customer, InvoiceTemplate } from '@/app/lib/definitions';
import { getCurrentFieldGroup } from '@/app/lib/utils';
import { calculateSubTotal, calculateInvoice } from '@/app/lib/utils';

import db from './db';

const TableSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
});

const CreateTable = TableSchema.omit({ id: true, type: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type TableState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function editUser(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const title = formData.get('username');

  try {
    await sql`
      UPDATE users
      SET name = ${title.toString()}
      WHERE id = ${userId};
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Table.',
    };
  }

  revalidatePath('/dashboard');
}

export async function createTable(
  tableType: string,
  prevState: TableState,
  formData: FormData,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const validatedFields = CreateTable.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Table.',
    };
  }
  const { title } = validatedFields.data;

  try {
    await sql`
      INSERT INTO tables (title, type, user_id)
      VALUES (${title}, ${tableType}, ${userId})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Table.',
    };
  }

  revalidatePath('/dashboard');
  if (tableType === 'task') {
    revalidatePath('/dashboard/tasks');
  } else if (tableType === 'goal') {
    revalidatePath('/dashboard/goals');
  }
}

export type TaskState = {
  errors?: {
    title: string[];
    priority?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function createTask(
  project_id: string,
  table_id: string,
  type: string,
  prevState: TaskState,
  formData: FormData,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const generatedId = formData.get('generatedId');
  const title = formData.get('title');
  const date = formData.get('date').toString();
  let status = '';
  let setDate: string | null;
  if (date == 'today') {
    const currentDate = new Date();
    setDate = currentDate.toDateString();
    status = 'planned';
  } else if (date == 'tomorrow') {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate = tomorrow.toDateString();
    status = 'planned';
  } else {
    setDate = null;
  }

  if (typeof generatedId !== 'string') {
    return {
      errors: { Id: ['Id is required'] },
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return {
      errors: { title: ['Title is required'] },
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  if (title.length < 3 || title.length > 100) {
    return {
      errors: { title: ['Title must be between 3 and 100 characters'] },
      message: 'Validation Error. Failed to Create Task.',
    };
  }

  try {
    await sql`
      INSERT INTO tasks (id, title, table_id, project_id, type, user_id, date, status)
      VALUES (${generatedId}, ${title}, ${table_id}, ${project_id}, ${type}, ${userId}, ${setDate}, ${status})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }
  revalidatePath('/dashboard');
  revalidatePath('/layout');
}

export async function updateTask(
  tableId: string,
  taskId: string,
  prevState: TaskState,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const title = formData.get('title');

  if (typeof title == 'string' && title.length == 0) {
    try {
      const result = await db
        .deleteFrom('tasks')
        .where('id', '=', taskId)
        .execute();

      return {
        success: true,
        message: '',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to Update Task.',
      };
    }
  }

  const description = formData.get('description');
  let validatedDescription = '';
  const priority = formData.get('priority');
  const date = formData.get('date').toString();
  const completed = formData.get('completed');

  let validatedDate: string | null;
  if (date == '') {
    validatedDate = null;
  } else {
    validatedDate = new Date(date).toDateString();
  }

  let completedBool: boolean;
  if (completed == 'true') {
    completedBool = true;
  } else {
    completedBool = false;
  }

  if (typeof title != 'string') {
    return {
      success: false,
      message: 'Failed to update task cause of title type.',
    };
  }
  if (typeof priority != 'string') {
    return {
      success: false,
      message: 'Failed to update task cause of priority type.',
    };
  }

  if (typeof description != 'string') {
    validatedDescription = '';
  } else {
    validatedDescription = description;
  }

  const minLength = 3;
  const maxLength = 128;

  if (typeof title == 'string') {
    if (title.length > maxLength) {
      return {
        success: false,
        message: 'Failed to update task, to many characters.',
      };
    }
    if (title.length <= minLength) {
      return {
        success: false,
        message: 'Failed to update task, to few characters.',
      };
    }
  }

  try {
    // Completed
    if (completedBool) {
      sql`
      UPDATE tasks
      set
      title=${title},
      description=${validatedDescription},
      completed=true,
      priority=${priority},
      status='done',
      date=${validatedDate}
      WHERE id=${taskId}`;
      // Planned
    } else if (!completedBool && validatedDate != null) {
      sql`
      UPDATE tasks
      set 
      title=${title},
      description=${validatedDescription},
      completed=false,
      priority=${priority},
      status='planned',
      date=${validatedDate}
      WHERE id=${taskId}`;
      // Not planned
    } else {
      sql`
        UPDATE tasks
        set
        title=${title},
        description=${validatedDescription},
        completed=false,
        priority=${priority},
        status=null,
        date=null
        WHERE id=${taskId}`;
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while updating the task.',
    };
  }
  revalidatePath('/dashbaord');
  revalidatePath('/dashboard', 'layout');
  return { success: true, message: '' };
}

export type GoalState = {
  errors?: {
    title: string[];
    daysPerWeek?: string[];
  };
  message?: string | null;
};
export async function updateGoal(
  tableId: string,
  goalId: string,
  prevState: GoalState,
  formData: FormData,
) {
  const title = formData.get('title');
  const daysPerWeek = formData.get('daysPerWeek');

  if (typeof title != 'string') return;
  if (typeof daysPerWeek != 'string') return;
  const daysPerWeekInt = parseInt(daysPerWeek);

  try {
    sql`
    UPDATE tasks
    set
    title=${title},
    daysperweek=${daysPerWeekInt}
    WHERE id=${goalId}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Task.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
  revalidatePath('/dashboard/goals');
  // redirect('/dashboard/tasks');
}

export async function updateTableName(tableId: string, newValue: string) {
  try {
    await sql`
      UPDATE tables 
      SET title=${newValue} 
      WHERE id=${tableId}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Task.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
  revalidatePath('/dashboard/goals');
  // redirect('/dashboard/tasks');
}

export async function deleteTask(taskId: string) {
  try {
    await sql`
      DELETE FROM tasks WHERE id = ${taskId}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Task.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
  revalidatePath('/dashboard/goals');
  // redirect('/dashboard/tasks');
}

export async function deleteTable(tableId: string) {
  try {
    await sql`
      DELETE FROM "tables" WHERE id = ${tableId}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Task.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
  revalidatePath('/dashboard/goals');
  // redirect('/dashboard/tasks');
}

export type WeeklyTaskState = {
  errors?: {
    monday?: string[];
    tuesday?: string[];
    wednesday?: string[];
    thursday?: string[];
    friday?: string[];
    saturday?: string[];
    sunday?: string[];
  };
  message?: string | null;
};
export async function updateWeeklyTask(
  taskId: string,
  prevState: WeeklyTaskState,
  formData: FormData,
) {
  const day = formData.get('day');
  const completed = formData.get('completed');
  const completedId = formData.get('id');

  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const mondayDate = format(addDays(weekStart, 0), 'yyyy-MM-dd');
  const tuesdayDate = format(addDays(weekStart, 1), 'yyyy-MM-dd');
  const wednesdayDate = format(addDays(weekStart, 2), 'yyyy-MM-dd');
  const thursdayDate = format(addDays(weekStart, 3), 'yyyy-MM-dd');
  const fridayDate = format(addDays(weekStart, 4), 'yyyy-MM-dd');
  const saturdayDate = format(addDays(weekStart, 5), 'yyyy-MM-dd');
  const sundayDate = format(addDays(weekStart, 6), 'yyyy-MM-dd');

  let selectedDay: string;
  let isCompleted: boolean;
  if (completed == 'on') {
    isCompleted = true;
  } else {
    isCompleted = false;
  }
  if (day == 'monday') {
    selectedDay = mondayDate;
  } else if (day == 'tuesday') {
    selectedDay = tuesdayDate;
  } else if (day == 'wednesday') {
    selectedDay = wednesdayDate;
  } else if (day == 'thursday') {
    selectedDay = thursdayDate;
  } else if (day == 'friday') {
    selectedDay = fridayDate;
  } else if (day == 'saturday') {
    selectedDay = saturdayDate;
  } else if (day == 'sunday') {
    selectedDay = sundayDate;
  } else {
    throw new Error('Invalid day');
  }

  if (isCompleted) {
    try {
      sql`
      INSERT INTO task_completions (task_id, completion_date )
      VALUES (${taskId}, ${selectedDay})
      `;
    } catch (error) {
      console.log('error');
      console.log(error);
      return {
        message: 'Database Error: Failed to Update Task.',
      };
    }
  } else {
    if (completedId == null) return;
    completedId.toString();
    try {
      sql`
        DELETE FROM task_completions
        WHERE id=${String(completedId)}
      `;
    } catch (error) {
      console.log('error');
      console.log(error);
      return {
        message: 'Database Error: Failed to Update Task.',
      };
    }
  }

  revalidatePath('/dashboard');
}

// Customers

export async function createCustomer(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const name = formData.get('name').toString();
  const email = formData.get('email').toString();
  const phone = formData.get('phone').toString();
  const streetname = formData.get('streetname').toString() || '';
  const housenumber = formData.get('housenumber').toString() || '';
  const postalcode = formData.get('postalcode').toString() || '';
  const country = formData.get('country').toString() || '';

  try {
    sql`
    insert into customers(name, email, phone_number,streetname, housenumber, postalcode, country, user_id)
    VALUES (${name}, ${email}, ${phone}, ${streetname}, ${housenumber}, ${postalcode}, ${country}, ${userId})
    `;
    revalidatePath('/layout');
    return { success: true, message: '' };
  } catch (error) {
    console.log('error');
    console.log(error);
    return { success: false, message: 'Error creating customer' };
  }
}

export async function updateCustomer(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const id = formData.get('id').toString();
  const name = formData.get('name').toString();
  const email = formData.get('email').toString();
  const phone = formData.get('phone').toString();
  const streetname = formData.get('streetname').toString() || '';
  const housenumber = formData.get('housenumber').toString() || '';
  const postalcode = formData.get('postalcode').toString() || '';
  const country = formData.get('country').toString() || '';

  try {
    await sql`
      UPDATE customers
      SET name=${name},
      email=${email},
      phone_number=${phone},
      streetname=${streetname},
      housenumber=${housenumber},
      postalcode=${postalcode},
      country=${country}
      WHERE id=${id}
    `;
    revalidatePath('/layout');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to Update Task.',
    };
  }
}

export async function deleteCustomer(formData: FormData) {
  const id = formData.get('id').toString();
  try {
    await sql`
      DELETE FROM customers WHERE id = ${id}
    `;
    revalidatePath('/dashboard/customers');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to Update Task.',
    };
  }

  // revalidatePath('/dashboard/tasks');
  // revalidatePath('/dashboard/goals');
  // redirect('/dashboard/tasks');
}

export async function createInvoiceTemplate(invoice: InvoiceTemplate) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const { id, name, message, logo } = invoice;
  const {
    discountType,
    taxSetting,
    taxAmount,
    invoiceBase,
    invoiceAppendix,
    themeColor,
  } = invoice.settings;

  try {
    await sql`
    insert into invoices(id, templatename, message, discounttype, taxsetting, taxamount, invoicebase, invoiceappendix, user_id, logo_url, theme_color)
    VALUES (${id}, ${name}, ${message}, ${discountType}, ${taxSetting}, ${taxAmount}, ${invoiceBase}, ${invoiceAppendix}, ${userId}, ${logo}, ${themeColor})
    `;

    for (const fieldGroup of invoice.fieldGroups) {
      await sql`
      INSERT INTO invoicefieldgroups (id, invoice_id, name, position)
      VALUES (${fieldGroup.id}, ${id}, ${fieldGroup?.name}, ${fieldGroup?.position})
      `;

      for (const field of fieldGroup.fields) {
        await sql`
        INSERT INTO invoicefields (id, field_group_id, name, data, value, amount, price)
        VALUES (${field.id}, ${fieldGroup.id}, ${field?.name}, ${field?.data}, ${field?.value}, ${field?.amount}, ${field?.price})
        `;
      }
    }

    revalidatePath('/dashboard/invoices');
    return { success: true, message: '' };
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('invoicetemplate not created');
    return { success: false, message: 'Error creating invoice' };
  }
}

export async function updateInvoiceTemplate(invoice: InvoiceTemplate) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const { id, name, message, logo } = invoice;
  const {
    discountType,
    taxSetting,
    taxAmount,
    invoiceBase,
    invoiceAppendix,
    themeColor,
  } = invoice.settings;

  try {
    await sql`
      UPDATE invoices
      SET templatename = ${name},
          message = ${message},
          discounttype = ${discountType},
          taxsetting = ${taxSetting},
          taxamount = ${taxAmount},
          invoicebase = ${invoiceBase},
          invoiceappendix = ${invoiceAppendix},
          user_id = ${userId},
          logo_url = ${logo},
          theme_color = ${themeColor}
      WHERE id = ${id};
      `;

    for (const fieldGroup of invoice.fieldGroups) {
      await sql`
        UPDATE invoicefieldgroups
        SET name = ${fieldGroup?.name},
            position = ${fieldGroup?.position}
        WHERE id = ${fieldGroup.id} AND invoice_id = ${id};
        `;

      for (const field of fieldGroup.fields) {
        await sql`
          UPDATE invoicefields
          SET name = ${field?.name},
              data = ${field?.data},
              value = ${field?.value},
              amount = ${field?.amount},
              price = ${field?.price}
          WHERE id = ${field.id} AND field_group_id = ${fieldGroup.id};
          `;
      }
    }

    revalidatePath('/dashboard/invoices');
    // redirect('/dashboard/invoices', 'push');
    return { success: true, message: '' };
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('invoice template not updated');
    return { success: false, message: 'Error creating invoice' };
  }
}

export async function createInvoice(
  invoice: InvoiceTemplate,
  templateId: string,
  projectId?: string,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const { id, message, customerId, logo } = invoice;
  const {
    discountType,
    discountAmount,
    taxSetting,
    taxAmount,
    invoiceBase,
    invoiceAppendix,
    themeColor,
  } = invoice.settings;

  const invoiceCosts = calculateInvoice({
    subtotal: calculateSubTotal(
      getCurrentFieldGroup(invoice.fieldGroups, 'rows'),
    ),
    taxPercentage: invoice.settings.taxAmount,
    taxType: invoice.settings.taxSetting,
    discountAmount: invoice.settings.discountAmount || 0,
    discountType: invoice.settings.discountType,
  });

  const date = new Date().toISOString();
  const invoiceNumberFieldGroup = getCurrentFieldGroup(
    invoice.fieldGroups,
    'invoiceNumber',
  );

  const invoiceNumber = invoiceNumberFieldGroup[0].value;

  try {
    await sql`
    insert into invoices(id, invoice_number, project_id, message, amount, status, datecreated, discounttype, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix, user_id, customer_id, invoice_template_id, logo_url, theme_color)
    VALUES (${id}, ${invoiceNumber}, ${
      projectId ? projectId : null
    },${message}, ${
      invoiceCosts.total
    }, 'created', ${date}, ${discountType}, ${discountAmount}, ${taxSetting}, ${taxAmount}, ${invoiceBase}, ${invoiceAppendix}, ${userId}, ${customerId}, ${templateId}, ${logo}, ${themeColor})
    `;

    for (const fieldGroup of invoice.fieldGroups) {
      await sql`
      INSERT INTO invoicefieldgroups (id, invoice_id, name, position)
      VALUES (${fieldGroup.id}, ${id}, ${fieldGroup?.name}, ${fieldGroup?.position})
      `;

      for (const field of fieldGroup.fields) {
        await sql`
        INSERT INTO invoicefields (id, field_group_id, name, data, value, amount, price)
        VALUES (${field.id}, ${fieldGroup.id}, ${field?.name}, ${field?.data}, ${field?.value}, ${field?.amount}, ${field?.price})
        `;
      }
    }

    revalidatePath('/dashboard/invoices');
    return { success: true, message: '' };
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('invoice not created');
    return { success: false, message: 'Error creating invoice' };
  }
}

export async function updateInvoice(invoice: InvoiceTemplate) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const { id, message, customerId, logo } = invoice;
  const {
    discountType,
    discountAmount,
    taxSetting,
    taxAmount,
    invoiceBase,
    invoiceAppendix,
    themeColor,
  } = invoice.settings;

  getCurrentFieldGroup(invoice.fieldGroups, 'rows');
  const amount = calculateSubTotal(
    getCurrentFieldGroup(invoice.fieldGroups, 'rows'),
  );

  const date = new Date().toISOString();
  const invoiceNumberFieldGroup = getCurrentFieldGroup(
    invoice.fieldGroups,
    'invoiceNumber',
  );

  const invoiceNumber = invoiceNumberFieldGroup[0].value;

  try {
    await sql`
    UPDATE invoices
    SET invoice_number = ${invoiceNumber},
        message = ${message},
        amount = ${amount},
        status = 'created',
        datecreated = ${date},
        discounttype = ${discountType},
        discountamount = ${discountAmount},
        taxsetting = ${taxSetting},
        taxamount = ${taxAmount},
        invoicebase = ${invoiceBase},
        invoiceappendix = ${invoiceAppendix},
        user_id = ${userId},
        customer_id = ${customerId},
        logo_url = ${logo},
        theme_color = ${themeColor}
    WHERE id = ${id};
    `;

    for (const fieldGroup of invoice.fieldGroups) {
      await sql`
      UPDATE invoicefieldgroups
      SET name = ${fieldGroup?.name},
          position = ${fieldGroup?.position}
      WHERE id = ${fieldGroup.id} AND invoice_id = ${id};
      `;

      for (const field of fieldGroup.fields) {
        await sql`
        UPDATE invoicefields
        SET name = ${field?.name},
            data = ${field?.data},
            value = ${field?.value},
            amount = ${field?.amount},
            price = ${field?.price}
        WHERE id = ${field.id} AND field_group_id = ${fieldGroup.id};
        `;
      }
    }

    revalidatePath('/dashboard/invoices');
    return { success: true, message: '' };
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('invoice not updated');
    return { success: false, message: 'Error creating invoice' };
  }
}

export async function deleteInvoice(formData: FormData) {
  const id = formData.get('id').toString();
  try {
    await sql`
      DELETE FROM invoices WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to delete invoice.',
    };
  }
}

export async function updateInvoiceStatus({
  newValue,
  invoiceId,
}: {
  newValue: string;
  invoiceId: string;
}) {
  const id = invoiceId;
  const status = newValue;
  try {
    await sql`
      UPDATE invoices
      SET status=${status}
      WHERE id=${id}
    `;
    revalidatePath('/dashboard/invoices');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to update invoice status.',
    };
  }
}

// Projects

export async function createProject(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  const name = formData.get('name').toString();
  const number = formData.get('number').toString();
  let customerId = formData.get('customer').toString();
  const startDate = formData.get('start-date').toString();
  const endDate = formData.get('end-date').toString();

  if (customerId.toLowerCase() == 'me') {
    customerId = null;
  }

  try {
    const projectId = uuid();
    await sql`
    insert into projects(id, title, project_number, status, customer_id, user_id, startdate, enddate)
    VALUES (${projectId}, ${name}, ${number}, 'created' ,${customerId}, ${userId}, ${startDate}, ${endDate})
    `;
    revalidatePath('/layout');
    return { success: true, message: '', projectId: projectId };
  } catch (error) {
    console.log('error');
    console.log(error);
    alert(error);

    return { success: false, message: 'Error creating project' };
  }
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id').toString();
  try {
    await sql`
      DELETE FROM projects WHERE id = ${id}
    `;
    revalidatePath('/dashboard/projects');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to delete project.',
    };
  }
}

export async function updateProject(
  projectId: string,
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const title = formData.get('title').toString();
  const number = formData.get('number').toString();
  let customerId = formData.get('customer').toString();
  const status = formData.get('status').toString();
  const startDate = new Date(formData.get('startDate').toString());
  const endDate = formData.get('endDate')
    ? new Date(formData.get('endDate').toString())
    : null;

  if (customerId.toLowerCase() == 'me') {
    customerId = null;
  }

  try {
    const result = await db
      .updateTable('projects')
      .set({
        title,
        status,
        project_number: number,
        customer_id: customerId,
        startdate: startDate,
        enddate: endDate,
      })
      .where('id', '=', projectId)
      .executeTakeFirst();

    revalidatePath('/dashboard/projects');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to update project.',
    };
  }
}

export async function updateProjectTitle({
  projectId,
  newValue,
}: {
  projectId: string;
  newValue: string;
}) {
  try {
    const result = await db
      .updateTable('projects')
      .set({ title: newValue })
      .where('id', '=', projectId)
      .executeTakeFirst();

    revalidatePath('/dashboard/projects');
    return { success: true, message: '' };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database Error: Failed to update project title.',
    };
  }
}
