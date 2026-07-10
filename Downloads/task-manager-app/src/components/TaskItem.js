import { useState, useRef, useEffect } from 'react';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Med',
  high: 'High',
};

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef(null);

  // Focus the edit input as soon as editing mode opens
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    if (isEditing) return;

    const willComplete = !task.completed;

    if (willComplete) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }

    onToggle(task.id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 320);
  };

  const startEditing = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();

    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }

    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelEdit();
    }
  };

  return (
    <li
      className={[
        'task-item',
        task.completed ? 'task-item--completed' : '',
        isDeleting ? 'task-item--deleting' : '',
        justCompleted ? 'task-item--just-completed' : '',
        isEditing ? 'task-item--editing' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="task-item__checkbox"
        onClick={handleToggle}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        aria-pressed={task.completed}
        disabled={isEditing}
      >
        <span className="task-item__checkmark" aria-hidden="true">
          {task.completed && (
            <svg viewBox="0 0 12 10" className="task-item__check-icon">
              <polyline points="1.5 5 4.5 8 10.5 1.5" />
            </svg>
          )}
        </span>
      </button>

      <div className="task-item__body">
        <span
          className={[
            'task-item__badge',
            `task-item__badge--${task.priority}`,
          ].join(' ')}
        >
          {PRIORITY_LABELS[task.priority] || 'Med'}
        </span>

        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            className="task-item__edit-input"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleEditKeyDown}
            aria-label="Edit task"
          />
        ) : (
          <span
            className="task-item__text"
            onDoubleClick={startEditing}
            title="Double-click to edit"
          >
            {task.text}
          </span>
        )}
      </div>

      <button
        type="button"
        className="task-item__delete"
        onClick={handleDelete}
        aria-label={`Delete task: ${task.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
