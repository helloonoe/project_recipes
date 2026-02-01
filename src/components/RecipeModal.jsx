const RecipeModal = ({ recipe, onClose, onAddIngredient }) => {
  if (!recipe) {
    return null
  }

  return (
    <div className="modal-root" role="dialog" aria-modal="true">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Ingredientes</p>
            <h3>{recipe.title}</h3>
            <p className="modal-subtitle">{recipe.time} · {recipe.difficulty}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M6 6l12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M18 6l-12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="modal-list">
          {recipe.ingredients?.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-row">
              <div>
                <p className="ingredient-name">{ingredient.name}</p>
                <p className="ingredient-amount">{ingredient.amount}</p>
              </div>
              <button
                className="ghost-button"
                type="button"
                onClick={() => onAddIngredient(recipe, ingredient)}
              >
                Anadir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeModal
