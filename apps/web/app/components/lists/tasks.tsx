"use client";

import { useEffect, useState } from "react";

export default function Tasks({ initialTasks }: { initialTasks: Array<any> }) {
  console.log("initialTasks in Tasks component:", initialTasks);
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}
