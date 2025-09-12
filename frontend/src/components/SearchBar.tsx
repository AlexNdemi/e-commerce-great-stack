import {type FC} from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useTheme } from '../hooks/useTheme'

const SearchBar:FC = () => {
  const {theme}= useTheme()
  return (
    <div className={`border-t ${theme==="dark"?"border-t-gray-800  ":" border-t-gray-300"} text-center`}>
      <div className={`inline-flex items-center justify-center px-5   py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ${theme==="dark"?"bg-gray-800":"bg-[#F2F0F5]"}`}>
        <input type="text" className={`flex-1 border-0 outline-0 bg-background text-sm ${theme === 'dark'?'placeholder-[#d1d5dc]':'placeholder-[#364153]'}`} placeholder='Search' />
        <img className={`${theme === 'dark'?'invert':''} w-4`}src={assets.search_icon} alt="" />
      </div>
      <img src={assets.cross_icon} alt="" className={` ${theme === 'dark'?'invert':''} inline w-3 cursor-pointer`} />
      
    </div>
  ) 
}

export default SearchBar
