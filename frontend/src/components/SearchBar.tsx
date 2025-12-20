import {type FC,useRef} from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useTheme } from '../hooks/useTheme'
import { useShop } from '../hooks/useShop'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence,motion } from 'framer-motion'

const SearchBar:FC = () => {
  const navigate = useNavigate()
  const searchRef=useRef<HTMLInputElement>(null);
  const {theme}= useTheme()
  const {showSearchBar,setShowSearchBar,setSearchTerm}=useShop()
  function handleSearch(){
    setSearchTerm(searchRef.current?.value || '')
    navigate("/collection")
  }
  return <AnimatePresence>
    {showSearchBar?(
      <motion.div 
        className={`border-t ${theme==="dark"?"border-t-[#3c4043]":" border-t-[rgb(219,219,219)]"} text-center flex items-center justify-center`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        >
        
        <div className={`inline-flex items-center justify-center px-5   py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ${theme==="dark"?"bg-[#333334]":"bg-[hsl(220,13%,81%)]"}`}>
          <img className={`${theme === 'dark'?'invert':''} w-4 mr-2`}src={assets.search_icon} alt=""/>
          <input 
            ref={searchRef} 
            onChange={handleSearch}
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`flex-1 border-0 outline-0 bg-background text-sm ${theme === 'dark'?'placeholder-[#d1d5dc]':''}`} placeholder='Search products and categories' />
        </div>
        <img src={assets.cross_icon} alt="" className={`${theme === 'dark'?'invert':''} inline w-3 cursor-pointer`} onClick={()=>{setShowSearchBar(false)}} />
      
      </motion.div>) :null}
    </AnimatePresence>
  
}

export default SearchBar
