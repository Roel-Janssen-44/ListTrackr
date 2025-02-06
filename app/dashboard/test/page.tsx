'use server';

import TestComponent from '@/app/components/testComponent';

export default async function Page() {
  return (
    <div>
      <p>Testpage</p>
      <TestComponent />
    </div>
  );
}
