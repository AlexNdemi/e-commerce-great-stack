import { useState, useMemo } from "react"
import { useShop } from "../../hooks/useShop"
import { type product } from "../../context/shop/ShopTypes"
import { useMultiSelect } from "../../hooks/useMultiSelect"
import { useDebounce } from "../../hooks/useDebounce"
import { sortByPrice,filterBySearch,filterByCategory } from "./filterUtils"

export function useCollectionFilter() {
  const { shop, searchTerm, setSearchTerm } = useShop()
  const [showFilter, setShowFilter] = useState(false)

  const category = useMultiSelect()
  const subCategory = useMultiSelect()
  const [sortType, setSortType] = useState<string>("relevant")

  const debouncedSearch = useDebounce(searchTerm, 300)

  

  // ✅ useMemo stays synchronous
  const filteredProducts: product[] = useMemo(() => {
    let result = [...shop]
    result = filterByCategory(result,category.values,subCategory.values)
    result = filterBySearch(result,debouncedSearch)
    result = sortByPrice(result,sortType)
    return result
  }, [shop, category.values, subCategory.values, sortType, debouncedSearch])

  return {
    filteredProducts,
    showFilter,
    setShowFilter,
    category,
    subCategory,
    sortType,
    setSortType,
    searchTerm,
    setSearchTerm,
  }
}

