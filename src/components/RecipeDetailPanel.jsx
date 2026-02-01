const RecipeDetailPanel = ({ recipe, open, onClose, onAddIngredient, shoppingItems = [] }) => {
  if (!recipe) {
    return null
  }

  const mainMedia = recipe.mediaType === 'video' ? recipe.poster : recipe.mediaSrc
  const gallery = Array.from(new Set([mainMedia, ...(recipe.gallery || [])].filter(Boolean)))
  const [primary, ...rest] = gallery
  const steps = recipe.steps || []
  const isIngredientSaved = (ingredient) =>
    shoppingItems.some(
      (item) =>
        item.name.trim().toLowerCase() === ingredient.name.trim().toLowerCase() &&
        item.sources.some(
          (source) => source.recipeId === recipe.id && source.amount === ingredient.amount
        )
    )

  return (
    <aside
      className={`detail-panel${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Receta ${recipe.title}`}
    >
      <div className="detail-content">
        <header className="detail-header">
          <button
            className="icon-button detail-back"
            type="button"
            onClick={onClose}
            aria-label="Volver al feed"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <p className="detail-eyebrow">Receta</p>
            <h2>{recipe.title}</h2>
            <div className="detail-meta">
              <span className="detail-pill">{recipe.time}</span>
              <span className="detail-pill">{recipe.difficulty}</span>
            </div>
          </div>
        </header>
        <div className="detail-body">
          <div className="detail-hero">
            {primary ? <img src={primary} alt={recipe.title} /> : null}
          </div>
          {rest.length > 0 ? (
            <div className="detail-gallery">
              {rest.map((src) => (
                <img key={src} src={src} alt={`${recipe.title} extra`} />
              ))}
            </div>
          ) : null}
          {recipe.summary ? <p className="detail-summary">{recipe.summary}</p> : null}
          <section className="detail-section detail-steps-section">
            <h3>Pasos</h3>
            {steps.length > 0 ? (
              <ol className="detail-steps">
                {steps.map((step, index) => (
                  <li key={`${recipe.id}-step-${index}`}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="detail-summary">Sigue los pasos basicos de la receta.</p>
            )}
          </section>
          <section className="detail-section detail-ingredients-section">
            <div className="detail-section-title">
              <h3>Ingredientes</h3>
              <span className="detail-section-hint">Toca para agregar</span>
            </div>
            <div className="detail-ingredients">
              {recipe.ingredients?.map((ingredient) => {
                const isSaved = isIngredientSaved(ingredient)
                return (
                  <div key={ingredient.id} className="detail-ingredient">
                    <div>
                      <p className="ingredient-name">{ingredient.name}</p>
                      <p className="ingredient-amount">{ingredient.amount}</p>
                    </div>
                    <button
                      className={`ingredient-cart${isSaved ? ' is-active' : ''}`}
                      type="button"
                      onClick={() => onAddIngredient(recipe, ingredient)}
                      aria-label={`Agregar ${ingredient.name} a la lista`}
                      aria-pressed={isSaved}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path
                          d="M6 6h2l2 9h8l2-7H9"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="10" cy="18" r="1.5" />
                        <circle cx="17" cy="18" r="1.5" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </aside>
  )
}

export default RecipeDetailPanel
