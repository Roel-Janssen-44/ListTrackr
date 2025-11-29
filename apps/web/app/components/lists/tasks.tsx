"use client";

import { useEffect, useState } from "react";
import { client, databases } from "@/lib/appwrite";
import { useAuth } from "@hooks";

export function TaskList({ serverTasks }: { serverTasks: any[] }) {
  const [clientTasks, setClientTasks] = useState<any[]>([]);

  const auth = useAuth();
  console.log("auth in TaskList:");
  console.log(auth);

  useEffect(() => {
    // fetch tasks initially
    async function fetchTasks() {
      try {
        const response = await databases.listDocuments({
          databaseId: "listtrackr",
          collectionId: "tasks",
        });
        setClientTasks(response.documents);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }

    fetchTasks();

    // Subscribe to realtime events
    const unsubscribe = client.subscribe(
      `databases.listtrackr.collections.tasks.documents`,
      (event) => {
        console.log("Realtime event:", event);

        if (
          event.events.includes("databases.*.collections.*.documents.*.create")
        ) {
          setClientTasks((prev) => [...prev, event.payload]);
        }

        if (
          event.events.includes("databases.*.collections.*.documents.*.update")
        ) {
          setClientTasks((prev) =>
            // @ts-expect-error
            prev.map((d) => (d.$id === event.payload.$id ? event.payload : d)),
          );
        }

        if (
          event.events.includes("databases.*.collections.*.documents.*.delete")
        ) {
          setClientTasks((prev) =>
            // @ts-expect-error
            prev.filter((d) => d.$id !== event.payload.$id),
          );
        }
      },
    );

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex w-full flex-row justify-between px-8">
      <div>
        <h2>Server tasks:</h2>
        <ul>
          {serverTasks.map((task, index) => (
            <li key={index}>
              {task.id} {task.id} {task.title} {task.Title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Client tasks:</h2>
        <ul>
          {clientTasks.map((task, index) => (
            <li key={index}>
              {task.id} {task.id} {task.title} {task.Title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
