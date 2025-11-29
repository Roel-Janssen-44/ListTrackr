import { ID, Client, Account, Databases, Realtime } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const realtime = new Realtime(client);

export { ID, client, account, databases, realtime };

// const sdk = require("node-appwrite");
// const config = {
//   project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
//   endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
//   key: "standard_90708d13134201a529b4c6da2eae0d67f1b14b92790f3db9fec290517dfcdf7c6d5fd43e9b49e3158d614465ca9a87ff9f539298002e4ffe3890d39de8fa036abfbec151322964f17c56664e53da57d9e88e849c745eaf2ca6f801a5c5e703a8510478e6797ad4f6c9767ecfdc1f1c794355ff3f19659f711449110e562f0a48",
// };

// // Init SDK
// const client = new sdk.Client();

// const database = new sdk.Database(client);

// client
//   .setSelfSigned(true)
//   .setProject(config.project)
//   .setKey(config.key)
//   // .setJWT('jwt') // set this to authenticate using JWT
//   .setEndpoint(config.endpoint);

// const collectionName = "tasks";
// const read = ["role:all"];
// const write = ["role:all"];

// const promise = database.createCollection(collectionName, read, write);

// promise.then(
//   function (response) {
//     console.log("success");
//     database.createBooleanAttribute(
//       response.$id,
//       "completed",
//       true,
//       false,
//       false,
//     );
//     database.createStringAttribute(response.$id, "text", 255, true, "", false);
//   },
//   function (error) {
//     console.log("error", error.type, error.message);
//   },
// );
