import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

function NotFound() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <EmptyState message="Looks like this page burnt in the oven." />
      <p className="status"><Link to="/" className="text-link">Take me back to the kitchen</Link></p>
    </section>
  )
}

export default NotFound
