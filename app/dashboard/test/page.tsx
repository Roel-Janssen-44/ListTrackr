// import

import { CommentRepository } from '@/app/repositories/commentRepository';
import { TasksRepository } from '@/app/repositories/tasksRepository';

export default async function Page() {
  // initializing the repository
  const repository = new CommentRepository();
  const comments = await repository.getEntities();
  console.log('comments');
  console.log(comments);

  // call create method from generic repository
  //   const result = await repository.test();
  //   console.log('result');
  //   console.log(result);

  return (
    <div>
      <p>ajlsnd</p>
    </div>
  );
}
