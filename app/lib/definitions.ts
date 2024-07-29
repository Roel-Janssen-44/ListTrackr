export type Task = {
  id: string;
  title: string;
  completed: boolean;
  status: '' | 'planned' | 'working on it' | 'done' | 'stuck';
  priority: '' | 'low' | 'medium' | 'high';
  date?: string;
  table_id: string;
};

export type Goal = Task & {
  repeat?: boolean;
  daysPerWeek?: string;
  completedDates?: { day: string; date: Date; id: string }[];
};

export type Table = {
  id: string;
  title: string;
  tasks?: Task[];
  goals?: Goal[];
  type: 'task' | 'goal';
};

export type Project = {
  id: string;
  title: string;
  number: string;
  startDate: string;
  endDate?: string;
  // Todo - Status misschien nog aanpassen
  status: 'waiting' | 'in progress' | 'completed';
  user_id: string;
  customer_id: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
  country?: string;
};

export type Invoice = {
  id: string;
  number: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  project_id: string;
};

// Todo - Invoice template
export type InvoiceTemplate = {
  id: string;
  name: string;
  fieldGroups: FieldGroup[];
  message: string;
  settings: [
    {
      discountType: 'none' | 'percentage' | 'amount';
    },
    {
      discountAmount: number;
    },
    {
      taxSetting: 'excl' | 'incl';
    },
    {
      taxAmount: 21 | 9 | 0;
    },
    {
      invoiceBase: string;
    },
    {
      invoiceAppendix: string;
    },
  ];
};

export type FieldGroup = {
  id: string;
  name:
    | 'logo'
    | 'company'
    | 'client'
    | 'invoiceNumber'
    | 'rowDescription'
    | 'rows'
    | 'total';
  position?: number;
  fields: Field[];
};

export type Field = {
  id: string;
  name?: string;
  data?: string;
  value?: string;
  price?: number;
  amount?: number;
};

export type Comment = {
  id: string;
  title: string;
  date: string;
  content: string;
  project_id: string;
};
