import { useState, type FC } from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/frontend_assets/assets.ts'
import { useTheme } from '../../hooks/useTheme.ts';
import { useShop } from '../../hooks/useShop.ts';


const Navbar: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const{theme,toggleTheme}=useTheme();
  const {setShowSearchBar,cartCount}=useShop()
  const navigate=useNavigate();
  console.log(cartCount)  
  return (
   <header className={`flex items-center justify-between p-4 mb-8 ${theme === 'dark' ? ' text-white' : 'bg-white text-black'}`}>
      <div className='z-30'>
        <Link to="/">
          <img src={assets.logo} alt="Logo" className={`h-10 ${theme === 'dark'?'invert':''}`} />
        </Link>
        
      </div>
     
      {/* Overlay that only appears when menu is open on mobile */}
      {navOpen && (
        <div 
          className={`fixed inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/10 '} z-10 md:hidden`}
          onClick={() => setNavOpen(false)}
        />
      )}
      
      {/* Navigation Menu */}
      <nav className="z-20">
        <ul 
          id="primary-navigation"
          className={`
            flex gap-6 md:static md:flex-row md:translate-x-0 md:shadow-none md:py-0 md:px-0
            fixed top-0 right-0 bottom-0 left-0 flex-col py-24 px-8 text-lg
            transition-transform duration-300 ease-out
            ${navOpen ? 'translate-x-[30%]' : 'translate-x-full md:translate-x-0'}
            ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} [&>*]:w-full
          `}
        >
          <li>
            <NavLink 
              to={'/'} 
              className={`py-2 transition ${theme === 'dark' ? 'text-gray-300 hover:text-navlinkDark-hover' : 'text-gray-700 hover:text-navlinkLight-hover'} bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/collection'} 
              className={`py-2 transition ${theme === 'dark' ? 'text-gray-300 hover:text-navlinkDark-hover' : 'text-gray-700 hover:text-navlinkLight-hover'} bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/about'} 
              className={`py-2 transition ${theme === 'dark' ? 'text-gray-300 hover:text-navlinkDark-hover' : 'text-gray-700 hover:text-navlinkLight-hover'} bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/contact'} 
              className={`py-2 transition ${theme === 'dark' ? 'text-gray-300 hover:text-navlinkDark-hover' : 'text-gray-700 hover:text-navlinkLight-hover'} bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="flex items-center gap-6 px-2.5">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            // Moon icon for dark mode
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
              />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
              />
            </svg>
          )}
        </button>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="size-6"
          onClick={()=>{
            setShowSearchBar(true)
            navigate("/collection")
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <div className="group relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

          <div className={`group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-40`}>
            <div className={`flex flex-col gap-2 w-36 py-3 px-5 rounded shadow-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-500'}`}>
              <p className="cursor-pointer hover:text-blue-500 transition-colors">My Profile</p>
              <p className="cursor-pointer hover:text-blue-500 transition-colors">Orders</p>
              <p className="cursor-pointer hover:text-blue-500 transition-colors">Logout</p>
            </div>
          </div> 
        </div>
        
        <Link to={'/cart'} className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

          {cartCount > 0 && <p className={`absolute left-[12px] py-0 px-1 top-[-4px] h-4 min-w-3 max-w-[18px] text-center leading-4 ${theme === 'dark'?"bg-white text-black": "bg-black text-white"} rounded-3xl text-[12px] font-extrabold inline-block`}>{cartCount>9?"9+":cartCount}</p>}
        </Link>
        
        <button 
          aria-controls='primary-navigation' 
          aria-expanded={navOpen}
          className='md:hidden z-30 p-2 bg-transparent border-0'
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            // Cross Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === 'dark' ? 'white' : 'black'}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === 'dark' ? 'white' : 'black'}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
          <span className='sr-only'>Menu</span>
        </button>
      </div> 
    </header>
  )
}

export default Navbar;