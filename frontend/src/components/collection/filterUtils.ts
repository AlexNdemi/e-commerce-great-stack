import { type product } from "../../context/shop/ShopTypes"
export function filterByCategory(products: product[], categories: string[], subCategories: string[]) { 
  let result = products
    if (categories.length > 0) {
      result = result.filter(p => categories.includes(p.category))
    }
    if (subCategories.length > 0) {
      result = result.filter(p => subCategories.includes(p.subCategory))
    }
    return result 
}
export function filterBySearch(products: product[], query: string) {  
  if (query.trim() !== "") {
      const lower = query.toLowerCase()
      return products.filter(
        p =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.subCategory.toLowerCase().includes(lower)
      )
    }
    return products 
}
export function sortByPrice(products: product[], sortType: string) {  
  switch (sortType) {
      case "low-high":
        return [...products].sort((a, b) => a.price - b.price)
      case "high-low":
        return [...products].sort((a, b) => b.price - a.price)
      default:
        return products
    } }
