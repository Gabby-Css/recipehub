import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'

function RecipeCard({ meal }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${meal.idMeal}`} className="recipe-card-link">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="recipe-card-body">
          <h3>{meal.strMeal}</h3>
          {meal.strCategory && <span>{meal.strCategory}</span>}
        </div>
      </Link>
      <FavouriteButton meal={meal} />
    </div>
  )
}

export default RecipeCard
