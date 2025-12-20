import {type FC} from 'react'
import useCartData from './CartComponent.hooks';
import Title from '../ui/Title';
import { useShop } from '../../hooks/useShop';
import { useCurrency } from '../../hooks/useCurrency';
import { Image } from '../ui/ImageWithSkeleton';
import { useTheme } from '../../hooks/useTheme';
import type { Size } from '../../context/shop/ShopTypes';
import DeleteCartItem from './deleteCartItem/DeleteCartItem';
import { useDeleteCartItemModal } from './deleteCartItem/deleteCartItem.hook';
import { Link, useNavigate } from 'react-router-dom';
import CartTotal from './cartTotal/CartTotal';
import Lottie from "lottie-react";
import {emptyCartAnimation} from '../../../public/images'

const CartComponent: FC = () => {
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const  navigate =useNavigate();
  const { cartDataEntries, cartitemsSubtotal } = useCartData();
  const { increaseCartItem, decreaseCartItem, shop } = useShop();
  const { isOpen, openModal, closeModal, confirmDelete } = useDeleteCartItemModal();

  return (
    <div className="pt-7 pb-12 px-4 max-w-7xl mx-auto">
      {isOpen && (
        <DeleteCartItem 
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
      
      <div className="mb-8">
        <Title text1='YOUR' text2='CART'/>
        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {cartDataEntries.length} {cartDataEntries.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartDataEntries.length === 0 ? (
        <div className={`text-center py-16 rounded-lg ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#fff]'}`}>
          
          <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Your cart is empty
          </h3>
          <Lottie animationData={emptyCartAnimation} loop={true} />
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            Add items to get started
          </p>
          <Link to="/" className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          {/* Cart Items */}
          <div className='flex-1 lg:order-1'>
            <div className={`rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-[hsl(180,6%,25%)]' : ' border-[hsl(180,6%,75%)]'} bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)]`}>
              {cartDataEntries.map((item, index) => {
                const productData = shop.find((product) => product._id === item._id)
                return (
                  <div
                    key={index}
                    className={`p-6 ${index !== 0 ? (theme === 'dark' ? 'border-t border-[rgba(30,30,30,1.0)]' : 'border-t border-gray-200') : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image & Info */}
                      <Link to={`/product/${productData?._id}`} className='group flex-shrink-0'>
                        <Image
                          src={productData?.image[0] || ''}
                          alt={`Product ${index + 1}`}
                          className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg'
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${productData?._id}`} className='group block'>
                          <h3 className={`text-lg font-medium mb-2 group-hover:text-orange-500 transition-colors ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {productData?.name}
                          </h3>
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {currency.symbol}{productData?.price}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-[var(--surfaceElementLight)]`}>
                            Size: {item.size}
                          </span>
                        </div>

                        {/* Actions Row */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className='flex items-center gap-3'>
                            {item.quantity === 1 ? (
                              <button
                                onClick={() => { openModal(item._id, item.size) }}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105 ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white shadow-sm`}
                                aria-label="Delete item"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} shadow-sm`}
                                onClick={() => decreaseCartItem(item._id, item.size as Size, 1)}
                                aria-label="Decrease quantity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                            )}
                            
                            <span className={`min-w-[2rem] text-center font-semibold text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => increaseCartItem(item._id, item.size as Size, 1)}
                              disabled={item.quantity === 10}
                              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-sm ${
                                item.quantity === 10 
                                  ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                                  : 'bg-orange-500 hover:bg-orange-600 text-white'
                              }`}
                              aria-label="Increase quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Subtotal & Delete */}
                          <div className="flex items-center gap-4">
                            <button
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 ${theme === 'dark' ? 'text-red-400 hover:bg-red-950/50' : 'text-red-600 hover:bg-red-200'}`}
                              onClick={() => openModal(item._id, item.size)}
                              aria-label="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              <span className="text-sm font-medium hidden sm:inline">Remove</span>
                            </button>
                            
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                              {currency.symbol} {item.subtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <div className='lg:order-2 lg:w-96 mt-8 lg:mt-0'>
            <div className={`rounded-lg sticky top-4 border ${theme === 'dark' ? 'border-[hsl(180,6%,25%)]' : ' border-[hsl(180,6%,75%)]'} bg-[var(--surfaceElementBg)] text-[var(--surfaceElementText)] overflow-hidden shadow-sm`}>
              <CartTotal subtotal={cartitemsSubtotal}/>
              <div className="p-6 pt-0">
                <button 
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  onClick={()=>{navigate("/place-order")}}>
                  Proceed to Checkout
                </button>
                <Link to="/" className={`block text-center mt-4 text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartComponent