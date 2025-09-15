import { useState, useMemo,useEffect } from "react"
import { useShop } from "../../hooks/useShop"
import { type product } from "../../context/shop/ShopTypes"
import { useMultiSelect } from "../../hooks/useMultiSelect"
import { useDebounce } from "../../hooks/useDebounce"
import { sortByPrice,filterBySearch,filterByCategory } from "./filterUtils"
import { useLocation } from "react-router-dom"

export function useCollectionFilter() {
  const { shop, searchTerm, setSearchTerm,setShowSearchBar } = useShop()
  const [showFilter, setShowFilter] = useState(false)

  const category = useMultiSelect()
  const subCategory = useMultiSelect()
  const [sortType, setSortType] = useState<string>("relevant")
  const location = useLocation()

  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(()=>{
    setShowSearchBar(true)
    return()=>{
      if(location.pathname.includes('collection')){
        setShowSearchBar(false)
      }
      
    } 
  },[setShowSearchBar,location])
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

