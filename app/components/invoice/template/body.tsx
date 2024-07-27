// import { useSelector } from "react-redux";
// import { selectTemplate } from "@features/templates/templatesSlice";

// import TemplateRowNames from './RowNames';
// import TemplateRows from './Rows';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
// import getCurrentFieldGroup from "@lib/getCurrentFieldGroup";

export default function TemplateBody() {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));

  return (
    <div className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-gray-400 border-t-gray-400 px-4 py-10">
      {/* <TemplateRowNames
        fields={getCurrentFieldGroup(
          templateData.fieldGroups,
          "rowDescription"
        )}
      /> */}
      <TemplateRows />
    </div>
  );
}
