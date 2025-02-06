'use client';

import TaskRow from './tasks/row';

export default function TestComponent(props) {
  console.log(props);
  return (
    <div>
      <p>Test</p>
      <TaskRow
        task={props.task}
        tableId="task-table"
        removeTask={() => null}
        updateTaskState={() => null}
      />
    </div>
  );
}
