import { type FC } from 'react'
import useCartData from './CartComponent.hooks';
import Title from '../ui/Title';
import { useShop } from '../../hooks/useShop';
import { useCurrency } from '../../hooks/useCurrency';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { useTheme } from '../../hooks/useTheme';
import type { Size } from '../../context/shop/ShopTypes';
import DeleteCartItem from './deleteCartItem/DeleteCartItem';
import { useDeleteCartItemModal } from './deleteCartItem/deleteCartItem.hook';
import { Link } from 'react-router-dom';
import CartTotal from './deleteCartItem/cartTotal/CartTotal';
import Lottie from "lottie-react";
import {emptyCartAnimation} from '../../../public/images'

const CartComponent: FC = () => {
  const { theme } = useTheme();
  const { currency } = useCurrency()
  const { cartDataEntries, cartitemsSubtotal } = useCartData();
  const { increaseCartItem, decreaseCartItem, shop } = useShop();
  const { isOpen, openModal, closeModal, confirmDelete } = useDeleteCartItemModal();

  const isEmpty = cartDataEntries.length === 0;

  return (
    <div className={`pt-7 min-h-screen `}>
      {isOpen && (
        <DeleteCartItem 
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-3xl mb-8">
          <Title text1='YOUR' text2='CART' />
          {isEmpty && (
            <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your cart is empty
            </p>
          )}
        </div>

        {!isEmpty && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:flex-1">
              <div className={`rounded-[0.375rem] ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#ffffff]'} shadow-lg overflow-hidden`}>
                {cartDataEntries.map((item, index) => {
                  const productData = shop.find((product) => product._id === item._id)
                  return (
                    <div
                      key={`${item._id}-${item.size}-${index}`}
                      className={`p-6 ${
                        index !== cartDataEntries.length - 1 
                          ? theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'
                          : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image and Info */}
                        <Link
                          to={`/product/${productData?._id}`}
                          className="flex-1 flex gap-4 group"
                        >
                          <div className="flex-shrink-0">
                            <ImageWithSkeleton
                              src={productData?.image[0] || ''}
                              alt={productData?.name || 'Product image'}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold group-hover:text-orange-500 transition-colors line-clamp-2">
                              {productData?.name}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              <p className={`font-medium ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                                {currency.symbol}{productData?.price}
                              </p>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                                theme === 'dark' 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                Size: {item.size}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end justify-between">
                          <p className="text-2xl font-bold mb-4">
                            {currency.symbol} {item.subtotal}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => item.quantity === 1 
                                  ? openModal(item._id, item.size)
                                  : decreaseCartItem(item._id, item.size as Size, 1)
                                }
                                className={`w-10 h-10 rounded-xs flex items-center justify-center transition-all ${
                                  theme === 'dark'
                                    ? 'bg-gray-700 hover:bg-gray-600 active:scale-95'
                                    : 'bg-gray-200 hover:bg-gray-300 active:scale-95'
                                } ${item.quantity === 1 ? 'text-red-500 hover:text-red-600' : ''}`}
                              >
                                {item.quantity === 1 ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                )}
                              </button>
                              
                              <span className={`w-12 text-center font-semibold text-lg ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => increaseCartItem(item._id, item.size as Size, 1)}
                                disabled={item.quantity === 10}
                                className={`w-10 h-10 rounded-xs flex items-center justify-center transition-all ${
                                  item.quantity === 10
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                                } text-white`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => openModal(item._id, item.size)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'text-red-400 hover:bg-red-400 hover:text-white'
                                  : 'text-red-500 hover:bg-red-500 hover:text-white'
                              }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              <span className="text-sm font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <CartTotal subtotal={cartitemsSubtotal} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {isEmpty && (
          // <div className="text-center py-16">
          //   <div className="max-w-md mx-auto">
          //     <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
          //       theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
          //     }`}>
          //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16 text-gray-400">
          //         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          //       </svg>
          //     </div>
          //     <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          //       Your cart is empty
          //     </h3>
          //     <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          //       Start shopping to add items to your cart
          //     </p>
          //     <Link
          //       to="/shop"
          //       className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-colors ${
          //         theme === 'dark'
          //           ? 'bg-orange-500 hover:bg-orange-600 text-white'
          //           : 'bg-orange-500 hover:bg-orange-600 text-white'
          //       }`}
          //     >
          //       Start Shopping
          //     </Link>
          //   </div>
          // </div>
          <Lottie animationData={emptyCartAnimation} loop={true} />
        )}
      </div>
    </div>
  )
}

export default CartComponent