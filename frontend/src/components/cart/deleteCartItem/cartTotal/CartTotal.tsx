import {type FC} from 'react'
import Title from '../../../ui/Title'
import { useShop } from '../../../../hooks/useShop'
import { useCurrency } from '../../../../hooks/useCurrency';
const CartTotal:FC = () => {
  const{delivery_fee}=useShop();
  const{currency}=useCurrency();
  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency.symbol}</p>
        </div>
        <hr/>
        <div className="flex justify-between">
         <p>shipping Fee</p>
         <p>{currency.symbol} {delivery_fee} </p> 
        </div>
        <hr/>
        <div className="flex justify-between">
            <b>Total</b>
            <b>{currency.symbol} {delivery_fee}</b>
        </div>

      </div>
      
    </div>
  )
}

export default CartTotal
