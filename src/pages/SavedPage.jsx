import { useState } from 'react'

const SavedPage = ({
  recipes,
  savedItems,
  savedLists,
  onToggleCompleted,
  onCreateList,
  onNavigateHome
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [listName, setListName] = useState('')
  const [activeListId, setActiveListId] = useState(null)

  const savedRecipes = savedItems
    .map((item) => ({
      item,
      recipe: recipes.find((recipe) => recipe.id === item.recipeId)
    }))
    .filter((entry) => entry.recipe)

  const activeList = savedLists.find((list) => list.id === activeListId) || null
  const visibleRecipes = activeListId
    ? savedRecipes.filter(({ item }) => item.listIds.includes(activeListId))
    : savedRecipes

  const handleCreateList = () => {
    const name = listName.trim()
    if (!name) {
      return
    }
    onCreateList(name)
    setListName('')
    setIsCreating(false)
  }

  return (
    <section className="page saved-page">
      <header className="page-header">
        <div>
          <h2>Guardadas</h2>
          <p>Tus recetas favoritas en listas personalizadas.</p>
        </div>
        <div className="page-actions">
          {!isCreating ? (
            <button className="primary-button" type="button" onClick={() => setIsCreating(true)}>
              Crear lista
            </button>
          ) : null}
        </div>
      </header>

      {isCreating ? (
        <div className="list-create">
          <input
            className="text-input"
            type="text"
            value={listName}
            onChange={(event) => setListName(event.target.value)}
            placeholder="Nombre de la lista"
          />
          <div className="list-create-actions">
            <button className="ghost-button" type="button" onClick={() => setIsCreating(false)}>
              Cancelar
            </button>
            <button className="primary-button" type="button" onClick={handleCreateList}>
              Guardar lista
            </button>
          </div>
        </div>
      ) : null}

      <div className="list-strip">
        {savedLists.map((list) => {
          const count = savedItems.filter((item) => item.listIds.includes(list.id)).length
          const isActive = list.id === activeListId

          return (
            <button
              key={list.id}
              className={`list-card${isActive ? ' is-active' : ''}`}
              type="button"
              style={{ background: list.color }}
              onClick={() => setActiveListId(isActive ? null : list.id)}
              aria-pressed={isActive}
            >
              <p className="list-name">{list.name}</p>
              <p className="list-count">{count} recetas</p>
            </button>
          )
        })}
      </div>

      <div className="page-section">
        <h3 className="section-title">
          {activeList ? `Recetas en ${activeList.name}` : 'Todas tus recetas guardadas'}
        </h3>
        {savedRecipes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <span className="empty-bubble bubble-1" />
              <span className="empty-bubble bubble-2" />
              <span className="empty-bubble bubble-3" />
            </div>
            <p>Aun no guardaste recetas. Guarda alguna desde el feed.</p>
            <button
              className="ghost-button"
              type="button"
              onClick={() => onNavigateHome?.()}
            >
              Explorar recetas
            </button>
          </div>
        ) : visibleRecipes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <span className="empty-bubble bubble-1" />
              <span className="empty-bubble bubble-2" />
              <span className="empty-bubble bubble-3" />
            </div>
            <p>No hay recetas en "{activeList?.name}".</p>
            <button
              className="ghost-button"
              type="button"
              onClick={() => setActiveListId(null)}
            >
              Ver todas
            </button>
          </div>
        ) : (
          <div className="saved-list">
            {visibleRecipes.map(({ item, recipe }) => {
              const mediaSrc = recipe.mediaType === 'video' ? recipe.poster : recipe.mediaSrc
              const listNames = savedLists.filter((list) => item.listIds.includes(list.id))

              return (
                <div key={recipe.id} className="saved-item">
                  <img className="saved-thumb" src={mediaSrc} alt={recipe.title} />
                  <div className="saved-info">
                    <div className="saved-title-row">
                      <div>
                        <h4>{recipe.title}</h4>
                        <p className="saved-meta">{recipe.time} · {recipe.difficulty}</p>
                      </div>
                      <button
                        className={`check-button${item.completed ? ' is-checked' : ''}`}
                        type="button"
                        onClick={() => onToggleCompleted(recipe.id)}
                        aria-label="Marcar como hecha"
                        aria-pressed={item.completed}
                      >
                        <span className="check-mark">✓</span>
                      </button>
                    </div>
                    {listNames.length > 0 ? (
                      <div className="saved-tags">
                        {listNames.map((list) => (
                          <button
                            key={list.id}
                            className="tag tag-button"
                            type="button"
                            onClick={() =>
                              setActiveListId(list.id === activeListId ? null : list.id)
                            }
                          >
                            {list.name}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedPage
