import { useEffect, useState } from 'react'

const FilterMenu = ({
  open,
  onClose,
  onClear,
  categories,
  selectedFilters,
  onToggleOption
}) => {
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    if (activeCategory && !categories.some((category) => category.id === activeCategory)) {
      setActiveCategory(null)
    }
  }, [activeCategory, categories])

  const filterCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0
  )

  return (
    <div className={`filter-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="filter-overlay" onClick={onClose} />
      <aside className="filter-panel" role="dialog" aria-label="Filtros">
        <div className="filter-header">
          <div>
            <p className="filter-eyebrow">Descubre</p>
            <h2>Elige tus filtros</h2>
          </div>
          <button
            className="text-button filter-clear"
            type="button"
            onClick={onClear}
            aria-label={`Limpiar filtros${filterCount ? ` (${filterCount})` : ''}`}
          >
            Limpiar
            {filterCount ? <span className="filter-count">{filterCount}</span> : null}
          </button>
        </div>
        <div className="filter-list">
          {categories.map((category) => {
            const isOpen = activeCategory === category.id
            const selected = selectedFilters[category.id] || []

            return (
              <div
                key={category.id}
                className={`filter-group${isOpen ? ' is-open' : ''}`}
                data-category={category.id}
              >
                <button
                  type="button"
                  className="filter-trigger"
                  onClick={() =>
                    setActiveCategory((current) => (current === category.id ? null : category.id))
                  }
                  aria-expanded={isOpen}
                >
                  {category.label}
                </button>
                <div className="filter-options">
                  {category.options.map((option) => {
                    const isSelected = selected.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`filter-option${isSelected ? ' is-selected' : ''}`}
                        onClick={() => onToggleOption(category.id, option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </aside>
    </div>
  )
}

export default FilterMenu
