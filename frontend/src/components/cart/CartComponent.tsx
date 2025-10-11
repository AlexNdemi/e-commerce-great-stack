import {type FC} from 'react'
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


const  CartComponent:FC = ()=> {
  const { theme } = useTheme();
  const {currency}=useCurrency()
  const {cartDataEntries,cartitemsSubtotal}=useCartData();
  const {increaseCartItem,decreaseCartItem,shop}=useShop();
  const{isOpen,openModal,closeModal,confirmDelete}=useDeleteCartItemModal();
  
 
  return (
    <div className={`pt-7`}>
      {
        isOpen && (
        <DeleteCartItem 
          onClose={closeModal}
          onConfirm={confirmDelete}
        
        />
      )}
      
      <div className="text-2xl mb-3">
        <Title text1='YOUR' text2='CART'/>
      </div>
      <div className='flex flex-col fx:flex-row  fx:justify-between fx:items-start gap-10 relative'>
        <div className='flex flex-col fx:grow order-2'>
          {
            cartDataEntries.map((item,index)=>{
              const productData=shop.find((product)=>product._id === item._id)
              return (
                <div
                  key={index}
                  className={`py-4 border-t  ${theme === 'dark'?'border-[rgba(30,30,30,1.0)]':'border-[#DDD]'}`}>
                    <div className="flex flex-col gap-6 ">
          
                      <div className="flex flex-col sm:flex-row gap-2 justify-between">
                        <Link
                          to={`/product/${productData?._id}`}
                          className='group'
                        >
                          <div className='flex items-start gap-6'>
                          <ImageWithSkeleton
                            src={productData?.image[0] || ''}
                            alt={`Product ${index+1}`}
                            className='w-16 sm:w-20'
                          />
                          <div>
                              <p className="group-active:active:text-[#f68b1e] text-xl sm:text lg font-medium hover:cursor-pointer">
                              {productData?.name}
                            </p>
                            <div className="flex  items-start sm:items-center gap-5 mt-2">
                              <p>{currency.symbol}{productData?.price}</p>
                              <p className={`border p-0.5 transition-all duration-200 rounded-[2px] min-w-10 flex items-center justify-center ${theme === 'dark' ? 'bg-[hsl(0,0%,17%)] border-[rgba(30,30,30,1.0)]' : 'bg-slate-50 border-[#DDD]'}`}>{item.size}</p>
                            </div>
                          </div>
                          </div>
                        </Link>
                        <p className='text-2xl text-right whitespace-nowrap'>{currency.symbol} {item.subtotal}</p>
                      </div>
                      <div
                        className='flex justify-between min-h-24'
                       >
                          <div
                          className='flex gap-2 cursor-pointer text-orange-600 rounded-[5px] hover:bg-[#fcdbb9] py-2 px-1 h-fit'
                          onClick={()=>openModal(item._id,item.size)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path
                                  strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          <span>remove</span>
                        </div>
                          <div className='flex gap-2'>
                              {
                                item.quantity === 1 ? (
                                <button
                                  onClick={()=>{openModal(item._id,item.size)}}
                                  className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${theme === 'dark'? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'} text-white`}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="size-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                      </svg>
                                </button>):(
                                <button
                                  className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${theme === 'dark'? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'} text-white`}
                                  onClick={() => decreaseCartItem(item._id,item.size as Size,1)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                              </button>)
                              }
                            <span>{item.quantity}</span>
                          <button
                            onClick={() => increaseCartItem(item._id,item.size as Size,1)}
                            className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}  bg-orange-500 hover:bg-orange-600 text-white ${item.quantity === 10 ? 'disabled':''}`}
                          >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                          </button>
                          </div>
                      </div>
          
                    </div>
          
                </div>
              )
            })
          }
        </div>
        <div className={`fx:order-3 sm:w-fit rounded-[5px] p-3
                  fx:sticky fx:top-0 self-start ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[rgb(245,245,245)]'} p-3`}>
          <div className="w-full sm:w-[300px]">
            <CartTotal subtotal={cartitemsSubtotal}/>
            <div className="w-full text-end">
              div
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CartComponent