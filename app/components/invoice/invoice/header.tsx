// import { useSelector } from "react-redux";
// import { selectInvoice } from "@features/invoices/invoicesSlice";

// import InvoiceLogoUpload from './logo';
// import InvoiceCompanyData from './companyData';
// import InvoiceInvoiceNumber from './invoiceNumber';
import InvoiceClientData from './clientData';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
// import getCurrentFieldGroup from "@lib/getCurrentFieldGroup";

export default function InvoiceHeader() {
  //   const invoiceId = GetCurrentInvoice();
  //   const invoiceData = useSelector(selectInvoice(invoiceId));

  return (
    <ul className="m-0 grid grid-cols-2 gap-4 gap-y-8 p-0">
      <div className="">{/* <InvoiceLogoUpload /> */}</div>
      <div className="">
        {/* <InvoiceInvoiceNumber
          fields={getCurrentFieldGroup(
            invoiceData.fieldGroups,
            "invoiceNumber"
          )}
        /> */}
      </div>
      <div className="">
        {/* <InvoiceClientData
          fields={getCurrentFieldGroup(invoiceData.fieldGroups, "client")}
        /> */}
      </div>
      <div className="">
        {/* <InvoiceCompanyData
          fields={getCurrentFieldGroup(invoiceData.fieldGroups, "company")}
        /> */}
      </div>
    </ul>
  );
}
