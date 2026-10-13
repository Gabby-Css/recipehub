const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(name) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.meals || []
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

// TheMealDB stores ingredients as strIngredient1..20 and strMeasure1..20
export function getIngredients(meal) {
  const items = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name && name.trim()) {
      items.push({ name: name.trim(), measure: (measure || '').trim() })
    }
  }
  return items
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.categories || []
}

export async function getMealsByCategory(category) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.meals || []
}

