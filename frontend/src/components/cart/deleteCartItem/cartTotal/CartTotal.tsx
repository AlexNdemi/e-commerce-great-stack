import { type FC } from 'react'
import Title from '../../../ui/Title'
import { useShop } from '../../../../hooks/useShop'
import { useCurrency } from '../../../../hooks/useCurrency';
import { useTheme } from '../../../../hooks/useTheme';
import { Link } from 'react-router-dom';

interface CartTotalProps {
  subtotal: number
}

const CartTotal: FC<CartTotalProps> = ({ subtotal }) => {
  const { delivery_fee } = useShop();
  const { currency } = useCurrency();
  const { theme } = useTheme();
  const total = delivery_fee + subtotal;

  return (
    <div className={`w-full rounded-2xl p-6 ${
      theme === 'dark' ? 'bg-[#181818]' : 'bg-[#fff]'} shadow-lg`}>
      <div className="text-2xl mb-6">
        <Title text1={'ORDER'} text2={'SUMMARY'}/>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
          <span className="font-semibold">{currency.symbol} {subtotal.toFixed(2)}</span>
        </div>
        
        <div className={`h-px ${theme === 'dark' ? 'bg-[rgba(30,30,30,1.0)]' : 'bg-[#DDD]'}`} />
        
        <div className="flex justify-between items-center py-2">
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Shipping Fee</span>
          <span className="font-semibold">{currency.symbol} {delivery_fee.toFixed(2)}</span>
        </div>
        
        <div className={`h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        
        <div className="flex justify-between items-center py-2">
          <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Total</span>
          <span className={`text-lg font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
            {currency.symbol} {total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
          theme === 'dark'
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}>
          Proceed to Checkout
        </button>
        
        <Link
          to="/shop"
          className={`w-full py-3 rounded-lg font-semibold text-center block transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default CartTotal
