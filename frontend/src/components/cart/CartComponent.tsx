import {type FC} from 'react'
import useCartData from './CartComponent.hooks';
import Title from '../ui/Title';
import { useShop } from '../../hooks/useShop';
import { useCurrency } from '../../hooks/useCurrency';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';
import { useTheme } from '../../hooks/useTheme';
import type { Size } from '../../context/shop/ShopTypes';
import DeleteCartItem from './deleteCartItem/DeleteCartItem';
import { useState } from 'react';
interface itemToDelete{
  itemId:string;
  size:Size
}


const  CartComponent:FC = ()=> {
  const { theme } = useTheme();
  const {currency}=useCurrency()
  const {cartData,isDeleteModalOpen,openDeleteItemModal,closeDeleteItemModal}=useCartData();
  const {addToCart,removeFromCart,shop}=useShop();
  const [itemToDelete,setItemToDelete]=useState<itemToDelete>({itemId:'',size:'L'})

  function resetItemToDelete(itemId:string='',size:Size='L'){
    setItemToDelete({itemId:itemId,size:size})
  }
  
  
  return (
    <div className={`pt-7`}>
      <DeleteCartItem 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteItemModal}
        itemId={itemToDelete.itemId}
        size={itemToDelete.size}
        resetItemToDelete={resetItemToDelete}
        
        />
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
                className={`py-4 border-t  ${theme === 'dark'?'border-[rgba(30,30,30,1.0)]':'border-[#DDD]'}`}>
                  <div className="grid gap-6">
                    <div className='flex items-start gap-6'>
                      <ImageWithSkeleton
                        src={productData?.image[0] || ''}
                        alt={`Product ${index+1}`}
                        className='w-16 sm:w-20'
                      />
                      <div>
                        <p className="text-xl sm:text lg font-medium">
                          {productData?.name}
                        </p>
                        <div className="flex  items-start sm:items-center gap-5 mt-2">
                          <p>{currency.symbol}{productData?.price}</p>
                          <p className={`border p-0.5 transition-all duration-200 rounded-[2px] min-w-10 flex items-center justify-center ${theme === 'dark' ? 'bg-[hsl(0,0%,17%)] border-[rgba(30,30,30,1.0)]' : 'bg-slate-50 border-[#DDD]'}`}>{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div 
                      className='flex justify-between items-baseline'>
                      <div 
                        className='flex gap-2 cursor-pointer text-orange-600 rounded-[5px] hover:bg-[#fcdbb9] py-2 px-1 '
                        onClick={()=>{
                        setItemToDelete({itemId:item._id,size:item.size})  
                        openDeleteItemModal();
                      }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                       <span>remove</span>
                      </div>
                      <div className='flex gap-2'>
                      
                          {
                            item.quantity === 1 ? (
                            <button
                              onClick={()=>{
                                setItemToDelete({itemId:item._id,size:item.size})  
                                openDeleteItemModal();}
                              } 
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
                              onClick={() => removeFromCart(item._id,item.size as Size,1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                          </button>)
                          }
                        <span>{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item._id,item.size as Size,1)}
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
      
    </div>
  )
}

export default CartComponent