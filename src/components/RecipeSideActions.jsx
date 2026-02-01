const RecipeSideActions = ({ recipe, isSaved, onToggleSave, onShare, onViewProfile }) => {
  const authorName = recipe.author?.name || 'Chef'
  const initial = authorName.slice(0, 1)

  return (
    <aside className="recipe-rail" aria-label="Acciones de receta">
      <button
        className="rail-button"
        type="button"
        onClick={() => onViewProfile?.(recipe.author)}
        aria-label="Ver perfil"
      >
        <span className="rail-avatar">{initial}</span>
      </button>
      <button
        className={`rail-button${isSaved ? ' is-active' : ''}`}
        type="button"
        onClick={() => onToggleSave?.(recipe)}
        aria-label="Guardar"
        aria-pressed={isSaved}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="rail-button"
        type="button"
        onClick={() => onShare?.(recipe)}
        aria-label="Compartir"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 4v9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 8l4-4 4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </aside>
  )
}

export default RecipeSideActions
