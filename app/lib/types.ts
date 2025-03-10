export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: '' | 'planned' | 'working on it' | 'done' | 'stuck';
  priority: '' | 'low' | 'medium' | 'high';
  date?: string;
  subTasks?: Task[];
  table_id: string;
  table_title?: string;
  project_title?: string;
  parent_id?: string;
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
  status: 'created' | 'waiting' | 'in progress' | 'completed';
  customer?: Customer;
  tasks?: Task[];
};

export type ProjectTasks = {
  id: string;
  title: string;
  tasks?: Task[];
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
  status: 'paid' | 'pending' | 'overdue' | 'created';
  date: string;
  project_id?: string;
};

export type InvoiceTemplate = {
  id: string;
  name: string;
  logo: string;
  fieldGroups: FieldGroup[];
  message: string;
  customerId?: string;
  invoiceCount?: number;
  settings: {
    discountType: 'none' | 'percentage' | 'amount' | '';
    discountAmount: number;
    taxSetting: 'excl' | 'incl';
    taxAmount: '21' | '9' | '0' | '';
    invoiceBase: string;
    invoiceAppendix: string;
    themeColor: string;
  };
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

export type InvoiceTemplateName = {
  id: string;
  name: string;
};
