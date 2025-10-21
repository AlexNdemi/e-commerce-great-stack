import { type FC} from 'react'
import Title from '../../ui/Title'
import { useShop } from '../../../hooks/useShop'
import { useCurrency } from '../../../hooks/useCurrency'
import { useTheme } from '../../../hooks/useTheme'

interface CartTotalProps {
  subtotal: number
}

const CartTotal: FC<CartTotalProps> = ({ subtotal }) => {
  const { delivery_fee } = useShop()
  const { currency } = useCurrency()
  const { theme } = useTheme()
  
  

  const total = delivery_fee + subtotal
  const freeShippingThreshold = 50
  const remaining = freeShippingThreshold - subtotal
  const qualifiesForFreeShipping = remaining <= 0


  const textMuted = theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  const textPrimary = theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
  const divider = theme === 'dark' ? 'border-gray-800' : 'border-gray-200'

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code || 'USD',
    }).format(amount)

  return(
    <div className='w-full'>
      {/* Header */}
      <div className='p-6 pb-4'>
        <Title text1='CART' text2='TOTALS' />
      </div>

      {/* Totals Card */}
      <div className='px-6 pb-6'>
        <div className={`rounded-lg p-4 space-y-3 bg-[var(--surfaceElementLight)]`}>
          {/* Subtotal */}
          <div className='flex justify-between items-center'>
            <span className={`text-sm ${textMuted}`}>Subtotal</span>
            <span className={`font-medium ${textPrimary}`}>
              {formatMoney(subtotal)}
            </span>
          </div>

          <hr className={divider} />

          {/* Shipping Fee */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className={`text-sm ${textMuted}`}>Shipping Fee</span>
              <div className='group relative' aria-label='Shipping info'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                  />
                </svg>
                <div
                  role='tooltip'
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-900 text-white'
                  }`}
                >
                  Standard shipping
                </div>
              </div>
            </div>
            <span className={`font-medium ${textPrimary}`}>
              {formatMoney(delivery_fee)}
            </span>
          </div>

          <hr className={divider} />

          {/* Total */}
          <div className='flex justify-between items-center pt-2'>
            <span className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              Total
            </span>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
              {formatMoney(total)}
            </span>
          </div>
        </div>

        {/* Free Shipping Info */}
        <div
          className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
            theme === 'dark'
              ? 'bg-orange-950/20 border border-orange-900/30'
              : 'bg-orange-50 border border-orange-200'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
            }`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
              Free shipping on orders over {formatMoney(freeShippingThreshold)}
            </p>
            {!qualifiesForFreeShipping && (
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-orange-400/70' : 'text-orange-600'}`}>
                Add {formatMoney(remaining)} more to qualify
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;
