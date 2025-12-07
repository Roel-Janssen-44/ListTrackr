import { TaskList } from "@components/lists";
// import { getTasks } from "@/queries";
import { CreateTaskForm } from "@components/forms";

export default async function Dashboard() {
  // const tasks = await getTasks();

  return (
    <div className="container mx-auto px-4">
      <h1>Welcome to the dashboard</h1>
      {/* <TaskList serverTasks={tasks} /> */}
      <CreateTaskForm />
    </div>
  );
}
