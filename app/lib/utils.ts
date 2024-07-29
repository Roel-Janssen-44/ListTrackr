import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { v4 as uuid } from 'uuid';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Invoice functions

export function getCurrentFieldGroup(fieldGroups, fieldGroupName) {
  const result = fieldGroups.filter(
    (fieldGroup) => fieldGroup.name == fieldGroupName,
  );
  return result[0].fields;
}

export function addFieldToFieldGroup({
  invoice,
  setInvoice,
  fieldGroupName,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  fieldGroupName:
    | 'logo'
    | 'company'
    | 'client'
    | 'invoiceNumber'
    | 'rowDescription'
    | 'rows'
    | 'total';
}) {
  const updatedFieldGroups = invoice.fieldGroups.map((fieldGroup) => {
    if (fieldGroup.name === fieldGroupName) {
      return {
        ...fieldGroup,
        fields: [
          ...fieldGroup.fields,
          {
            id: uuid(),
            name: '',
          },
        ],
      };
    }
    return fieldGroup;
  });
  setInvoice({
    ...invoice,
    fieldGroups: [...updatedFieldGroups],
  });
}

export function removeFieldFromFieldGroup({
  invoice,
  setInvoice,
  fieldGroupName,
  fieldId,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  fieldGroupName:
    | 'logo'
    | 'company'
    | 'client'
    | 'invoiceNumber'
    | 'rowDescription'
    | 'rows'
    | 'total';
  fieldId: string;
}) {
  const updatedFieldGroups = invoice.fieldGroups.map((fieldGroup) => {
    if (fieldGroup.name === fieldGroupName) {
      return {
        ...fieldGroup,
        fields: fieldGroup.fields.filter((field) => field.id !== fieldId),
      };
    }
    return fieldGroup;
  });
  setInvoice({
    ...invoice,
    fieldGroups: [...updatedFieldGroups],
  });
}

export function editFieldInFieldGroup({
  invoice,
  setInvoice,
  fieldGroupName,
  fieldId,
  newValue,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  fieldGroupName:
    | 'logo'
    | 'company'
    | 'client'
    | 'invoiceNumber'
    | 'rowDescription'
    | 'rows'
    | 'total';
  fieldId: string;
  newValue: string;
}) {
  const updatedFieldGroups = invoice.fieldGroups.map((fieldGroup) => {
    if (fieldGroup.name === fieldGroupName) {
      return {
        ...fieldGroup,
        fields: fieldGroup.fields.map((field) => {
          if (field.id === fieldId) {
            return {
              ...field,
              name: newValue,
            };
          }
          return field;
        }),
      };
    }
    return fieldGroup;
  });
  setInvoice({
    ...invoice,
    fieldGroups: [...updatedFieldGroups],
  });
}
