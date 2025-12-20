import { useState, type FC } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets.ts';
import { useTheme } from '../../hooks/useTheme.ts';
import { useShop } from '../../hooks/useShop.ts';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES } from '../../components/config/routes';

const Navbar: FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { setShowSearchBar, cartCount } = useShop();
  const { user, logout, isRefreshing } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setNavOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigate to orders or login
  const handleOrdersClick = () => {
    setNavOpen(false);
    if (user) {
      navigate(ROUTES.ORDERS);
    } else {
      navigate(ROUTES.LOGIN, { state: { from: ROUTES.ORDERS } });
    }
  };

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
      <nav className="z-20 md:hidden">
        <ul 
          className={`
            fixed top-0 right-0 bottom-0 left-0 
            flex flex-col gap-6 py-24 px-8 text-lg
            transition-transform duration-300 ease-out
            ${navOpen ? 'translate-x-[30%]' : 'translate-x-full'}
            ${theme === 'dark' ? 'bg-[hsl(180,6%,10%)]' : 'bg-[#E3E6E6]'}
          `}
        >
          <li>
            <NavLink 
              to={'/'} 
              className={`py-2 block transition hover:text-navlinkDark-hover bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/collection'} 
              className={`py-2 block transition hover:text-navlinkDark-hover bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/about'} 
              className={`py-2 block transition hover:text-navlinkDark-hover bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'/contact'} 
              className={`py-2 block transition hover:text-navlinkDark-hover bold-on-hover`}
              onClick={() => setNavOpen(false)}
            >
              CONTACT
            </NavLink>
          </li>

          {/* Theme Toggle - Mobile Only */}
          <li className="border-t pt-4 mt-4">
            <button 
              onClick={() => {
                toggleTheme();
                setNavOpen(false);
              }}
              className="w-full py-2 flex items-center gap-3 transition hover:text-navlinkDark-hover"
            >
              {theme === 'light' ? (
                <>
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
                  <span>DARK MODE</span>
                </>
              ) : (
                <>
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
                  <span>LIGHT MODE</span>
                </>
              )}
            </button>
          </li>

          {/* Auth Actions - Mobile Only */}
          {user ? (
            <>
              <li className="border-t pt-4">
                <div className="text-sm opacity-70 mb-2 px-2">
                  Signed in as: {user.email}
                </div>
              </li>
              <li>
                <button
                  onClick={handleOrdersClick}
                  className="w-full py-2 text-left transition hover:text-navlinkDark-hover"
                >
                  MY ORDERS
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  disabled={isRefreshing}
                  className="w-full py-2 text-left transition hover:text-red-500 disabled:opacity-50"
                >
                  {isRefreshing ? 'LOGGING OUT...' : 'LOGOUT'}
                </button>
              </li>
            </>
          ) : (
            <li className="border-t pt-4">
              <button
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                  setNavOpen(false);
                }}
                className="w-full py-2 text-left transition hover:text-navlinkDark-hover font-semibold"
              >
                LOGIN
              </button>
            </li>
          )}
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
          // Logged in: Show dropdown with profile options
          <div className="hidden md:block group relative">
            <button 
              className="p-2 hover:text-[#f68b1e] transition-colors"
              aria-label="User menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="w-5 h-5 lg:w-6 lg:h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>

            <div className={`group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-40`}>
              <div className={`flex flex-col gap-2 w-36 py-3 px-5 rounded shadow-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-500'}`}>
                <p className="text-xs font-semibold border-b pb-2 mb-1 truncate">
                  {user.email}
                </p>
                <button
                  onClick={handleOrdersClick}
                  className="text-left cursor-pointer hover:text-blue-500 transition-colors"
                >
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isRefreshing}
                  className="text-left cursor-pointer hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRefreshing ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div> 
          </div>
        ) : (
          // Not logged in: Show login button
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="hidden md:block px-4 py-2 bg-[#f68b1e] text-white text-sm font-medium rounded-lg hover:bg-[#e07a0e]  transition-colors"
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