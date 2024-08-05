import { sql } from '@vercel/postgres';
import { auth } from 'auth';
import { Customer, InvoiceTemplate } from '@/app/lib/definitions';
// import { unstable_noStore as noStore } from 'next/cache';

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
      SELECT * FROM tasks
      WHERE date = CURRENT_DATE
      AND user_id = ${userId} 
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
    SELECT * FROM tasks
    WHERE date < CURRENT_DATE
    AND (status IS DISTINCT FROM 'completed' OR status IS NULL)
    AND user_id = ${userId}
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
      SELECT * FROM tasks
      WHERE date = CURRENT_DATE + INTERVAL '1 day'
      AND user_id = ${userId} 
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
      SELECT * FROM tasks
      WHERE "type" = 'goal'
      AND user_id = ${userId} 
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
      select id, name, email from customers
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;
    return data.rows;
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
    const data = await sql`
      select id, templatename from invoices
      WHERE user_id = ${userId} AND status IS NULL
    `;
    return data.rows;
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
    const data = await sql`
      select templatename, message, discounttype, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix
      from invoices
      where id = ${invoiceId}
    `;

    const {
      templateName,
      message,
      discounttype,
      discountamount,
      taxsetting,
      taxamount,
      invoicebase,
      invoiceappendix,
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: templateName,
      fieldGroups: [],
      message: message,
      settings: {
        discountType: discounttype,
        discountAmount: discountamount,
        taxSetting: taxsetting,
        taxAmount: taxamount,
        invoiceBase: invoicebase,
        invoiceAppendix: invoiceappendix,
      },
    };

    return invoiceTemplate;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}

// try {
//   // Step 1: Fetch the invoice
//   const invoiceData = await sql`
//     select templatename, message, amount, status, datecreated, datepayed, project_id, payed_by
//     from invoices
//     where id = ${invoiceId}
//   `;

//   console.log('invoiceData');
//   console.log(invoiceData);
// if (invoiceData.rowCount === 0) {
//   throw new Error('Invoice not found.');
// }

// const invoice = invoiceData.rows[0];

// // Step 2: Fetch the field groups for the invoice
// const fieldGroupsData = await sql`
//   select id, name, position
//   from invoicefieldgroups
//   where invoice_id = ${invoiceId}
// `;

// const fieldGroups = fieldGroupsData.rows;

// // Step 3: Fetch the fields for each field group
// const fieldGroupsWithFields = await Promise.all(
//   fieldGroups.map(async (group) => {
//     const fieldsData = await sql`
//     select id, name, data, value
//     from invoicefields
//     where field_group_id = ${group.id}
//   `;
//     return {
//       id: group.id,
//       name: group.name,
//       position: group.position,
//       fields: fieldsData.rows.map((field) => ({
//         id: field.id,
//         name: field.name,
//         data: field.data || '',
//         value: field.value || '',
//       })),
//     };
//   }),
// );

// // Combine all data into a single object with the desired structure
// const tempInvoice = {
//   id: invoice.id,
//   name: invoice.templatename || 'Template name',
//   fieldGroups: fieldGroupsWithFields,
//   message: invoice.message || '',
//   settings: {
//     discountType: invoice.settings?.discountType || 'none',
//     discountAmount: invoice.settings?.discountAmount || 0,
//     taxSetting: invoice.settings?.taxSetting || 'incl',
//     taxAmount: invoice.settings?.taxAmount || 0,
//     invoiceBase: invoice.settings?.invoiceBase || '',
//     invoiceAppendix: invoice.settings?.invoiceAppendix || '',
//     // Include other settings as needed
//   },
// };

// return tempInvoice;
// } catch (err) {
//   console.error('Database Error:', err);
//   throw new Error('Failed to fetch invoice template.');
// }
// }

// Invoice templates
// export async function getInvoiceTemplates() {
//   const session = await auth();
//   const userId = session?.user?.id;
//   if (!userId) return;

//   // try {
//   //   const data = await sql`
//   //     select id, name, description, amount from invoice_templates
//   //     WHERE user_id = ${userId}
//   //   `;
//   //   return data.rows;
//   // } catch (err) {
//   //   console.error('Database Error:', err);
//   //   throw new Error('Failed to fetch all invoices.');
//   // }
// }
