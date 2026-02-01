import RecipeSideActions from './RecipeSideActions'

const RecipeCard = ({ recipe, onViewRecipe, onViewProfile, onToggleSave, isSaved }) => {
  const videoType = recipe.mediaSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'

  return (
    <article className="recipe-card">
      <div className="recipe-media">
        {recipe.mediaType === 'video' ? (
          <video
            className="media-element"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={recipe.poster}
          >
            <source src={recipe.mediaSrc} type={videoType} />
          </video>
        ) : (
          <img
            className="media-element"
            src={recipe.mediaSrc}
            alt={recipe.title}
            loading="lazy"
          />
        )}
        <div className="media-shade" />
        <div className="recipe-info">
          <div>
            <p className="recipe-author">por {recipe.author?.name || 'Chef'}</p>
            <h3>{recipe.title}</h3>
            <p className="recipe-subtitle">Receta lista para ti</p>
          </div>
          <div className="recipe-meta">
            <span>{recipe.time}</span>
            <span>{recipe.difficulty}</span>
          </div>
          <div className="recipe-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => onViewRecipe(recipe)}
            >
              Ver receta
            </button>
          </div>
        </div>
        <RecipeSideActions
          recipe={recipe}
          isSaved={isSaved}
          onToggleSave={onToggleSave}
          onViewProfile={onViewProfile}
        />
      </div>
    </article>
  )
}

export default RecipeCard
