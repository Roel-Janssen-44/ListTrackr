"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/local-first-test/databases";

export default function JournalClient() {
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

  return <pre>{JSON.stringify(journals, null, 2)}</pre>;
}
