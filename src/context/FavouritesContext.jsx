import { createContext, useContext, useState, useEffect } from 'react'

const FavouritesContext = createContext(null)
const STORAGE_KEY = 'recipehub-favourites'

function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(loadFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // storage unavailable (private mode, full): the app still works, just without saving
    }
  }, [favourites])

  function isFavourite(id) {
    return favourites.some((m) => m.idMeal === id)
  }

  function toggleFavourite(meal) {
    setFavourites((current) =>
      current.some((m) => m.idMeal === meal.idMeal)
        ? current.filter((m) => m.idMeal !== meal.idMeal)
        : [
            ...current,
            {
              idMeal: meal.idMeal,
              strMeal: meal.strMeal,
              strMealThumb: meal.strMealThumb,
              strCategory: meal.strCategory,
            },
          ]
    )
  }

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavourites must be used inside FavouritesProvider')
  return context
}
