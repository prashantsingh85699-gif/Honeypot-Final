const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

function TaskFilter({ activeFilter, onFilterChange }) {
  const activeIndex = FILTERS.findIndex((filter) => filter.id === activeFilter);

  return (
    <div
      className="filter-tabs"
      role="tablist"
      aria-label="Filter tasks"
      style={{ '--active-index': activeIndex }}
    >
      <span className="filter-tabs__indicator" aria-hidden="true" />
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          role="tab"
          className={[
            'filter-tabs__tab',
            activeFilter === filter.id ? 'filter-tabs__tab--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-selected={activeFilter === filter.id}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
