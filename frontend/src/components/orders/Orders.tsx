import  { type FC } from 'react'
import Title from '../ui/Title'
import { Image } from '../ui/ImageWithSkeleton';
import { useShop } from '../../hooks/useShop';
import { useCurrency } from '../../hooks/useCurrency';

export const OrdersComponent:FC = () => {
  const{shop} = useShop();
  const{currency}=useCurrency()
  return (
    <div className="border-t  pt-16 ">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className='[&>*]:border-t border-b border-b-[var(--border)]'>
        {
          shop.slice(1,4).map((item,index)=>(
            <div
              key={index} 
              className="py-4 border-x  border-[var(--border)] flex flex-col md:flex-row md:items-center md:justify-around gap-4 bg-[var(--surfaceElementBg)]">
                <div className='flex items-start gap-6 text-sm'>
                  <Image className='w-16 sm:w-20' src={item.image[0]} alt=""/>
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className="flex items-center gap-3 text-base">
                     <p>{currency.symbol} {item.price}</p>
                     <p>Quantity:1</p>
                     <p>Size:M </p>  
                    </div>
                    <p className='mt-2'>Date:<span className='text-[var(--surfaceElementText)]'>25, Jul, 2024</span>
                    </p>
                  </div>                
                </div>
                <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm">Ready to ship</p>
                    </div>
                    <button className="border px-4 py-2 text-sm font-medium rounded-sm border-[var(--border)]">Track Order</button>
                  </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
