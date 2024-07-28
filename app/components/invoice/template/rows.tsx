import { Skeleton } from '@/app/components/chadcn/skeleton';

export default function TemplateRows() {
  return (
    <div className="mb-2">
      <ul className="flex-rpw m-0 flex list-none gap-2 p-0">
        <li className="flex-1">
          <Skeleton className="my-2 h-[30px] w-full" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
      </ul>
      <ul className="flex-rpw m-0 flex list-none gap-2 p-0">
        <li className="flex-1">
          <Skeleton className="my-2 h-[30px] w-full" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
        <li>
          <Skeleton className="my-2 h-[30px] w-[125px]" />
        </li>
      </ul>
    </div>
  );
}
