import { TaskList } from "@components/lists";
import { getTasks } from "@/queries";

export default async function Dashboard() {
  const tasks = await getTasks();

  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <TaskList serverTasks={tasks} />
    </div>
  );
}
