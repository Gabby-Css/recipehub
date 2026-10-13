import { useState, useEffect } from 'react'
import { searchMeals } from '../api/mealApi'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

const SUGGESTIONS = ['Chicken', 'Pasta', 'Beef', 'Cake', 'Soup', 'Rice']

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function Home() {
  const [input, setInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('chicken')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadMeals() {
      setLoading(true)
      setError(null)
      try {
        const results = await searchMeals(searchTerm)
        if (!ignore) setMeals(results)
      } catch {
        if (!ignore) setError("We couldn't reach the kitchen. Check your connection and try again.")
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadMeals()
    return () => {
      ignore = true
    }
  }, [searchTerm])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) setSearchTerm(trimmed)
  }

  function handleSuggestion(word) {
    setInput(word)
    setSearchTerm(word)
  }

  return (
    <section className="page">
      <header className="hero">
        <p className="hero-greeting">{getGreeting()} 👋</p>
        <h1>What are we cooking today?</h1>
        <SearchBar value={input} onChange={setInput} onSubmit={handleSubmit} />
        <div className="chips">
          {SUGGESTIONS.map((word) => (
            <button key={word} type="button" className="chip" onClick={() => handleSuggestion(word)}>
              {word}
            </button>
          ))}
        </div>
      </header>

      <h2 className="section-title">Recipes for “{searchTerm}”</h2>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && meals.length === 0 && (
        <EmptyState message={`Nothing found for "${searchTerm}". Try another word?`} />
      )}

      <div className="recipe-grid">
        {!loading && !error && meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  )
}

export default Home
