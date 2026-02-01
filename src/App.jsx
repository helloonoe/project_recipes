import { useEffect, useMemo, useRef, useState } from 'react'
import BottomNav from './components/BottomNav'
import FilterMenu from './components/FilterMenu'
import ProfileDetailPanel from './components/ProfileDetailPanel'
import RecipeDetailPanel from './components/RecipeDetailPanel'
import TopBar from './components/TopBar'
import { chats as chatData } from './data/chats'
import { filterCategories } from './data/filters'
import { profile as profileData } from './data/profile'
import { recipes as recipeData } from './data/recipes'
import { initialSavedItems, initialSavedLists } from './data/saved'
import { initialShoppingLists } from './data/shopping'
import ChatsPage from './pages/ChatsPage'
import HomeFeed from './pages/HomeFeed'
import PlaceholderPage from './pages/PlaceholderPage'
import ProfilePage from './pages/ProfilePage'
import SavedPage from './pages/SavedPage'
import ShoppingPage from './pages/ShoppingPage'

const placeholderCopy = {
  create: {
    title: 'Sube tu receta',
    description: 'Comparte tus platos con fotos, video y tips personales.',
    actionLabel: 'Subir receta'
  }
}

const listColors = ['#ffe2a3', '#fdecc0', '#ffe7cf', '#fff1d6']

const filterRecipes = (recipes, selectedFilters) => {
  const activeKeys = Object.keys(selectedFilters)

  if (activeKeys.length === 0) {
    return recipes
  }

  return recipes.filter((recipe) => {
    return activeKeys.every((key) => {
      const selected = selectedFilters[key]
      if (!selected || selected.length === 0) {
        return true
      }
      const value = recipe.filters[key]
      if (Array.isArray(value)) {
        return value.some((item) => selected.includes(item))
      }
      return selected.includes(value)
    })
  })
}

const createId = () => `id-${Math.random().toString(36).slice(2, 9)}`

const formatLabel = (value) => {
  if (!value) {
    return ''
  }
  return `${value[0].toUpperCase()}${value.slice(1)}`
}

const tallyFilters = (recipes, key) => {
  const counts = {}
  recipes.forEach((recipe) => {
    const value = recipe.filters?.[key]
    if (!value) {
      return
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        counts[entry] = (counts[entry] || 0) + 1
      })
    } else {
      counts[value] = (counts[value] || 0) + 1
    }
  })
  return counts
}

