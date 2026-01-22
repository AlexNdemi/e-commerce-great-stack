import { useState, useEffect, useRef, type FC } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets.ts';
import { useTheme } from '../../hooks/useTheme.ts';
import { useShop } from '../../hooks/useShop.ts';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES } from '../../components/config/routes';

const Navbar: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { setShowSearchBar, cartCount } = useShop();
  const { user, logout, isRefreshing } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setNavOpen(false);
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigate to orders or login
  const handleOrdersClick = () => {
    setNavOpen(false);
    setUserMenuOpen(false);
    if (user) {
      navigate(ROUTES.ORDERS);
    } else {
      navigate(ROUTES.LOGIN, { state: { from: ROUTES.ORDERS } });
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  return (
    <header className={`flex items-center justify-between p-4 mb-8 ${theme === 'dark' ? ' text-white' : 'bg-[#E3E6E6] text-black'}`}>
      {/* Logo - Fixed width to prevent squishing */}
      <div className='z-30 flex-shrink-0'>
        <Link to="/">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className={`h-8 sm:h-10 ${theme === 'dark' ? 'invert' : ''}`} 
          />
        </Link>
      </div>
     
      {/* Overlay that only appears when menu is open on mobile */}
      {navOpen && (
        <div 
          className={`fixed inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/10 '} z-10 md:hidden`}
          onClick={() => setNavOpen(false)}
        />
      )}
      
      {/* Navigation Menu - Hidden on mobile, shown on md+ */}
      <nav className="z-20 flex-1 mx-8 hidden md:block">
        <ul 
          id="primary-navigation"
          className="flex items-center justify-center gap-4 lg:gap-8"
        >
          <li>
            <NavLink 
              to={'/'} 
              className={({ isActive }) => 
                `py-2 text-sm lg:text-base transition hover:text-navlinkDark-hover bold-on-hover ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/collection'} 
              className={({ isActive }) => 
                `py-2 text-sm lg:text-base transition hover:text-navlinkDark-hover bold-on-hover ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/about'} 
              className={({ isActive }) => 
                `py-2 text-sm lg:text-base transition hover:text-navlinkDark-hover bold-on-hover ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/contact'} 
              className={({ isActive }) => 
                `py-2 text-sm lg:text-base transition hover:text-navlinkDark-hover bold-on-hover ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation Menu - Slide-in panel */}
      {/* Mobile Navigation Menu - Slide-in panel */}
{/* Mobile Navigation Menu - Slide-in panel */}
<nav className="z-20 md:hidden">
  <ul 
    className={`
      fixed top-0 right-0 bottom-0 left-0 
      flex flex-col gap-1 py-20 px-4 text-lg
      transition-transform duration-300 ease-out
      ${navOpen ? 'translate-x-[30%]' : 'translate-x-full'}
      ${theme === 'dark' ? 'bg-[hsl(180,6%,10%)]' : 'bg-[#E3E6E6]'}
    `}
  >
    <li>
      <NavLink 
        to={'/'} 
        className="group block"
        onClick={() => setNavOpen(false)}
      >
        {({ isActive }) => (
          <div 
            className={`
              flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200
              ${isActive ? 'font-bold' : ''}
              group-hover:bg-[var(--surfaceElementBg)]
            `}
          >
            {isActive ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
                />
              </svg>
            )}
            <span className="text-xl">Home</span>
          </div>
        )}
      </NavLink>
    </li>
    <li>
      <NavLink 
        to={'/collection'} 
        className="group block"
        onClick={() => setNavOpen(false)}
      >
        {({ isActive }) => (
          <div
            className={`
              flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200
              ${isActive ? 'font-bold' : ''}
              group-hover:bg-[var(--surfaceElementBg)]
            `}
          >
            {isActive ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              >
                <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" 
                />
              </svg>
            )}
            <span className="text-xl">Collection</span>
          </div>
        )}
      </NavLink>
    </li>
    <li>
      <NavLink 
        to={'/about'} 
        className="group block"
        onClick={() => setNavOpen(false)}
      >
        {({ isActive }) => (
          <div
            className={`
              flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200
              ${isActive ? 'font-bold' : ''}
              group-hover:bg-[var(--surfaceElementBg)]
            `}
          >
            {isActive ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              >
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                />
              </svg>
            )}
            <span className="text-xl">About</span>
          </div>
        )}
      </NavLink>
    </li>
    <li>
      <NavLink 
        to={'/contact'} 
        className="group block"
        onClick={() => setNavOpen(false)}
      >
        {({ isActive }) => (
          <div
            className={`
              flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200
              ${isActive ? 'font-bold' : ''}
              group-hover:bg-[var(--surfaceElementBg)]
            `}
          >
            {isActive ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" 
                />
              </svg>
            )}
            <span className="text-xl">Contact</span>
          </div>
        )}
      </NavLink>
    </li>
    
    {/* Theme Toggle - Mobile Only */}
    <li className="mt-4 pt-4 border-t border-[var(--border)]">
      <button 
        onClick={() => {
          toggleTheme();
          setNavOpen(false);
        }}
        className="w-full group"
      >
        <div className="flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200 group-hover:bg-[var(--surfaceElementBg)]">
          {theme === 'light' ? (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
                />
              </svg>
              <span className="text-xl">Dark Mode</span>
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
                />
              </svg>
              <span className="text-xl">Light Mode</span>
            </>
          )}
        </div>
      </button>
    </li>
  </ul>
