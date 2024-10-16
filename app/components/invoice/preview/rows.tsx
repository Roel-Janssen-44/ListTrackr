import { Skeleton } from '@/app/components/chadcn/skeleton';
import { Field } from '@/app/lib/definitions';
import { convertToCurrency } from '@/app/lib/utils';

export default function PreviewRows({ fields }: { fields: any }) {
  return (
    <div className="">
      <ul className="flex list-none flex-row">
        <li className="flex-1">
          {fields.map((field: Field) => (
            <div
              key={'preview_column-1' + field.id}
              className="my-2 flex flex-row last-of-type:mb-0"
            >
              <span className="flex-1">{field.name}</span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div
              key={'preview_column-2' + field.id}
              className="my-2 flex flex-row last-of-type:mb-0"
            >
              <span className="w-[108px]">
                {convertToCurrency(Number(field.price))}
              </span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div
              key={'preview_column-3' + field.id}
              className="my-2 flex flex-row last-of-type:mb-0"
            >
              <span className="w-[80px] text-left">{field.amount}</span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div
              key={'preview_column-4' + field.id}
              className="my-2 flex flex-row last-of-type:mb-0"
            >
              <span className="w-[100px] text-right">
                {convertToCurrency(Number(field.price) * Number(field.amount))}
              </span>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
}
