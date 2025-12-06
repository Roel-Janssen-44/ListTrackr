"use client";

import { useState, useEffect } from "react";
import { Client, Databases } from "appwrite";

interface UseAppwriteClientReturn {
  client: Client;
  databases: Databases;
  ready: boolean;
}

export function useAppwriteClient(): UseAppwriteClientReturn | null {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/auth/jwt");
      if (!res.ok) return;

      const { jwt } = await res.json();

      const c = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setJWT(jwt);

      setClient(c);
    }

    init();
  }, []);

  if (!client) return null;

  return {
    client,
    databases: new Databases(client),
    ready: true,
  };
}

// "use client";

// import { useState, useEffect } from "react";
// import { Client, Databases, Account } from "appwrite";

// export function useAppwriteClient() {
//   const [client, setClient] = useState<Client | null>(null);

//   useEffect(() => {
//     async function init() {
//       const c = new Client()
//         .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//         .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

//       const account = new Account(c);

//       try {
//         await account.get();
//       } catch {
//         // await account.createAnonymousSession();
//         console.warn("No active session found.");
//       }

//       setClient(c);
//     }

//     init();
//   }, []);

//   if (!client) return null;

//   return {
//     client,
//     databases: new Databases(client),
//     ready: true,
//   };
// }
