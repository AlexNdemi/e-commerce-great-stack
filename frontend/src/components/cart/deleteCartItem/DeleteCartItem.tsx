import {type FC} from 'react'
import { useTheme } from '../../../hooks/useTheme';
import ReactDom from 'react-dom'
interface deleteCartItemProps{
  onClose:()=>void;
  onConfirm:()=>void
}
const DeleteCartItem:FC<deleteCartItemProps> = ({onClose,onConfirm}) => {
  const {theme}=useTheme();
 const portalRoot = document.getElementById('root-portal')
  if (!portalRoot) return null 
  
  return ReactDom.createPortal(
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center" aria-live='polite'>
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)]" 
            onClick={onClose} />
              <div 
                className={`
                  relative z-10 w-full max-w-md rounded-lg shadow-xl transform transition-all ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-[#fff] text-black'}`
                }
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-5 px-8">
                  <div className='flex justify-between cursor-pointer'>
                      <h2 className='font-bold text-2xl'>Remove from cart</h2>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="size-6"
                        onClick={onClose}>
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6 18 18 6M6 6l12 12" />
                      </svg>



                  </div> 
                  <p>Do you really want to remove this item from cart?</p>
                  <button 
                    className='py-3 px-5 bg-[#f68b1e] hover:bg-[#e07e1b] w-full my-5 rounded-sm text-white flex active:shadow-[inset_0px_0px_0px_2px_#af6315]'
                    onClick={onConfirm}
                  >
                      <svg 
                          xmlns="http://www.w3.org/2000/svg" fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="1.5" 
                          stroke="currentColor" 
                          className="size-6"
                      >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>  
                      <p className='mx-auto'>Remove Item</p>
                  </button>
                </div>
              </div> 
    </div>,portalRoot
  )
}

export default DeleteCartItem
