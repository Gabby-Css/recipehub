function CategoryCard({ category, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(category.strCategory)}
    >
      <img src={category.strCategoryThumb} alt="" />
      <span>{category.strCategory}</span>
    </button>
  )
}

export default CategoryCard
