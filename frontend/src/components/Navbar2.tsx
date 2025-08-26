import { useState, type FC } from 'react'
import { NavLink } from 'react-router-dom'

// Mock assets since we can't import the actual file
const assets = {
  logo: "https://via.placeholder.com/50x50?text=Logo"
}

const Navbar2: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  
  return (
    <header className='flex items-center justify-between p-4 bg-white shadow-md relative'>
      <div className='z-30'>
        <img src={assets.logo} alt="Logo" className='h-10' />
      </div>
      
      {/* Mobile menu button */}
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
            stroke="currentColor"
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
            stroke="currentColor"
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
      
      {/* Navigation */}
      <nav className={`z-20 ${navOpen ? 'fixed inset-0 bg-black bg-opacity-50' : ''}`} onClick={() => setNavOpen(false)}>
        <ul 
          id="primary-navigation"
          className={`
            flex gap-6 md:static md:flex-row md:translate-x-0 md:bg-transparent md:shadow-none md:py-0 md:px-0
            fixed top-0 right-0 bottom-0 left-0 bg-white flex-col py-24 px-8 text-lg
            transition-transform duration-300 ease-out
            ${navOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          `}
        >
          <li>
            <NavLink 
              to='/' 
              className={({isActive}) => `py-2 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/collection' 
              className={({isActive}) => `py-2 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
            >
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/about' 
              className={({isActive}) => `py-2 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/contact' 
              className={({isActive}) => `py-2 transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar2;