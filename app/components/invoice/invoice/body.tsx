// import { selectInvoice } from '@features/invoices/invoicesSlice';

// import InvoiceRowNames from './RowNames';
// import InvoiceRows from './Rows';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
// import getCurrentFieldGroup from "@lib/getCurrentFieldGroup";

export default function InvoiceBody() {
  //   const invoiceId = GetCurrentInvoice();
  //   const invoiceData = useSelector(selectInvoice(invoiceId));
  const invoiceId = '123';
  const invoiceData = ['asdasf'];
  return (
    <div className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-gray-400 border-t-gray-400 px-4 py-10">
      {/* <InvoiceRowNames
        fields={getCurrentFieldGroup(invoiceData.fieldGroups, "rowDescription")}
      />
      <InvoiceRows rows={invoiceData.rows} /> */}
    </div>
  );
}
