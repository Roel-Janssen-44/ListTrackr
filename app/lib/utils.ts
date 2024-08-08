import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InvoiceTemplate, Field } from '@/app/lib/definitions';
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

export function editFieldValueInFieldGroup({
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
              value: newValue,
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

export function editFieldPriceInFieldGroup({
  invoice,
  setInvoice,
  fieldGroupName,
  fieldId,
  newValue,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  fieldGroupName: 'rows';
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
              price: newValue,
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
export function editFieldAmountInFieldGroup({
  invoice,
  setInvoice,
  fieldGroupName,
  fieldId,
  newValue,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  fieldGroupName: 'rows';

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
              amount: newValue,
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

export function editInvoiceSetting({
  invoice,
  setInvoice,
  settingName,
  newValue,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  settingName: 'taxAmount';
  newValue: string;
}) {
  setInvoice({
    ...invoice,
    settings: {
      ...invoice.settings,
      [settingName]: newValue,
    },
  });
}

export function handleTaxAmountChange({
  invoice,
  setInvoice,
  targetId,
  newValue,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
  targetId: string;
  newValue: string;
}) {
  const updatedFieldGroups = invoice.fieldGroups.map((fieldGroup) => {
    if (fieldGroup.name === 'total') {
      return {
        ...fieldGroup,
        fields: fieldGroup.fields.map((field) => {
          if (field.id === targetId) {
            return {
              ...field,
              value: newValue,
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
    settings: {
      ...invoice.settings,
      ['taxAmount']: newValue,
    },
  });
}
// Currency functions

export function convertToCurrency(amount) {
  // Remove spaces from the input
  const value =
    typeof amount === 'string' ? amount.replace(/\s/g, '') : amount.toString();

  // Remove Euro sign if present
  const sanitizedValue = value.replace('€', '');

  // Parse the value as a number
  const parsedValue = parseFloat(sanitizedValue);

  // Check if the parsed value is a valid number
  if (isNaN(parsedValue)) {
    console.error('Invalid amount:', amount);
    return '';
  }

  // Convert the number to a formatted currency string
  const formattedValue = parsedValue.toLocaleString('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });

  // Add a space after the Euro sign
  const euroSignIndex = formattedValue.indexOf('€');
  if (euroSignIndex !== -1) {
    const euroSignPosition = euroSignIndex + 1;
    const formattedOutput = `${formattedValue.slice(
      0,
      euroSignPosition,
    )} ${formattedValue.slice(euroSignPosition)}`;
    return formattedOutput;
  }

  return formattedValue;
}

export function removeNonNumericCharacters(value) {
  if (value === null) return 0;
  // Remove dots while keeping commas and numbers, excluding zero at the beginning
  const cleanedValue = value.replace(/[^0-9,]/g, '');

  // Remove leading zeros if present, except when followed by a comma
  const trimmedValue = cleanedValue.replace(/^0+(?!,)/, '');

  return trimmedValue;
}

export function convertToAmount(inputValue) {
  // Remove all characters except numbers, dot and comma
  const cleanedValue = inputValue.replace(/[^\d,.]/g, '');

  // Replace dot with comma for decimal parsing
  const parsedValue = cleanedValue.replace(',', '.');

  const roundedValue = parseFloat(parsedValue).toFixed(1).replace('.', ',');

  const lastDigit = roundedValue.slice(-1); // Get the last digit

  let finalValue = '';
  if (lastDigit === '0') {
    finalValue = roundedValue.slice(0, -2);
  } else {
    finalValue = roundedValue;
  }
  return finalValue;
}

export function convertToNumber(value) {
  const tempValue = String(value);
  const pattern = /[^\d,.]/g;
  const replacement = '';
  const replacedValue = tempValue.replace(pattern, replacement);
  const newValue = replacedValue.replace('.', '');
  const finalValue = parseFloat(newValue);
  return finalValue;
}

export function calculateSubTotal(fields: Field[]) {
  let subtotal = 0;
  fields.forEach((field: Field) => {
    const price = convertToNumber(field.price);
    const amount = convertToNumber(field.amount);
    subtotal += price * amount;
  });
  return subtotal;
}

export function convertToPercentage(amount) {
  const number = convertToNumber(amount);
  const string = String(number) + '%';
  return string;
}

export function calculateInvoice({
  subtotal,
  taxPercentage,
  taxType,
  discountAmount,
  discountType,
}: {
  subtotal: number;
  taxPercentage: '21' | '9' | '0' | '';
  taxType: 'excl' | 'incl';
  discountAmount: number;
  discountType: 'amount' | 'percentage' | '' | 'none';
}) {
  let subtotalExcl: number;
  let subtotalIncl: number;
  let discount: number;
  let tax: number;
  let total: number;
  let taxMultiplier: number;
  let discountedAmount: number;

  console.log('subtotal', subtotal);
  console.log('taxPercentage', taxPercentage);
  console.log('taxType', taxType);
  console.log('discountAmount', discountAmount);
  console.log('discountType', discountType);

  if (parseInt(taxPercentage) == 0) {
    taxMultiplier = 1;
  } else if (parseInt(taxPercentage) == 9) {
    taxMultiplier = 1.09;
  } else if (parseInt(taxPercentage) == 21) {
    taxMultiplier = 1.21;
  } else {
    taxMultiplier = 1;
  }

  if (taxType == 'excl') {
    subtotalExcl = subtotal;
    subtotalIncl = subtotal * taxMultiplier;
  } else if (taxType == 'incl') {
    subtotalExcl = subtotal / taxMultiplier;
    subtotalIncl = subtotal;
  }

  if (discountType == 'amount') {
    discount = discountAmount;
    discountedAmount = subtotalExcl - discount;
  } else if (discountType == 'percentage') {
    discount = (subtotalExcl * discountAmount) / 100;
    discountedAmount = (subtotalExcl * discount) / 100;
  } else if (discountType == '' || discountType == 'none') {
    discountedAmount = subtotalExcl;
  }
  // subtotal - (subtotal * 21) / 121;
  if (taxMultiplier == 1.21) {
    tax = discountedAmount * 0.21;
  } else if (taxMultiplier == 1.09) {
    tax = discountedAmount * 9;
  } else {
    tax = 0;
  }

  // discountedAmount - (discountedAmount * 21) / 121;
  // tax = discountedAmount - discountedAmount / taxMultiplier;

  total = discountedAmount + tax;

  return {
    subtotalExcl,
    subtotalIncl,
    discount,
    discountedAmount,
    tax,
    total,
  };
}
