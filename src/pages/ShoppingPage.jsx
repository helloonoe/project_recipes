import { useState } from 'react'

const ShoppingPage = ({
  items,
  lists,
  activeListId,
  onSelectList,
  onCreateList,
  onToggleItem,
  onNavigateHome
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [listName, setListName] = useState('')

  const activeItems = items.filter(
    (item) => !item.listId || item.listId === activeListId
  )
  const activeList = lists.find((list) => list.id === activeListId)
  const activeCount = activeList ? items.filter((item) => item.listId === activeList.id).length : 0

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
    <section className="page shopping-page">
      <header className="page-header">
        <div>
          <h2>Lista de la compra</h2>
          <p>Ingredientes listos para llevar al super.</p>
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

      {lists.length > 0 ? (
        <div className="list-strip">
          {lists.map((list) => {
            const listCount = items.filter((item) => item.listId === list.id).length
            const isActive = list.id === activeListId

            return (
              <button
                key={list.id}
                type="button"
                className={`list-card${isActive ? ' is-active' : ''}`}
                style={{ background: list.color }}
                onClick={() => onSelectList(list.id)}
              >
                <p className="list-name">{list.name}</p>
                <p className="list-count">{listCount} ingredientes</p>
              </button>
            )
          })}
        </div>
      ) : null}

      {activeList ? (
        <div className="shopping-banner">
          <div>
            <p className="shopping-label">Lista activa</p>
            <h3>{activeList.name}</h3>
            <p className="shopping-count">{activeCount} ingredientes</p>
          </div>
          <span className="shopping-badge">Compra</span>
        </div>
      ) : null}

      {activeItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
            <span className="empty-bubble bubble-1" />
            <span className="empty-bubble bubble-2" />
            <span className="empty-bubble bubble-3" />
          </div>
          <p>
            {activeList
              ? `No hay items en "${activeList.name}".`
              : 'Agrega ingredientes desde "Ver receta" en el feed.'}
          </p>
          <button
            className="ghost-button"
            type="button"
            onClick={() => onNavigateHome?.()}
          >
            Ver recetas
          </button>
        </div>
      ) : (
        <div className="shopping-list">
          {activeItems.map((item) => (
            <div key={item.id} className="shopping-item">
              <button
                className={`check-button${item.checked ? ' is-checked' : ''}`}
                type="button"
                onClick={() => onToggleItem(item.id)}
                aria-label="Marcar como comprado"
                aria-pressed={item.checked}
              >
                <span className="check-mark">✓</span>
              </button>
              <div className="shopping-info">
                <h4>{item.name}</h4>
                <p className="shopping-amount">{item.amounts.join(', ')}</p>
                {item.sources.length > 0 ? (
                  <p className="shopping-source">
                    De: {item.sources.map((source) => source.recipeTitle).join(', ')}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ShoppingPage
