'use server';

import { sql } from '@vercel/postgres';
import { auth } from 'auth';
import { Customer, InvoiceTemplate, Project } from '@/app/lib/definitions';
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
      tables.title AS table_title
    FROM tasks
    FULL JOIN tables on tasks.table_id = tables.id
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
      tables.title AS table_title
    FROM tasks
    FULL JOIN tables on tasks.table_id = tables.id
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
      select id, amount, invoice_number, status, datecreated from invoices
      WHERE user_id = ${userId} AND status IS NOT NULL
    `;
    const invoices = data.rows.map((invoice) => ({
      id: invoice.id,
      number: invoice.invoice_number,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.datecreated,
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
      select message, discounttype, templatename, discountamount, taxsetting, taxamount, invoicebase, invoiceappendix, customer_id
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
    } = data.rows[0];

    const invoiceTemplate: InvoiceTemplate = {
      id: invoiceId,
      name: templatename,
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

// Projects

export async function fetchProjects() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  try {
    const data = await sql`
      select id, title, startdate, enddate, status, customer_id, project_number from projects
      WHERE user_id = ${userId}
    `;
    const projects: Project[] = data.rows.map((project) => ({
      id: project.id,
      title: project.title,
      number: project.project_number,
      startDate: project.startdate,
      endDate: project.enddate,
      status: project.status,
      customer_id: project.customer_id,
    }));

    return projects;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all projects.');
  }
}

export async function fetchProject(projectId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return;

  if (!projectId) return;

  try {
    const data = await sql`
      SELECT
        id,
        title,
        startdate,
        enddate,
        status,
        user_id,
        customer_id,
        project_number
      from projects
      where id = ${projectId}
    `;

    const project: Project = {
      id: projectId,
      title: data.rows[0].title,
      number: data.rows[0].project_number,
      startDate: data.rows[0].startdate,
      endDate: data.rows[0].enddate,
      status: data.rows[0].status,
      customer_id: data.rows[0].customer_id,
    };

    return project;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch invoice template.');
  }
}
