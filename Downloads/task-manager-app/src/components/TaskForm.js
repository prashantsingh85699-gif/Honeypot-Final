import { useState } from 'react';

const PRIORITIES = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
];

function TaskForm({ onAddTask }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    onAddTask(trimmed, priority);
    setInput('');
    // Keep the last-selected priority for the next task
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <label htmlFor="task-input" className="visually-hidden">
          New task
        </label>
        <input
          id="task-input"
          type="text"
          className="task-form__input"
          placeholder="What needs doing?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="task-form__button">
          Add Task
        </button>
      </div>

      <fieldset className="task-form__priority">
        <legend className="task-form__priority-label">Priority</legend>
        {PRIORITIES.map((option) => (
          <button
            key={option.id}
            type="button"
            className={[
              'task-form__priority-btn',
              `task-form__priority-btn--${option.id}`,
              priority === option.id ? 'task-form__priority-btn--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={priority === option.id}
            onClick={() => setPriority(option.id)}
          >
            {option.label}
          </button>
        ))}
      </fieldset>
    </form>
  );
}

export default TaskForm;
