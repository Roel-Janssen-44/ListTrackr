'use server';

import { sql } from '@vercel/postgres';
import { auth } from 'auth';
import {
  Customer,
  InvoiceTemplate,
  Project,
  Task,
  Invoice,
  InvoiceTemplateName,
} from '@/app/lib/definitions';
// import { unstable_noStore as noStore } from 'next/cache';
import db from './db';

// Fetch tables
export async function fetchTables() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  try {
    const data = await sql`
      SELECT * FROM tables 
      WHERE type = 'task' 
      AND user_id = ${userId} 
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch tasks.');
  }
}
// Fetch goal tables
export async function fetchGoalTables() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      SELECT * FROM tables 
      WHERE type = 'goal'
      AND user_id = ${userId} 
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch tasks.');
  }
}

// Fetch tasks
export async function fetchTasks() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      SELECT * FROM tasks
      WHERE "type" = 'task'
      AND user_id = ${userId} 
      ORDER BY "order" ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// Fetch tasks of today
export async function fetchTasksToday() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      SELECT 
        tasks.id,
        tasks.title,
        tasks.completed,
        tasks.priority,
        tasks.date,
        tasks.daysperweek,
        tasks.table_id,
        tasks.status,
        tasks.order,
        tasks.type,
        tasks.user_id,
        tables.title AS table_title,
        projects.title AS project_title        
      FROM tasks
      FULL JOIN tables on tasks.table_id = tables.id
      FULL JOIN projects on tasks.project_id = projects.id
      WHERE date = CURRENT_DATE
      AND tasks.user_id = ${userId} 
      ORDER BY "order" ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// Fetch previoud incompleted tasks
export async function fetchPreviousTasks() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
    SELECT 
      tasks.id,
      tasks.title,
      tasks.completed,
      tasks.priority,
      tasks.date,
      tasks.daysperweek,
      tasks.table_id,
      tasks.status,
      tasks.order,
      tasks.type,
      tasks.user_id,
      tables.title AS table_title,
      projects.title AS project_title
    FROM tasks
    FULL JOIN tables on tasks.table_id = tables.id
    FULL JOIN projects on tasks.project_id = projects.id
    WHERE tasks.date < CURRENT_DATE
    AND (tasks.status IS DISTINCT FROM 'completed' OR tasks.status IS NULL)
    AND tasks.user_id = ${userId}
    ORDER BY "order" ASC
  `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// Fetch tasks for tomorrow
export async function fetchTasksTomorrow() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
    SELECT 
      tasks.id,
      tasks.title,
      tasks.completed,
      tasks.priority,
      tasks.date,
      tasks.daysperweek,
      tasks.table_id,
      tasks.status,
      tasks.order,
      tasks.type,
      tasks.user_id,
      tables.title AS table_title,
      projects.title AS project_title
    FROM tasks
    FULL JOIN tables on tasks.table_id = tables.id
    FULL JOIN projects on tasks.project_id = projects.id
      WHERE tasks.date = CURRENT_DATE + INTERVAL '1 day'
      AND tasks.user_id = ${userId} 
      ORDER BY "order" ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// Fetch goals
export async function fetchGoals() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
    SELECT 
      tasks.id,
      tasks.title,
      tasks.completed,
      tasks.priority,
      tasks.date,
      tasks.daysperweek,
      tasks.table_id,
      tasks.status,
      tasks.order,
      tasks.type,
      tasks.user_id,
      tables.title AS table_title
    FROM tasks
    FULL JOIN tables on tasks.table_id = tables.id
      WHERE tasks."type" = 'goal'
      AND tasks.user_id = ${userId} 
      ORDER BY "order" ASC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchCompletedTaskDatesThisWeek() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      SELECT * FROM task_completions 
      WHERE DATE_PART('week', completion_date) = DATE_PART('week', CURRENT_DATE)
      `;
    // To do - use inner join on tasks and filter by user_id
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// Customers
export async function fetchCustomers() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      select id, name, email, streetname, phone_number, housenumber, postalcode, country from customers
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;
    const customers: Customer[] = data.rows.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone_number,
      street: customer.streetname,
      houseNumber: customer.housenumber,
      postalCode: customer.postalcode,
      country: customer.country,
    }));
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomer(customerId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      select name, email, phone_number,streetname, housenumber, postalcode, country from customers
      WHERE id = ${customerId}
    `;
    const customer: Customer = {
      id: customerId,
      name: data.rows[0].name,
      email: data.rows[0].email,
      phone: data.rows[0].phone_number,
      street: data.rows[0].streetname,
      houseNumber: data.rows[0].housenumber,
      postalCode: data.rows[0].postalcode,
      country: data.rows[0].country,
    };
    return customer;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// Invoices
export async function fetchInvoiceTemplates() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await db
      .selectFrom('invoices')
      .select(['id', 'templatename'])
      .where('user_id', '=', userId as any)
      .where('status', 'is', null)
      .execute();

    const invoiceTemplatesNames: InvoiceTemplateName[] = data.map(
      (invoice) => ({
        id: invoice.id,
        name: invoice.templatename,
      }),
    );

    return invoiceTemplatesNames;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all invoices.');
  }
}

