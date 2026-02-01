const TopBar = ({ onOpenFilters, onCreate }) => {
  return (
    <header className="top-bar">
      <button
        className="icon-button"
        type="button"
        onClick={onOpenFilters}
        aria-label="Abrir filtros"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3" y="6" width="18" height="2" rx="1" />
          <rect x="3" y="11" width="14" height="2" rx="1" />
          <rect x="3" y="16" width="18" height="2" rx="1" />
        </svg>
      </button>
      <button
        className="icon-button is-create"
        type="button"
        onClick={onCreate}
        aria-label="Subir receta"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 5v14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  )
}

export default TopBar
