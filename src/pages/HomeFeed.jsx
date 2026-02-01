import RecipeCard from '../components/RecipeCard'

const HomeFeed = ({
  recipes,
  hasFilters,
  onClearFilters,
  onViewRecipe,
  onViewProfile,
  onToggleSave,
  savedIds
}) => {
  if (recipes.length === 0) {
    return (
      <section className="feed empty-state">
        <h2>No hay recetas para esos filtros</h2>
        <p>Prueba con otras opciones o limpia los filtros.</p>
        {hasFilters ? (
          <button className="primary-button" type="button" onClick={onClearFilters}>
            Limpiar filtros
          </button>
        ) : null}
      </section>
    )
  }

  return (
    <section className="feed">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="feed-item">
          <RecipeCard
            recipe={recipe}
            onViewRecipe={onViewRecipe}
            onViewProfile={onViewProfile}
            onToggleSave={onToggleSave}
            isSaved={savedIds?.has(recipe.id)}
          />
        </div>
      ))}
    </section>
  )
}

export default HomeFeed