export async function fetchInvoices(): Promise<Invoice[] | undefined> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const invoicesData = await db
      .selectFrom('invoices')
      .select(['id', 'amount', 'invoice_number', 'status', 'datecreated'])
      .where('user_id', '=', userId as any)
      .where('status', 'is not', null)
      .orderBy('invoice_number', 'asc')
      .execute();

    const invoices = invoicesData.map((invoice) => ({
      id: invoice.id,
      number: invoice.invoice_number,
      amount: Number(invoice.amount),
      status: invoice.status as 'paid' | 'pending' | 'overdue' | 'created',
      date: invoice.datecreated?.toString() || '',
    }));

    return invoices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all invoices.');
  }
}

export async function fetchInvoiceTemplate(invoiceId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  if (!invoiceId) return;

  try {
    const rowCount = await sql`
      SELECT count(*) AS exact_count FROM invoices 
      WHERE user_id=${userId} 
      AND status IS NOT NULL
      AND invoice_template_id=${invoiceId};
    `;

    const data = await sql`
      select templatename, message, discounttype, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix, logo_url, theme_color
      from invoices
      where id = ${invoiceId}
    `;

    const fieldGroupsData = await sql`
      select id, name, position
      from invoicefieldgroups
      where invoice_id = ${invoiceId}
    `;

    const fieldGroups = fieldGroupsData.rows;

    const fieldGroupsWithFields = await Promise.all(
      fieldGroups.map(async (group) => {
        const fieldsData = await sql`
        select id, name, data, value
        from invoicefields
        where field_group_id = ${group.id}
      `;
        return {
          id: group.id,
          name: group.name,
          position: group.position,
          fields: fieldsData.rows.map((field) => ({
            id: field.id,
            name: field.name,
            data: field.data || '',
            value: field.value || '',
            price: field.price || '0',
            amount: field.amount || '0',
          })),
        };
      }),
    );

    const {
      templateName,
      message,
      discounttype,
      discountamount,
      taxsetting,
      taxamount,
      invoicebase,
      invoiceappendix,
      logo_url: templateLogo,
      theme_color: themeColor,
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: templateName,
      logo: templateLogo,
      fieldGroups: fieldGroupsWithFields,
      customerId: '',
      invoiceCount: Number(rowCount.rows[0].exact_count),
      message: message,
      settings: {
        discountType: discounttype,
        discountAmount: discountamount,
        taxSetting: taxsetting,
        taxAmount: taxamount,
        invoiceBase: invoicebase,
        invoiceAppendix: invoiceappendix,
        themeColor: themeColor,
      },
    };

    return invoiceTemplate;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}

export async function fetchInvoice(invoiceId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  if (!invoiceId) return;

  try {
    const data = await sql`
      select message, discounttype, templatename, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix, customer_id, logo_url, theme_color
      from invoices
      where id = ${invoiceId}
    `;

    const fieldGroupsData = await sql`
      select id, name, position
      from invoicefieldgroups
      where invoice_id = ${invoiceId}
    `;

    const fieldGroups = fieldGroupsData.rows;

    const fieldGroupsWithFields = await Promise.all(
      fieldGroups.map(async (group) => {
        const fieldsData = await sql`
        select id, name, data, value, price, amount
        from invoicefields
        where field_group_id = ${group.id}
      `;
        return {
          id: group.id,
          name: group.name,
          position: group.position,
          fields: fieldsData.rows.map((field) => ({
            id: field.id,
            name: field.name,
            data: field.data || '',
            value: field.value || '',
            price: field.price || '0',
            amount: field.amount || '0',
          })),
        };
      }),
    );

    const {
      message,
      discounttype,
      templatename,
      discountamount,
      taxsetting,
      taxamount,
      invoicebase,
      invoiceappendix,
      customer_id,
      logo_url: templateLogo,
      theme_color: themeColor,
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: templatename,
      logo: templateLogo,
      fieldGroups: fieldGroupsWithFields,
      customerId: customer_id,
      message: message,
      settings: {
        discountType: discounttype,
        discountAmount: discountamount,
        taxSetting: taxsetting,
        taxAmount: taxamount,
        invoiceBase: invoicebase,
        invoiceAppendix: invoiceappendix,
        themeColor: themeColor,
      },
    };

    return invoiceTemplate;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}

// Projects

export async function fetchProjects(): Promise<Project[] | undefined> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return undefined;

  try {
    const data = await db
      .selectFrom('projects')
      .innerJoin('customers', 'projects.customer_id', 'customers.id')
      .select([
        'projects.id',
        'projects.title',
        'projects.startdate',
        'projects.enddate',
        'projects.status',
        'projects.project_number as projectNumber',
        'customers.id as customerId',
        'customers.name as customerName',
        'customers.email as customerEmail',
        'customers.phone_number as customerPhone',
        'customers.postalcode as customerPostalCode',
        'customers.streetname as customerStreet',
        'customers.housenumber as customerHouseNumber',
        'customers.country as customerCountry',
      ])
      .where('projects.user_id', '=', userId as any)
      .execute();

    const projects: Project[] = data.map((project) => ({
      id: project.id,
      title: project.title,
      number: project.projectNumber,
      startDate: project.startdate?.toString() || '',
      endDate: project.enddate?.toString() || '',
      status: project.status as
        | 'completed'
        | 'created'
        | 'waiting'
        | 'in progress',

      customer: {
        id: project.customerId,
        name: project.customerName,
        email: project.customerEmail,
        phone: project.customerPhone,
        postalCode: project.customerPostalCode,
        street: project.customerStreet,
        houseNumber: project.customerHouseNumber,
        country: project.customerCountry,
      },
    }));

    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all projects.');
  }
}

export async function fetchProject(projectId: string): Promise<Project | null> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  if (!projectId) return;

  try {
    const projectDBData = await db
      .selectFrom('projects')
      .innerJoin('customers', 'projects.customer_id', 'customers.id')
      .select([
        'projects.id',
        'projects.title',
        'projects.startdate',
        'projects.enddate',
        'projects.status',
        'projects.project_number as projectNumber',
        'customers.id as customerId',
        'customers.name as customerName',
        'customers.email as customerEmail',
        'customers.phone_number as customerPhone',
        'customers.postalcode as customerPostalCode',
        'customers.streetname as customerStreet',
        'customers.housenumber as customerHouseNumber',
        'customers.country as customerCountry',
      ])
      .where('projects.user_id', '=', userId as any)
      .where('projects.id', '=', projectId)
      .execute();

    if (projectDBData.length === 0) {
      return null;
    }

    const projectData = projectDBData[0];

    const projectTasks = await db
      .selectFrom('tasks')
      .selectAll()
      .where('user_id', '=', userId as any)
      .where('project_id', '=', projectId)
      .execute();

    const tasks: Task[] = projectTasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      priority: task.priority as '' | 'low' | 'medium' | 'high',
      date: task.date?.toString() || '',
      table_id: task.table_id,
      status: task.status as
        | ''
        | 'planned'
        | 'working on it'
        | 'done'
        | 'stuck',
      order: task.order,
      type: task.type,
      user_id: task.user_id,
    }));

    const project: Project = {
      id: projectData.id,
      title: projectData.title,
      number: projectData.projectNumber,
      startDate: projectData.startdate?.toString() || '',
      endDate: projectData.enddate?.toString() || '',
      status: projectData.status as
        | 'completed'
        | 'created'
        | 'waiting'
        | 'in progress',
      customer: {
        id: projectData.customerId,
        name: projectData.customerName,
        email: '',
        phone: '',
        postalCode: '',
        street: '',
        houseNumber: '',
        country: '',
      },
      tasks: tasks,
    };

    return project;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}

