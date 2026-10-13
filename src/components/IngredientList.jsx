function IngredientList({ ingredients }) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((item) => (
        <li key={item.name}>
          <span className="measure">{item.measure}</span> {item.name}
        </li>
      ))}
    </ul>
  )
}

export default IngredientList
