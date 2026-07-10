import { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { loadTasks, saveTasks } from './utils/storage';
import './App.css';

function App() {
  // Hydrate from localStorage on first render so tasks survive refresh
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');

  // Persist whenever the task list changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text, priority = 'medium') => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false, priority },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: trimmed } : task
      )
    );
  };

  // Derive the visible subset based on the active filter tab
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <main className="app-container">
        <header className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle">Stay on top of what matters.</p>
        </header>

        <TaskForm onAddTask={addTask} />

        {tasks.length > 0 && (
          <>
            <p className="task-counter" aria-live="polite">
              <span className="task-counter__highlight">{completedCount}</span>
              {' of '}
              <span className="task-counter__highlight">{tasks.length}</span>
              {' completed'}
            </p>

            <TaskFilter activeFilter={filter} onFilterChange={setFilter} />
          </>
        )}

        <TaskList
          tasks={filteredTasks}
          totalCount={tasks.length}
          activeFilter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
    </div>
  );
}

export default App;
