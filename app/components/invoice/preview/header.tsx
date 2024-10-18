import PreviewLogoUpload from './logo';
import PreviewCompanyData from './companydata';
import PreviewInvoiceNumber from './invoiceNumber';
import PreviewClientData from './clientData';

import { getCurrentFieldGroup } from '@/app/lib/utils';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function PreviewHeader({
  invoice,
}: {
  invoice: InvoiceTemplate;
}) {
  return (
    <ul className="m-0 grid grid-cols-2 gap-4 gap-y-16 p-4 pb-0">
      <div className="">
        <PreviewLogoUpload logo={invoice.logo} />
      </div>
      <div className="">
        <PreviewInvoiceNumber
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'invoiceNumber')}
        />
      </div>
      <div className="">
        <PreviewClientData
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'client')}
        />
      </div>
      <div className="">
        <PreviewCompanyData
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'company')}
        />
      </div>
    </ul>
  );
}
