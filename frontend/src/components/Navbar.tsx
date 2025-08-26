import {useState, type FC} from 'react'
import { NavLink,Link } from 'react-router-dom'
import {assets} from '../assets/frontend_assets/assets.ts'
import hamburger from '../assets/Hamburger_icon.svg.png'
console.log(hamburger)
const Navbar:FC = () => {
  const [navOpen,setNavOpen] = useState<boolean>(false);
  return (
    <header className={`flex gap-4 items-center justify-around bg-amber-800`}>
      <div>
        <img src={assets.logo} className={`m-4`}/>
      </div>
      <button 
        aria-controls='primary-navigation' 
        aria-expanded={`${navOpen?"true":"false"}`}
        className={`hidden pn:block absolute z-[9999]  bg-transparent w-20 aspect-square right-8 bg-no-repeat border-0`}
        onClick={()=>{setNavOpen(!navOpen)}}>
        {navOpen ? (
          // ❌ Cross Icon
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
          // 🍔 Hamburger Icon
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
      <nav>
        <ul 
          id="primary-navigation"
          className={`flex gap-4 pn:fixed pn:top-0 pn:right-0 pn:bottom-0 pn:left-[30%] pn:bg-amber-900 pn:flex-col pn:py-[min(30vh,10rem)] pn:px-[2em] pn:text-white pn:gap-[2em]  z-[1000]  ${navOpen?'pn:translate-x-0':'pn:translate-x-full'} pn:transition duration-300 ease-out`}>
          <li>
            <NavLink to='/'>HOME</NavLink>
          </li>
          <li>
            <NavLink to='/collection'>COLLECTION</NavLink>
          </li>
          <li>
            <NavLink to='/about'>ABOUT</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>CONTACT</NavLink>
          </li>  
        </ul>
      </nav>
      {/* <div className="flex items-center gap-6 px-2.5">
        <img src={assets.search_icon} className="w-5 min-w-5 cursor-pointer "alt="" />
        <div className="group relative">
          <img className="w-5 min-w-5 cursor-pointer"src={assets.profile_icon} alt="" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div> 
        </div>
        <Link to='/cart' className="relative">
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">10</p>
        </Link>
      </div> */}
      

    </header>
  )
}

export default Navbar
