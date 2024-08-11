import { Skeleton } from '@/app/components/chadcn/skeleton';
import { Field } from '@/app/lib/definitions';
import { convertToCurrency } from '@/app/lib/utils';

export default function TemplateRows({ fields }: { fields: any }) {
  return (
    <div className="">
      <ul className="flex list-none flex-row">
        <li className="flex-1">
          {fields.map((field: Field) => (
            <div className="my-2 flex flex-row last-of-type:mb-0">
              <span className="flex-1">{field.name}</span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div className="my-2 flex flex-row last-of-type:mb-0">
              <span className="w-[108px]">{field.price}</span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div className="my-2 flex flex-row last-of-type:mb-0">
              <span className="w-[80px] text-left">{field.amount}</span>
            </div>
          ))}
        </li>
        <li>
          {fields.map((field: Field) => (
            <div className="my-2 flex flex-row last-of-type:mb-0">
              <span className="w-[110px] text-right">
                {convertToCurrency(Number(field.price) * Number(field.amount))}
              </span>
            </div>
          ))}
        </li>
        {/* {fields.map((field: Field) => (
          <div className="flex flex-row my-2 last-of-type:mb-0">
            <span className="flex-1">{field.name}</span>
            <span className="w-[140px] text-right">{field.price}</span>
            <span className="w-[140px] text-right">{field.amount}</span>
            <span className="w-[140px] text-right">
              {convertToCurrency(Number(field.price) * Number(field.amount))}
            </span>
          </div>
        ))} */}
      </ul>
    </div>
  );
}
