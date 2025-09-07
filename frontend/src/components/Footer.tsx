import {type FC} from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer:FC = () => {
  return (
    <div>
     <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  ">

      <div>
        <img src={assets.logo} className='mt-5 w-32' alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nisi.
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet alias quisquam similique pariatur necessitatibus. Autem totam commodi in voluptatum maxime?
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>privacy policy</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1">
          <li>+1-212-456-7890</li>
          <li>contact@foreveryou.com</li>
        </ul>
      </div>
    </div>
    <div>
      <hr/>
      <p className="py-5 text-sm text-center">&copy; 2024@forever.com-All Rights Reserved</p>
    </div>

    </div>
  )
}

export default Footer
