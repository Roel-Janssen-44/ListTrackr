import TableRow from '@/app/components/tasks/row';
import CreateTask from '@/app/components/createRow';
import { Task } from '@/app/lib/types';

export default function SubtaskRow({
  task,
  removeTask,
  removeSubTaskFromState,
}: {
  task: Task;
  removeTask: Function;
  removeSubTaskFromState: Function;
}) {
  //   const removeTaskFromState = (taskId: string) => {
  //     // remove task from state
  //     updateTaskState((prevState) => ({
  //       ...prevState,
  //       subtasks: prevState.subtasks.filter((task) => task.id !== taskId),
  //     }));
  //   };

  const updateTaskFromState = (taskId, task) => {
    // update task in state
  };

  return (
    <div>
      {/* <p>Subtask</p> */}
      <TableRow
        showExpandable={false}
        updateTaskState={updateTaskFromState}
        task={task}
        tableId={task?.table_id}
        key={task.id}
        removeTask={removeSubTaskFromState}
      />
      {/* <CreateTask
                      addTask={addTaskToState}
                      table_id={null}
                    parent_id={task.id}
                      project_id={null}
                      date=""
                      type="task"
                    /> */}
    </div>
  );
}
