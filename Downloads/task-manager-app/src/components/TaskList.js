import TaskItem from './TaskItem';

// Context-aware empty messages depending on whether the list is empty or just filtered
const EMPTY_MESSAGES = {
  all: 'Nothing to do yet — add your first task',
  active: 'No active tasks — you\'re all caught up',
  completed: 'No completed tasks yet — check one off to see it here',
};

function TaskList({
  tasks,
  totalCount,
  activeFilter,
  onToggle,
  onDelete,
  onEdit,
}) {
  if (totalCount === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          ✦
        </span>
        <p className="empty-state__message">{EMPTY_MESSAGES.all}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state empty-state--filtered">
        <span className="empty-state__icon" aria-hidden="true">
          ◎
        </span>
        <p className="empty-state__message">
          {EMPTY_MESSAGES[activeFilter]}
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
