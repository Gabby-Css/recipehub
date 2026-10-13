import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import RecipeCard from '../components/RecipeCard'
import EmptyState from '../components/EmptyState'

function Favourites() {
  const { favourites } = useFavourites()

  return (
    <section className="page">
      <h1>Your saved recipes</h1>

      {favourites.length === 0 ? (
        <>
          <EmptyState message="Nothing saved yet. When a recipe makes your mouth water, tap the heart!" />
          <p className="status"><Link to="/" className="text-link">Find something tasty</Link></p>
        </>
      ) : (
        <div className="recipe-grid">
          {favourites.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favourites
