"use client";

import { useEffect, useState } from "react";
import { useAppwriteClient } from "@/hooks/appwrite-client";
import { Realtime } from "appwrite";

const databaseId = "692f35d50020eb18445f";
const collectionId = "692f35df00138a2df0b2";

export function TaskList({ serverTasks }: { serverTasks: any[] }) {
  const [clientTasks, setClientTasks] = useState<any[]>([]);

  const appwriteClient = useAppwriteClient();
  const { client, databases, ready } = appwriteClient || {};

  useEffect(() => {
    if (!ready) return;

    if (!databases || !client) return;

    // async function fetchTasks() {
    //   try {
    //     if (!databases) return;
    //     const res = await databases.listDocuments("listtrackr", "tasks");
    //     setClientTasks(res.documents);
    //   } catch (err) {
    //     console.error("Failed to fetch tasks:", err);
    //   }
    // }

    // fetchTasks();

    console.log("client");
    console.log(client);
    // realtime subscription
    const realtime = new Realtime(client);
    realtime.subscribe(
      `databases.${databaseId}.collections.${collectionId}.documents.*`,
      (event) => {
        console.log("Realtime event:", event);

        if (event.events.some((e) => e.includes(".create"))) {
          setClientTasks((prev) => [...prev, event.payload]);
        }

        if (event.events.some((e) => e.includes(".update"))) {
          setClientTasks((prev) =>
            prev.map((doc) =>
              doc.$id === event.payload.$id ? event.payload : doc,
            ),
          );
        }

        if (event.events.some((e) => e.includes(".delete"))) {
          setClientTasks((prev) =>
            prev.filter((doc) => doc.$id !== event.payload.$id),
          );
        }
      },
    );

    // return () => unsubscribe();
  }, [ready]);

  return (
    <div className="flex w-full flex-row justify-between">
      <div>
        <h2>Server tasks:</h2>
        <ul>
          {serverTasks.map((task, index) => (
            <li key={index}>{task.title ?? task.Title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Client tasks:</h2>
        <ul>
          {clientTasks.map((task, index) => (
            <li key={index}>{task.title ?? task.Title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