</nav>
      
      {/* Right Side Icons */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-shrink-0">
        {/* Theme Toggle - Desktop Only */}
        <button 
          onClick={toggleTheme}
          className="hidden md:block p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 lg:w-6 lg:h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
              />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 lg:w-6 lg:h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
              />
            </svg>
          )}
        </button>
        
        {/* Search Icon */}
        <button
          onClick={() => {
            setShowSearchBar(true);
            navigate("/collection");
          }}
          className="p-2 hover:text-[#f68b1e] transition-colors"
          aria-label="Search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-5 h-5 lg:w-6 lg:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        {/* User Menu - Desktop Only */}
        {user ? (
          <div ref={userMenuRef} className="hidden dl:block relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-sm font-medium">
                Hi, {user.email?.split('@')[0] || 'user'}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2" 
                stroke="currentColor" 
                className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {userMenuOpen && (
              <div 
                className={`absolute right-0 top-full mt-2 z-40 w-48 py-2 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-2 duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-gray-300' 
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                <button
                  onClick={handleOrdersClick}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  My Orders
                </button>
                <div className={`h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <button
                  onClick={handleLogout}
                  disabled={isRefreshing}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    theme === 'dark'
                      ? 'hover:bg-red-900/20 hover:text-red-400'
                      : 'hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {isRefreshing ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="hidden md:block px-4 py-2 bg-[#f68b1e] text-white text-sm font-medium rounded-lg hover:bg-[#e07a0e] transition-colors"
          >
            Login
          </button>
        )}
        
        {/* Cart Icon */}
        <Link to={'/cart'} className="relative hover:text-[#f68b1e] p-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>

          {cartCount > 0 && (
            <span
              className={`
                absolute
                -top-1.5
                left-3
                flex
                items-center
                justify-center
                h-5
                min-w-[18px]
                px-1.5
                bg-[#f68b1e]
                text-black
                text-[11px]
                font-bold
                rounded-full
                shadow-sm
                leading-none
                tracking-tight
              `}
            >
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>

        {/* Token Refresh Indicator */}
        {isRefreshing && (
          <div className="hidden lg:flex items-center gap-2 text-xs text-blue-500">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Refreshing...</span>
          </div>
        )}
        
        {/* Mobile Menu Toggle */}
        <button 
          aria-controls='primary-navigation' 
          aria-expanded={navOpen}
          className={`md:hidden z-30 p-2 bg-transparent border-0 ${navOpen ? 'fixed right-16' : ''}`}
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === 'dark' ? 'white' : 'black'}
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme === 'dark' ? 'white' : 'black'}
              className="w-7 h-7"
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
  );
};

export default Navbar;