/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface Accounts {
  access_token: string | null;
  expires_at: Int8 | null;
  id: Generated<number>;
  id_token: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  userId: number;
}

export interface Comments {
  content: string;
  date: Timestamp;
  id: Generated<string>;
  project_id: string | null;
  title: string;
}

export interface Customers {
  country: string | null;
  email: string;
  housenumber: string | null;
  id: Generated<string>;
  name: string;
  phone_number: string | null;
  postalcode: string | null;
  streetname: string | null;
  user_id: number | null;
}

export interface Invoicefieldgroups {
  id: Generated<string>;
  invoice_id: string | null;
  name: string;
  position: number | null;
}

export interface Invoicefields {
  amount: Numeric | null;
  data: string | null;
  field_group_id: string | null;
  id: Generated<string>;
  name: string | null;
  price: Numeric | null;
  value: string | null;
}

export interface Invoices {
  amount: Numeric | null;
  customer_id: string | null;
  datecreated: Timestamp | null;
  datepayed: Timestamp | null;
  discountamount: Numeric | null;
  discounttype: string | null;
  id: Generated<string>;
  invoice_number: string | null;
  invoice_template_id: string | null;
  invoiceappendix: string | null;
  invoicebase: string | null;
  logo_url: string | null;
  message: string | null;
  project_id: string | null;
  status: string | null;
  taxamount: Numeric | null;
  taxsetting: string | null;
  templatename: string | null;
  theme_color: string | null;
  user_id: number | null;
}

export interface Projects {
  customer_id: string | null;
  enddate: Timestamp | null;
  id: Generated<string>;
  project_number: string | null;
  startdate: Timestamp | null;
  status: string;
  title: string;
  user_id: Generated<number>;
}

export interface Revenue {
  month: string;
  revenue: number;
}

export interface Sessions {
  expires: Timestamp;
  id: Generated<number>;
  sessionToken: string;
  userId: number;
}

export interface Tables {
  id: Generated<string>;
  title: string;
  type: string | null;
  user_id: number;
}

export interface TaskCompletions {
  completion_date: Timestamp;
  id: Generated<string>;
  task_id: string;
}

export interface Tasks {
  completed: boolean | null;
  date: Timestamp | null;
  daysperweek: number | null;
  description: string | null;
  id: Generated<string>;
  order: Generated<number | null>;
  parent_id: string | null;
  priority: Generated<string | null>;
  project_id: string | null;
  repeat: boolean | null;
  status: string | null;
  table_id: string | null;
  title: string;
  type: string | null;
  user_id: number;
}

export interface Users {
  email: string | null;
  emailVerified: Timestamp | null;
  id: Generated<number>;
  image: string | null;
  name: string | null;
}

export interface VerificationToken {
  expires: Timestamp;
  identifier: string;
  token: string;
}

export interface DB {
  accounts: Accounts;
  comments: Comments;
  customers: Customers;
  invoicefieldgroups: Invoicefieldgroups;
  invoicefields: Invoicefields;
  invoices: Invoices;
  projects: Projects;
  revenue: Revenue;
  sessions: Sessions;
  tables: Tables;
  task_completions: TaskCompletions;
  tasks: Tasks;
  users: Users;
  verification_token: VerificationToken;
}
