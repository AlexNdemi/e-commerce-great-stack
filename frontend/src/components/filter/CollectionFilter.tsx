 import {type FC} from 'react'
import { useTheme } from '../../hooks/useTheme'
interface CollectionFilterProps{
  id:string
  Category:string
  values:string[]
  showFilter:boolean
  selectedValues:string[]
  handleCheckboxChange:(value:string)=>void
}

const CollectionFilter :FC<CollectionFilterProps>= ({id,Category,values,showFilter,selectedValues,handleCheckboxChange}) => {
  const{theme}=useTheme();
  return (
    <div id={id} className={`${theme==="dark"?"border-gray-500":"border-gray-300"} border pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
      <p className="mb-3 text-sm font-medium">{Category}</p>
      <div className="flex flex-col gap-4 text-sm font-light">
        {values.map((value, index) => (
          <div className="flex items-center" key={index}>
            <input
              className="hidden"
              value={value}
              type="checkbox"
              id={`${id}-item-${index}`}
              checked={selectedValues.includes(value)}
              onChange={() => handleCheckboxChange(value)}
            />
            <label
              className="flex items-center cursor-pointer"
              htmlFor={`${id}-item-${index}`}
            >
              <span className={`inline-block w-4 h-4 border-2 mr-2 flex-shrink-0 relative ${selectedValues.includes(value) ? 'bg-[#F16E00] border-[#F16E00]' : theme==="dark"?"border-gray-500":"border-gray-300"}`}>
                {selectedValues.includes(value) && (
                  <svg className="absolute inset-0 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className={`${theme === "dark"?"text-textDark-900": "text-black"}`}>
                {value}
              </span>  
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionFilter
