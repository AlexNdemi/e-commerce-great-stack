import {type FC} from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { useTheme } from '../../hooks/useTheme'
import { ImageWithSkeleton} from './ImageWithSkeleton'

const Hero:FC = () => {
  const {theme}=useTheme();
  return (
    <div className={`flex flex-col sm:flex-row border ${theme === 'dark'?'border-[#3c4043]':'border-[rgb(219,219,219)]'}`}>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className={`${theme === 'dark'?'text-[#f1f1f1]':'text-[#414141]'}`}>
          <div className="flex items-center gap-2">
           <p className="w-8 md:w-11 h-[2px] bg-[currentColor]"></p>
            <p className="font-medium text-sm md:text-base">Our BESTSELLERS</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrival
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[currentColor]'></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <ImageWithSkeleton src={assets.hero_img} alt={'hero'} className='w-full sm:w-1/2'/>
    </div>
  )
}

export default Hero
