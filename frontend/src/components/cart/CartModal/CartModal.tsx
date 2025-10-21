// components/CartModal.tsx
import { type FC } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useCurrency } from '../../../hooks/useCurrency';
import type { cartItem, Size } from '../../../context/shop/ShopTypes';
import { useNavigate } from 'react-router-dom';
import ReactDOm from 'react-dom'

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  cartItem: cartItem;
  onSizeQuantityChange: (size: Size, newQuantity: number) => void;
}

export const CartModal: FC<CartModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  cartItem,
  onSizeQuantityChange,
}) => {
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const navigate = useNavigate()
  const portalRoot = document.getElementById('root-portal')
  if (!portalRoot) return null

  if (!isOpen) return null;

  const totalItems = Object.values(cartItem.sizes).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = totalItems * productPrice;

  return ReactDOm.createPortal(
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center" aria-live='polite'>
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)]" onClick={onClose} />
          {/* Modal box */}
            <div 
              className={`
                relative z-10 w-full max-w-md rounded-lg shadow-xl transform transition-all ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-[#fff] text-black'}`
              }
              onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                  <div 
                  className={
                  `flex justify-between items-center p-6 border-b ${
                  theme === 'dark' ? 'border-[rgba(30,30,30,1.0)]':'border-[#DDD]'}`}>
                  <div>
                    <h3 className="text-xl font-bold">Please select a variation</h3>
                    <p className="text-sm opacity-75 mt-1">{productName}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-full transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  </div>
                {/* Modal Content */}
                  <div className="p-6 max-h-96 overflow-y-auto">
                  {Object.entries(cartItem).length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium">Your cart is empty</p>
                      <p className="text-sm opacity-75 mt-1">Add items to see them here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 text-sm font-medium opacity-75 pb-2 border-b">
                        <span>Size</span>
                        <span className="text-center">Quantity</span>
                        <span className="text-right">Total</span>
                      </div>
                      
                      {Object.entries(cartItem.sizes).map(([size, quantity]) => (
                        <div key={size} className="flex items-center justify-between p-3 rounded-lg border bg-opacity-50">
                          <span className="font-semibold w-7">{size}</span>
                          
                          <div className="flex items-center gap-3 w-28">
                            <button
                              onClick={() => onSizeQuantityChange(size as Size, Math.max(0, quantity - 1))}
                              className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${
                                theme === 'dark' 
                                  ? 'bg-gray-700 hover:bg-gray-600' 
                                  : 'bg-black hover:bg-gray-800'
                              } text-white ${quantity === 0 ? 'disabled':''}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                            
                            <button
                              onClick={() => onSizeQuantityChange(size as Size, quantity + 1)}
                              className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-colors ${
                                theme === 'dark' 
                                  ? 'bg-gray-700 hover:bg-gray-600' 
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }  bg-orange-500 hover:bg-orange-600 text-white ${quantity === 10 ? 'disabled':''}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <span className="font-semibold text-right w-28">
                            {currency.symbol}{(quantity * productPrice).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      
                      {/* Total Summary */}
                      <div className={`mt-4 pt-4 border-t ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div className="flex justify-between items-center font-semibold">
                          <span>Total ({totalItems} items):</span>
                          <span className="text-lg">{currency.symbol}{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                {/* Modal Footer */}
                  <div className={`p-6 border-t `}>
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                          theme === 'dark' 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        Continue Shopping
                      </button>
                      {totalItems > 0 && (
                        <button
                          onClick={()=>navigate("/cart")}
                          className={`flex-1 py-3 rounded-lg font-medium text-white transition-colors ${
                            theme === 'dark' 
                              ? 'bg-orange-500 hover:bg-orange-600' 
                              : 'bg-black hover:bg-gray-800'
                          }`}
                        >
                          Checkout
                        </button>
                      )}
                    </div>
                  </div>
            </div>
      </div>
      
    </>,portalRoot
    );
};