import { useFavourites } from '../context/FavouritesContext'

function FavouriteButton({ meal, withLabel = false }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const saved = isFavourite(meal.idMeal)

  return (
    <button
      type="button"
      className={`fav-button ${saved ? 'saved' : ''} ${withLabel ? 'with-label' : ''}`}
      onClick={() => toggleFavourite(meal)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${meal.strMeal} from favourites` : `Save ${meal.strMeal} to favourites`}
    >
      {saved ? '♥' : '♡'}
      {withLabel && <span>{saved ? 'Saved' : 'Save to favourites'}</span>}
    </button>
  )
}

export default FavouriteButton
