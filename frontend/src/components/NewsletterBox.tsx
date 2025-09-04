import {type FC} from 'react'
import { useTheme } from '../hooks/useTheme'

const NewsletterBox:FC = () => {
  const {theme}=useTheme();
  return (
    <div className='text-center'>
      <p className={`text-2xl font-medium ${theme === "dark"?"text-textDark-900": "text-textLight-900"}`}>Subscribe now & get 20% off</p>
      <p className="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quasi!</p>
      <form action="">
        <input type="email" placeholder="Enter your email" className="w-full" required />
        <button type='submit'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
