import { useState, useEffect } from 'react'
import { getCategories, getMealsByCategory } from '../api/mealApi'
import CategoryCard from '../components/CategoryCard'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

function Categories() {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)

  const [selected, setSelected] = useState(null)
  const [meals, setMeals] = useState([])
  const [mealsLoading, setMealsLoading] = useState(false)
  const [mealsError, setMealsError] = useState(null)

  // 1. Load all categories once, when the page opens
  useEffect(() => {
    let ignore = false

    async function loadCategories() {
      try {
        const result = await getCategories()
        if (!ignore) setCategories(result)
      } catch {
        if (!ignore) setCategoriesError("We couldn't load the categories. Please try again soon.")
      } finally {
        if (!ignore) setCategoriesLoading(false)
      }
    }

    loadCategories()
    return () => {
      ignore = true
    }
  }, [])

  // 2. Load the meals whenever a different category is selected
  useEffect(() => {
    if (!selected) return
    let ignore = false

    async function loadMeals() {
      setMealsLoading(true)
      setMealsError(null)
      try {
        const result = await getMealsByCategory(selected)
        if (!ignore) setMeals(result)
      } catch {
        if (!ignore) setMealsError("We couldn't load those recipes. Please try again.")
      } finally {
        if (!ignore) setMealsLoading(false)
      }
    }

    loadMeals()
    return () => {
      ignore = true
    }
  }, [selected])

  return (
    <section className="page">
      <h1>What are you in the mood for?</h1>

      {categoriesLoading && <Loader />}
      {categoriesError && <ErrorMessage message={categoriesError} />}

      <div className="category-grid">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.idCategory}
            category={cat}
            isActive={cat.strCategory === selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      {selected && (
        <>
          <h2 className="category-heading">{selected} recipes</h2>
          {mealsLoading && <Loader />}
          {mealsError && <ErrorMessage message={mealsError} />}
          {!mealsLoading && !mealsError && meals.length === 0 && (
            <EmptyState message={`No ${selected} recipes yet. Try another category!`} />
          )}
          <div className="recipe-grid">
            {!mealsLoading && !mealsError && meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Categories
