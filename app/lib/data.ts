'use server';

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

export async function fetchInvoices() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      select id, amount from invoices
      WHERE user_id = ${userId} AND status='created'
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
    const rowCount = await sql`
      SELECT count(*) AS exact_count FROM invoices where user_id='5' AND status IS NOT NULL;
    `;

    const data = await sql`
      select templatename, message, discounttype, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix
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
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: templateName,
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
      select message, discounttype, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix, customer_id
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
      message,
      discounttype,
      discountamount,
      taxsetting,
      taxamount,
      invoicebase,
      invoiceappendix,
      customer_id,
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: '',
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
      },
    };

    return invoiceTemplate;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}
