import {type FC} from 'react'
import CollectionFilter from '../filter/CollectionFilter'
import { useCollectionFilter } from './useCollectionFilter'
import { useTheme } from '../../hooks/useTheme'
import Title from '../ui/Title'
import ProductCollection from '../ui/ProductCollection'
import SearchBar from '../SearchBar'

const CollectionComponent:FC = () => {
  const{theme}=useTheme()
  const {filteredProducts,
    showFilter,
    setShowFilter,
    category,
    subCategory,
    setSortType,
  }=useCollectionFilter()

    

  return (
    <>
      <SearchBar/>
      <div className={`flex flex-col dl:flex-row gap-1 sm:gap-10 pt-10 border-t ${theme === 'dark'?'border-[#3c4043]':'border-[rgb(219,219,219)]'}`}>
        <div className="min-w-60">
         <button
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick = {()=>setShowFilter(!showFilter)}
          aria-label={"Toggle filters"}
          aria-expanded={showFilter}>
              FILTERS
              {
                showFilter ?<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline-block sm:hidden">
                    <path
                      strokeLinecap="round" strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>: <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 inline-block sm:hidden">
                      <path
                        strokeLinecap="round" strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              }
         </button>
         <CollectionFilter
            id={'categories'}
            Category='CATEGORIES'
            values={['Men','Women','Kids']}
            showFilter={showFilter}
            selectedValues={category.values}
            handleCheckboxChange={category.toggleValue} />
          <CollectionFilter
            id={'type'}
            Category='TYPE'
            values={['Topwear','Bottomwear','Winterwear']}
            showFilter={showFilter}
            selectedValues={subCategory.values}
            handleCheckboxChange={subCategory.toggleValue} />
        </div>
         <div className="flex-1">
           <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1='ALL' text2='COLLECTIONS'/>
            <select name="" id="" onChange={(e)=>{setSortType(e.target.value)}}className={`border ${theme==="dark"?"border-gray-500":"border-gray-300"}`}>
              <option value="relevant">
                Sort by:Relevant
              </option>
              <option value="low-high">
                Sort by:Low to High
              </option>
              <option value="high-low">
                Sort by:High to Low
              </option>
            </select>
           </div>
           <ProductCollection collection={filteredProducts} overideClassname='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6`'/>
      
         </div>
      </div>
    </>
  )
}

export default CollectionComponent
