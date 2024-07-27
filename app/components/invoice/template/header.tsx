// import { useSelector } from "react-redux";
// import { selectTemplate } from "@features/templates/templatesSlice";

import TemplateLogoUpload from './logo';
import TemplateCompanyData from './companydata';
import TemplateInvoiceNumber from './invoiceNumber';
import TemplateClientData from './clientData';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
import { getCurrentFieldGroup } from '@/app/lib/utils';

import { InvoiceTemplate } from '@/app/lib/definitions';

export default function TemplateHeader({
  invoice,
}: {
  invoice: InvoiceTemplate;
}) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));

  return (
    <ul className="m-0 grid grid-cols-2 gap-4 gap-y-8 p-0">
      <div className="">
        <TemplateLogoUpload />
      </div>
      <div className="">
        <TemplateInvoiceNumber
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'invoiceNumber')}
        />
      </div>
      <div className="">
        <TemplateClientData
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'client')}
        />
      </div>
      <div className="">
        <TemplateCompanyData
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'company')}
        />
      </div>
    </ul>
  );
}
