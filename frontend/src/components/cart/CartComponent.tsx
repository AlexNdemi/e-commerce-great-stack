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
  
  const baseColor = theme === "dark" ? "#202020" : "#ebebeb"; 
  const highlightColor = theme === "dark" ? "#444" : "#f5f5f5"; 

  const cartData=useCartData();
  const {shop}=useShop();
  
  return (
    <div className={`border-t pt-14`}>
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
                className={`py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4`}>
                  <div className="flex items-start gap-6">
                    <ImageWithSkeleton
                      src={productData?.image[0]}
                      alt={`Product ${index+1}`}
                      className='w-16 sm:w-20'
                      imageClassName=''
                      skeletonBaseColor={baseColor}
                      skeletonHighlightColor={highlightColor}
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text lg font-medium">{productData?.name}</p>
                    <div className="flex items-center gap mt-2">
                      <p>{currency.symbol}{productData?.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
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