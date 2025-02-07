'use server';

import TestComponent from '@/app/components/testComponent';
import TaskRepository from '@/app/repositories/tasksRepository';

export default async function Page() {
  const tasks = await TaskRepository.instance.getEntity(
    '4c9d7a85-d2d2-4c1b-b97a-e4fa45922b15',
  );

  console.log('tasks');
  console.log(tasks);
  return (
    <div>
      <p>Testpage</p>
      <TestComponent tasks={tasks} />
    </div>
  );
}
