"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function Tasks({ initialTasks }: { initialTasks: Array<any> }) {
  console.log("initialTasks in Tasks component:", initialTasks);
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const channel = supabase
      .channel("tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks([...tasks, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setTasks(
              tasks.map((task) =>
                task.id === payload.new.id ? payload.new : task,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setTasks(tasks.filter((task) => task.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialTasks, tasks, setTasks]);

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}
