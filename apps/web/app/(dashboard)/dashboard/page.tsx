import { TaskList } from "@components/lists";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { getTasks } from "@/queries";

export default async function Dashboard() {
  const user = await getLoggedInUser();

  const tasks = await getTasks();
  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <TaskList serverTasks={tasks} />
    </div>
  );
}
