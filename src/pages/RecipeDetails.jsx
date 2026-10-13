import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMealById, getIngredients } from '../api/mealApi'
import IngredientList from '../components/IngredientList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import FavouriteButton from '../components/FavouriteButton'


function RecipeDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadMeal() {
      setLoading(true)
      setError(null)
      try {
        const result = await getMealById(id)
        if (!ignore) setMeal(result)
      } catch {
        if (!ignore) setError("We couldn't load this recipe. Please try again in a moment.")
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadMeal()
    return () => {
      ignore = true
    }
  }, [id])

  if (loading) return <section className="page"><Loader /></section>
  if (error) return <section className="page"><ErrorMessage message={error} /></section>
  if (!meal) {
    return (
      <section className="page">
        <EmptyState message="We couldn't find that recipe. Maybe it's off the menu?" />
        <p className="status"><Link to="/">Back to all recipes</Link></p>
      </section>
    )
  }

  const ingredients = getIngredients(meal)
  const steps = meal.strInstructions
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <section className="page recipe-details">
      <Link to="/" className="back-link">← Back to recipes</Link>

      <div className="recipe-hero">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h1>{meal.strMeal}</h1>
          <p className="recipe-tags">
            {meal.strCategory} · {meal.strArea}
          </p>
          <FavouriteButton meal={meal} withLabel />
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="video-link">
              ▶ Watch how it's made
            </a>
          )}
        </div>
      </div>

      <h2>What you'll need</h2>
      <IngredientList ingredients={ingredients} />

      <h2>How to make it</h2>
      <div className="instructions">
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </div>
    </section>
  )
}

export default RecipeDetails
