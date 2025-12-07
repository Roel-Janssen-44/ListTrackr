"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/client/databases";

export function JournalList() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    let subscription: any;

    async function setup() {
      const db = await getDB();

      const query = db.entries.find().sort({ updatedAt: "desc" });

      setJournals(await query.exec());

      subscription = query.$.subscribe(async () => {
        const updated = await query.exec();
        setJournals(updated);
      });
    }

    setup();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // return <pre>{JSON.stringify(journals, null, 2)}</pre>;

  return (
    <div>
      {journals.map((journal, index) => (
        <div key={index}>
          {/* @ts-expect-error */}
          <h5>{journal._data.name}</h5>
        </div>
      ))}
    </div>
  );
}
