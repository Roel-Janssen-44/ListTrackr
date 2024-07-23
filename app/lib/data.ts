import { sql } from '@vercel/postgres';
import { auth } from 'auth';

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
