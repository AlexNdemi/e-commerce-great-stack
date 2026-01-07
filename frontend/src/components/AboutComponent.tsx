import  { type FC } from 'react'
import Title from './ui/Title'
import { Image } from './ui/ImageWithSkeleton'
import { assets } from '../assets/frontend_assets/assets'
import { useTheme } from '../hooks/useTheme'

const AboutComponent:FC = () => {
  const {theme} = useTheme();
  return (
    <div>
      <div className={`text-2xl text-center pt-8 border-t ${theme === 'dark'?'border-[#3c4043]':'border-[hsl(180,6%,75%)]'}`}>
        <Title text1='ABOUT' text2='US'/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <Image className='w-full md:max-w-[450]' src={assets.about_img} alt=''/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>
          <b className="text-[#f68b1e]">Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1='WHY' text2='CHOOSE US'/>
      </div>
      <div className={`flex flex-col md:flex-row text-sm mb-20`}>
        <div className={`border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ${theme === 'dark'?'border-[#3c4043]':'border-[hsl(180,6%,75%)]'}`}>
          <b>Quality Assurance:</b>
          <p className={`${theme === 'dark'? 'text-[#aaa]':''}`}>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
        </div> 
        <div className={`border-t border-b px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ${theme === 'dark'?'border-[#3c4043]':'border-[hsl(180,6%,75%)]'}`}>
          <b>Convenience:</b>
          <p className={`${theme === 'dark'? 'text-[#aaa]':''}`}>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className={`border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ${theme === 'dark'?'border-[#3c4043]':'border-[hsl(180,6%,75%)]'}`}>
          <b>Exceptional Customer Service:</b>
          <p className={`${theme === 'dark'? 'text-[#aaa]':''}`}>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      
    </div>
  )
}

export default AboutComponent