const pickTop = (counts) =>
  Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})
  const [savedLists, setSavedLists] = useState(initialSavedLists)
  const [savedItems, setSavedItems] = useState(initialSavedItems)
  const [shoppingLists, setShoppingLists] = useState(initialShoppingLists)
  const [activeShoppingListId, setActiveShoppingListId] = useState(
    initialShoppingLists[0]?.id ?? null
  )
  const [shoppingItems, setShoppingItems] = useState([])
  const [detailRecipe, setDetailRecipe] = useState(null)
  const [detailProfile, setDetailProfile] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [saveToast, setSaveToast] = useState(null)
  const [isSaveSheetOpen, setIsSaveSheetOpen] = useState(false)
  const [saveTarget, setSaveTarget] = useState(null)
  const [shoppingToast, setShoppingToast] = useState(null)
  const [shoppingTarget, setShoppingTarget] = useState(null)
  const [isShoppingSheetOpen, setIsShoppingSheetOpen] = useState(false)
  const detailTimer = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('menu-open', isFilterOpen)
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isFilterOpen])

  useEffect(() => {
    document.body.classList.toggle('detail-open', isDetailOpen)
    return () => {
      document.body.classList.remove('detail-open')
    }
  }, [isDetailOpen])

  useEffect(() => {
    if (activeTab !== 'home') {
      setIsFilterOpen(false)
      setIsDetailOpen(false)
      setDetailRecipe(null)
      setDetailProfile(null)
    }
  }, [activeTab])

  useEffect(() => {
    if (!activeShoppingListId && shoppingLists.length > 0) {
      setActiveShoppingListId(shoppingLists[0].id)
    }
    if (
      activeShoppingListId &&
      !shoppingLists.some((list) => list.id === activeShoppingListId)
    ) {
      setActiveShoppingListId(shoppingLists[0]?.id ?? null)
    }
  }, [activeShoppingListId, shoppingLists])

  useEffect(() => {
    if (!saveToast) {
      return undefined
    }
    const timeout = setTimeout(
      () => setSaveToast(null),
      saveToast.showLists ? 5200 : 3200
    )
    return () => clearTimeout(timeout)
  }, [saveToast])

  useEffect(() => {
    if (!shoppingToast) {
      return undefined
    }
    const timeout = setTimeout(
      () => setShoppingToast(null),
      shoppingToast.showLists ? 5200 : 3200
    )
    return () => clearTimeout(timeout)
  }, [shoppingToast])

  useEffect(() => () => clearTimeout(detailTimer.current), [])

  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipeData, selectedFilters)
  }, [selectedFilters])

  const savedIds = useMemo(() => new Set(savedItems.map((item) => item.recipeId)), [savedItems])

  const recommendedGroups = useMemo(() => {
    const savedRecipes = recipeData.filter((recipe) => savedIds.has(recipe.id))

    if (savedRecipes.length === 0) {
      return [
        {
          id: 'rec-default-1',
          name: 'Cocina Express',
          members: 328,
          reason: 'Ideas rapidas para cada dia.'
        },
        {
          id: 'rec-default-2',
          name: 'Snacks Saludables',
          members: 214,
          reason: 'Perfecto para antojos ligeros.'
        },
        {
          id: 'rec-default-3',
          name: 'Meal Prep Semanal',
          members: 189,
          reason: 'Organiza tu semana con recetas base.'
        }
      ]
    }

    const topDiet = pickTop(tallyFilters(savedRecipes, 'diet'))
    const topMoment = pickTop(tallyFilters(savedRecipes, 'moment'))
    const topMain = pickTop(tallyFilters(savedRecipes, 'main'))
    const completedCount = savedItems.filter((item) => item.completed).length

    const suggestions = []

    if (topDiet) {
      suggestions.push({
        id: `rec-diet-${topDiet}`,
        name: `Cocina ${formatLabel(topDiet)}`,
        members: 120 + savedRecipes.length * 9,
        reason: `Basado en tus recetas ${topDiet} guardadas.`
      })
    }

    if (topMain) {
      suggestions.push({
        id: `rec-main-${topMain}`,
        name: `Amantes de ${formatLabel(topMain)}`,
        members: 90 + savedRecipes.length * 7,
        reason: `Te gustan recetas con ${topMain}.`
      })
    }

    if (topMoment) {
      suggestions.push({
        id: `rec-moment-${topMoment}`,
        name: `Ideas para ${formatLabel(topMoment)}`,
        members: 110 + savedRecipes.length * 6,
        reason: `Guardas recetas para ${topMoment}.`
      })
    }

    if (completedCount > 0) {
      suggestions.push({
        id: 'rec-completed',
        name: 'Recetas hechas',
        members: 140,
        reason: 'Porque ya marcaste recetas como hechas.'
      })
    }

    return suggestions.slice(0, 3)
  }, [savedIds, savedItems])

  const handleToggleFilter = (categoryId, option) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[categoryId] || [])
      if (current.has(option)) {
        current.delete(option)
      } else {
        current.add(option)
      }

      const next = {
        ...prev,
        [categoryId]: Array.from(current)
      }

      if (next[categoryId].length === 0) {
        delete next[categoryId]
      }

      return next
    })
  }

  const handleClearFilters = () => setSelectedFilters({})

  const handleToggleSave = (recipe) => {
    const wasSaved = savedItems.some((item) => item.recipeId === recipe.id)

    setSavedItems((prev) => {
      const exists = prev.find((item) => item.recipeId === recipe.id)
      if (exists) {
        return prev.filter((item) => item.recipeId !== recipe.id)
      }
      const defaultListId = savedLists[0]?.id
      return [
        ...prev,
        {
          recipeId: recipe.id,
          listIds: defaultListId ? [defaultListId] : [],
          completed: false
        }
      ]
    })

    if (!wasSaved) {
      setSaveTarget(recipe)
      setSaveToast({ message: 'Receta guardada', showLists: true })
    } else {
      setSaveToast(null)
      setSaveTarget(null)
      setIsSaveSheetOpen(false)
    }
  }

  const handleToggleCompleted = (recipeId) => {
    setSavedItems((prev) =>
      prev.map((item) =>
        item.recipeId === recipeId ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const handleCreateList = (name) => {
    const newList = {
      id: createId(),
      name,
      color: listColors[savedLists.length % listColors.length]
    }
    setSavedLists((prev) => [...prev, newList])
  }

  const handleCreateShoppingList = (name) => {
    const newList = {
      id: createId(),
      name,
      color: listColors[shoppingLists.length % listColors.length]
    }
    setShoppingLists((prev) => [...prev, newList])
    setActiveShoppingListId(newList.id)
  }

  const handleSelectSaveList = (listId) => {
    if (!saveTarget) {
      return
    }

    setSavedItems((prev) =>
      prev.map((item) =>
        item.recipeId === saveTarget.id ? { ...item, listIds: [listId] } : item
      )
    )

    const listName = savedLists.find((list) => list.id === listId)?.name
    setIsSaveSheetOpen(false)
    setSaveToast({
      message: listName ? `Guardada en ${listName}` : 'Guardada en la lista',
      showLists: false
    })
  }

  const upsertShoppingItem = (items, recipe, ingredient, listId) => {
    if (!listId) {
      return items
    }
    const normalizedName = ingredient.name.trim().toLowerCase()
    const key = `${listId}-${normalizedName}`
    const existing = items.find((item) => item.key === key && item.listId === listId)

    if (!existing) {
      return [
        ...items,
        {
          id: createId(),
          key,
          listId,
          name: ingredient.name,
          amounts: [ingredient.amount],
          checked: false,
          sources: [
            {
              recipeId: recipe.id,
              recipeTitle: recipe.title,
              amount: ingredient.amount
            }
          ]
        }
      ]
    }

    const alreadyAdded = existing.sources.some(
      (source) => source.recipeId === recipe.id && source.amount === ingredient.amount
    )
    if (alreadyAdded) {
      return items
    }

    const nextSources = [
      ...existing.sources,
      { recipeId: recipe.id, recipeTitle: recipe.title, amount: ingredient.amount }
    ]
    const nextAmounts = Array.from(new Set([...existing.amounts, ingredient.amount]))

    return items.map((item) =>
      item.id === existing.id ? { ...item, sources: nextSources, amounts: nextAmounts } : item
    )
  }

  const handleAddIngredient = (recipe, ingredient) => {
    const listId = activeShoppingListId || shoppingLists[0]?.id
    if (!listId) {
      return
    }
    setShoppingItems((prev) => upsertShoppingItem(prev, recipe, ingredient, listId))
    setShoppingTarget({ recipe, ingredient })
    setIsShoppingSheetOpen(false)
    setShoppingToast({ message: 'Ingrediente agregado', showLists: true })
  }

  const handleOpenShoppingSheet = () => {
    if (!shoppingTarget) {
      return
    }
    setIsShoppingSheetOpen(true)
    setShoppingToast(null)
  }

  const handleSelectShoppingList = (listId) => {
    if (!shoppingTarget) {
      return
    }
    setShoppingItems((prev) => {
      const { recipe, ingredient } = shoppingTarget
      const normalizedName = ingredient.name.trim().toLowerCase()
      const next = prev.flatMap((item) => {
        if (item.name.trim().toLowerCase() !== normalizedName) {
          return [item]
        }
        const hasSource = item.sources.some(
          (source) => source.recipeId === recipe.id && source.amount === ingredient.amount
        )
        if (!hasSource) {
          return [item]
        }
        const nextSources = item.sources.filter(
          (source) => !(source.recipeId === recipe.id && source.amount === ingredient.amount)
        )
        if (nextSources.length === 0) {
          return []
        }
        const nextAmounts = Array.from(new Set(nextSources.map((source) => source.amount)))
        return [{ ...item, sources: nextSources, amounts: nextAmounts }]
      })
      return upsertShoppingItem(next, recipe, ingredient, listId)
    })

    const listName = shoppingLists.find((list) => list.id === listId)?.name
    setIsShoppingSheetOpen(false)
    setShoppingToast({
      message: listName ? `Agregado a ${listName}` : 'Agregado a la lista',
      showLists: false
    })
  }

  const handleToggleShoppingItem = (itemId) => {
    setShoppingItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    )
  }

  const openDetail = () => {
    if (detailTimer.current) {
      clearTimeout(detailTimer.current)
    }
    setIsFilterOpen(false)
    requestAnimationFrame(() => setIsDetailOpen(true))
  }

  const handleViewRecipe = (recipe) => {
    setDetailProfile(null)
    setDetailRecipe(recipe)
    openDetail()
  }

  const handleViewProfile = (profile) => {
    if (!profile) {
      return
    }
    setDetailRecipe(null)
    setDetailProfile(profile)
    openDetail()
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    detailTimer.current = setTimeout(() => {
      setDetailRecipe(null)
      setDetailProfile(null)
    }, 480)
  }

  const handleOpenSaveSheet = () => {
    if (!saveTarget) {
      return
    }
    setIsSaveSheetOpen(true)
    setSaveToast(null)
  }

  const hasFilters = Object.keys(selectedFilters).length > 0

  return (
    <div className={`app${isDetailOpen ? ' is-detail' : ''}`}>
      <TopBar
        onOpenFilters={() => setIsFilterOpen(true)}
        onCreate={() => {
          setIsFilterOpen(false)
          setActiveTab('create')
        }}
      />
      <FilterMenu
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={handleClearFilters}
        categories={filterCategories}
        selectedFilters={selectedFilters}
        onToggleOption={handleToggleFilter}
      />
      <main className={`main-content${activeTab === 'home' ? ' is-feed' : ''}`}>
        {activeTab === 'home' ? (
          <HomeFeed
            recipes={filteredRecipes}
            hasFilters={hasFilters}
            onClearFilters={handleClearFilters}
            onViewRecipe={handleViewRecipe}
            onViewProfile={handleViewProfile}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
          />
        ) : null}
        {activeTab === 'saved' ? (
          <SavedPage
            recipes={recipeData}
            savedItems={savedItems}
            savedLists={savedLists}
            onToggleCompleted={handleToggleCompleted}
            onCreateList={handleCreateList}
            onNavigateHome={() => setActiveTab('home')}
          />
        ) : null}
        {activeTab === 'shopping' ? (
          <ShoppingPage
            items={shoppingItems}
            lists={shoppingLists}
            activeListId={activeShoppingListId}
            onSelectList={setActiveShoppingListId}
            onCreateList={handleCreateShoppingList}
            onToggleItem={handleToggleShoppingItem}
            onNavigateHome={() => setActiveTab('home')}
          />
        ) : null}
        {activeTab === 'chats' ? (
          <ChatsPage
            chats={chatData}
            recommendedGroups={recommendedGroups}
            onNavigateHome={() => setActiveTab('home')}
          />
        ) : null}
        {activeTab === 'profile' ? (
          <ProfilePage profile={profileData} recipes={recipeData} />
        ) : null}
        {activeTab === 'create' ? <PlaceholderPage {...placeholderCopy.create} /> : null}
      </main>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      <RecipeDetailPanel
        recipe={detailRecipe}
        open={isDetailOpen && Boolean(detailRecipe)}
        onClose={handleCloseDetail}
        onAddIngredient={handleAddIngredient}
        shoppingItems={shoppingItems}
      />
      <ProfileDetailPanel
        profile={detailProfile}
        open={isDetailOpen && Boolean(detailProfile)}
        onClose={handleCloseDetail}
        recipes={recipeData}
      />
      {saveToast ? (
        <div className={`save-toast${saveToast ? ' is-visible' : ''}`}>
          <div>
            <p className="save-toast-message">{saveToast.message}</p>
            {saveToast.showLists ? (
              <button className="save-toast-action" type="button" onClick={handleOpenSaveSheet}>
                Ver listas
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      {shoppingToast ? (
        <div className={`shopping-toast${shoppingToast ? ' is-visible' : ''}`}>
          <div>
            <p className="shopping-toast-message">{shoppingToast.message}</p>
            {shoppingToast.showLists ? (
              <button
                className="shopping-toast-action"
                type="button"
                onClick={handleOpenShoppingSheet}
              >
                Ver listas
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className={`save-sheet${isSaveSheetOpen ? ' is-open' : ''}`} aria-hidden={!isSaveSheetOpen}>
        <div className="save-sheet-overlay" onClick={() => setIsSaveSheetOpen(false)} />
        <div className="save-sheet-panel" role="dialog" aria-label="Guardar en lista">
          <div className="save-sheet-header">
            <h3>Guardar en lista</h3>
            <button className="text-button" type="button" onClick={() => setIsSaveSheetOpen(false)}>
              Cerrar
            </button>
          </div>
          <div className="save-sheet-list">
            {savedLists.map((list) => {
              const count = savedItems.filter((item) => item.listIds.includes(list.id)).length
              return (
                <button
                  key={list.id}
                  type="button"
                  className="save-sheet-option"
                  onClick={() => handleSelectSaveList(list.id)}
                >
                  <span className="save-sheet-color" style={{ background: list.color }} />
                  <span className="save-sheet-name">{list.name}</span>
                  <span className="save-sheet-count">{count} recetas</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className={`shopping-sheet${isShoppingSheetOpen ? ' is-open' : ''}`}
        aria-hidden={!isShoppingSheetOpen}
      >
        <div className="shopping-sheet-overlay" onClick={() => setIsShoppingSheetOpen(false)} />
        <div className="shopping-sheet-panel" role="dialog" aria-label="Agregar a lista">
          <div className="shopping-sheet-header">
            <h3>Agregar a lista</h3>
            <button
              className="text-button"
              type="button"
              onClick={() => setIsShoppingSheetOpen(false)}
            >
              Cerrar
            </button>
          </div>
          <div className="shopping-sheet-list">
            {shoppingLists.map((list) => (
              <button
                key={list.id}
                className="shopping-sheet-option"
                type="button"
                onClick={() => handleSelectShoppingList(list.id)}
              >
                <span className="shopping-sheet-color" style={{ background: list.color }} />
                <span className="shopping-sheet-name">{list.name}</span>
                <span className="shopping-sheet-count">
                  {shoppingItems.filter((item) => item.listId === list.id).length} ingredientes
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
