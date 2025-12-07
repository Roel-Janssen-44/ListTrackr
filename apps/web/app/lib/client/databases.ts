"use client";

// RxDB imports
import {
  createRxDatabase,
  addRxPlugin,
  RxCollectionBase,
} from "rxdb/plugins/core";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { replicateAppwrite } from "rxdb/plugins/replication-appwrite";

// Appwrite imports
import { ID } from "appwrite";
import { client, appwriteConfig } from "./appwrite";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);

const journalSchema = {
  title: "journal entry schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
  },
  required: ["id", "title", "content", "createdAt", "updatedAt"],
};

let dbPromise: any = null;

export const getDB = async () => {
  if (dbPromise) return dbPromise;

  try {
    // Create the database
    dbPromise = createRxDatabase({
      name: "journals", // Name must match the database ID from Appwrite
      storage: getRxStorageDexie(),
    });

    const db = await dbPromise;

    // Add collections
    await db.addCollections({
      entries: {
        // Name must match the collection ID from Appwrite
        schema: journalSchema,
      },
    });

    // Set up replication
    await setupReplication(db);

    return db;
  } catch (error) {
    console.error("Database creation error:", error);
    throw error;
  }
};

const setupReplication = async (db: any) => {
  try {
    const replicationState = replicateAppwrite({
      replicationIdentifier: "journals-replication",
      client,
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.collectionId,
      deletedField: "deleted",
      collection: db.entries,
      pull: { batchSize: 25 },
      push: { batchSize: 25 },
    });

    replicationState.error$.subscribe((error: any) => {
      console.error("Replication error:", error);
    });

    replicationState.active$.subscribe((active: any) => {
      console.log("ReplicationState:", replicationState);
    });

    return replicationState;
  } catch (error) {
    console.error("Replication setup error:", error);
  }
};

export const getJournals = async () => {
  const db = await getDB();
  return db.entries.find().sort({ updatedAt: "desc" }).exec();
};

export const getJournal = async (id: any) => {
  const db = await getDB();
  return db.entries.findOne({ selector: { id } }).exec();
};

export const createJournal = async (journalData: any) => {
  const db = await getDB();
  const timestamp = Date.now();
  return db.entries.insert({
    id: ID.unique(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...journalData,
  });
};

export const updateJournal = async (id: any, journalData: any) => {
  const db = await getDB();
  const journal = await getJournal(id);

  if (!journal) throw new Error("Journal entry not found");
  return journal.update({
    $set: {
      ...journalData,
      updatedAt: Date.now(),
    },
  });
};

export const deleteJournal = async (id: any) => {
  const db = await getDB();
  const journal = await getJournal(id);

  if (!journal) throw new Error("Journal entry not found");

  return journal.remove();
};
