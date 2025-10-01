import {type FC} from 'react'
import useCartData from './CartComponent.hooks';
import Title from '../ui/Title';
import { useShop } from '../../hooks/useShop';
import { useCurrency } from '../../hooks/useCurrency';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { useTheme } from '../../hooks/useTheme';

const  CartComponent:FC = ()=> {
  const { theme } = useTheme();
  const {currency}=useCurrency()
  
   

  const cartData=useCartData();
  const {shop}=useShop();
  
  return (
    <div className={`pt-14 `}>
      <div className="text-2xl mb-3">
        <Title text1='YOUR' text2='CART'/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = shop.find((product)=>product._id === item._id);
            return (
              <div
                key={index} 
                className={`py-4 border-t  ${theme === 'dark'?'border-[#2a2b36]':'border-[#DDD]'} grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4`}>
                  <div className="flex items-start gap-6">
                    <ImageWithSkeleton
                      src={productData?.image[0] || ''}
                      alt={`Product ${index+1}`}
                      className='w-16 sm:w-20'
                    />
                    <div>
                      <p className="text-xs sm:text lg font-medium">
                        {productData?.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency.symbol}{productData?.price}</p>
                        <p className={`border py-2 px-4 transition-all duration-200 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <button 
                      onClick={() => onSizeQuantityChange(size as Size, Math.max(0, quantity - 1))}
                      className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${theme === 'dark'? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'} text-white ${item.quantity === 0 ? 'disabled':''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </button>
                      <span>{item.quantity}</span>
                    <button
                      onClick={() => onSizeQuantityChange(size as Size, quantity + 1)}
                      className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}  bg-orange-500 hover:bg-orange-600 text-white ${item.quantity === 10 ? 'disabled':''}`}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                  </div>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default CartComponent