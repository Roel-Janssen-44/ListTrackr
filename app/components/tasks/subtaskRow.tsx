import TableRow from '@/app/components/tasks/row';
import CreateTask from '@/app/components/createRow';

export default function SubtaskRow({ task }) {
  const removeTaskFromState = (taskId) => {
    // remove task from state
  };
  const updateTaskFromState = (taskId, task) => {
    // update task in state
  };

  return (
    <div>
      {/* <p>Subtask</p> */}
      <TableRow
        showExpandable={false}
        removeTask={removeTaskFromState}
        updateTaskState={updateTaskFromState}
        task={task}
        tableId={task?.table_id}
        key={task.id}
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
