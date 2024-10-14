'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { exo } from '@/app/components/fonts';

export default function PreviousPage({}) {
  const router = useRouter();

  return (
    <button
      className="group flex flex-row items-center justify-center gap-1 hover:text-active"
      type="button"
      onClick={() => router.back()}
    >
      <span className="mt-0.5 w-4">
        <ChevronLeftIcon className="stroke-[3]" />
      </span>{' '}
      <h2
        className={`${exo.className} my-auto self-baseline text-lg font-bold`}
      >
        Previous
      </h2>
    </button>
  );
}
