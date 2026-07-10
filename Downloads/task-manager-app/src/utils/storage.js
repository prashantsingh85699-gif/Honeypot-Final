const STORAGE_KEY = 'task-manager-tasks';

// Read saved tasks from localStorage; returns an empty array on failure or first visit
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Backfill priority for tasks saved before that field existed
    return parsed.map((task) => ({
      ...task,
      priority: task.priority || 'medium',
    }));
  } catch {
    return [];
  }
}

// Write the current task list to localStorage whenever it changes
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Silently ignore quota or privacy-mode errors
  }
}
