import {type FC} from 'react'
import CollectionFilter from '../filter/CollectionFilter'
import { useCollectionFilter } from './useCollectionFilter'
import { useTheme } from '../../hooks/useTheme'

const CollectionComponent:FC = () => {
  const{theme}=useTheme()
  const {shop,showFilter,setShowFilter,selectedValues,handleCheckboxChange}=useCollectionFilter()
  return (
    <div className={`flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ${theme==="dark"?"border-t-gray-500":"border-t-gray-300"}`}>
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
          selectedValues={selectedValues}
          handleCheckboxChange={handleCheckboxChange} />
        <CollectionFilter 
          id={'type'}
          Category='TYPE'
          values={['Topwear','Bottomwear','Winterwear']} 
          showFilter={showFilter}
          selectedValues={selectedValues}
          handleCheckboxChange={handleCheckboxChange} />
      </div>

    </div>
  )
}

export default CollectionComponent
