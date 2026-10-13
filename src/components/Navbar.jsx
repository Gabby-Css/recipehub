import { NavLink } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function Navbar() {
  const { favourites } = useFavourites()

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">🍲 RecipeHub</NavLink>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/favourites">Favourites ({favourites.length})</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
