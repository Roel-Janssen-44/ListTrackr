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
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));

  return (
    <ul className="m-0 grid grid-cols-2 gap-4 gap-y-8 p-0">
      <div className="">
        {/* Todo - logo upload */}
        <TemplateLogoUpload invoice={invoice} setInvoice={setInvoice} />
      </div>
      <div className="">
        <TemplateInvoiceNumber
          setInvoice={setInvoice}
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'invoiceNumber')}
        />
      </div>
      <div className="">
        <TemplateClientData
          invoice={invoice}
          setInvoice={setInvoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'client')}
        />
      </div>
      <div className="">
        <TemplateCompanyData
          invoice={invoice}
          setInvoice={setInvoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'company')}
        />
      </div>
    </ul>
  );
}
