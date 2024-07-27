// import { useSelector } from "react-redux";
// import { selectTemplate } from "@features/templates/templatesSlice";

import TemplateTotal from './Total';
import TemplateMessage from './Message';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
// import getCurrentFieldGroup from "@lib/getCurrentFieldGroup";

export default function TemplateFooter(props) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));
  return (
    <div className="flex flex-col">
      {/* <TemplateTotal
        fields={getCurrentFieldGroup(templateData.fieldGroups, "total")}
      /> */}
      {/* To Do */}
      {/* <TemplateMessage /> */}
    </div>
  );
}