export async function fetchProjectInvoices(
  projectId: string,
): Promise<Invoice[] | null> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;
  if (!projectId) return;

  try {
    const invoicesData = await db
      .selectFrom('invoices')
      .select(['id', 'amount', 'invoice_number', 'status', 'datecreated'])
      .where('user_id', '=', userId as any)
      .where('project_id', '=', projectId)
      .execute();

    const invoices: Invoice[] = invoicesData.map((invoice) => ({
      id: invoice.id,
      number: invoice.invoice_number,
      amount: Number(invoice.amount),
      status: invoice.status as 'paid' | 'pending' | 'overdue' | 'created',
      date: invoice.datecreated.toString(),
    }));

    return invoices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}

export async function fetchProjectsTasks(): Promise<
  | {
      id: string;
      title: string;
      tasks: Task[];
    }[]
  | null
> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await db
      .selectFrom('projects')
      .leftJoin('tasks', 'tasks.project_id', 'projects.id')
      .select([
        'projects.id as projectId',
        'projects.title as projectTitle',
        'tasks.id as taskId',
        'tasks.title as taskTitle',
        'tasks.completed',
        'tasks.priority',
        'tasks.date',
        'tasks.table_id',
        'tasks.status',
        'tasks.order',
        'tasks.type',
        'tasks.user_id',
      ])
      .where('projects.user_id', '=', userId as any)
      .execute();

    const projects: { title: string; id: string; tasks: Task[] }[] =
      data.reduce(
        (acc, row) => {
          let project = acc.find((p) => p.id === row.projectId);

          if (!project) {
            project = {
              id: row.projectId,
              title: row.projectTitle,
              tasks: [],
            };
            acc.push(project);
          }

          if (row.taskId) {
            project.tasks.push({
              id: row.taskId,
              title: row.taskTitle,
              completed: row.completed,
              priority: row.priority as '' | 'low' | 'medium' | 'high',
              date: row.date ? row.date.toString() : '',
              table_id: row.table_id,
              status: row.status as
                | ''
                | 'planned'
                | 'working on it'
                | 'done'
                | 'stuck',
            });
          }

          return acc;
        },
        [] as { id: string; title: string; tasks: Task[] }[],
      );

    return projects;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks from projects.');
  }
}
