import {type FC} from 'react'
import { useTheme } from '../hooks/useTheme'

const NewsletterBox:FC = () => {
  const {theme}=useTheme();
  return (
    <div className='text-center'>
      <p className={`text-2xl font-medium ${theme === "dark"?"text-textDark-900": "text-textLight-900"}`}>Subscribe now & get 20% off</p>
      <p className="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quasi!</p>
      <form action="" className={`w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border ${theme === 'dark'? 'border-[#fff]':''} pl-3`}>
        <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" required />
        <button className={`${theme === 'dark'?"bg-[rgb(255,255,255)] text-black":"bg-[#231f20] text-white"} text-xs px-10 py-4 font-medium`}type='submit'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
