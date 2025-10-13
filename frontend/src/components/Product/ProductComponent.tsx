import { type FC } from 'react';
import { useProduct } from './Productcomponent.hooks';
import { useTheme } from '../../hooks/useTheme';
import { useCurrency } from '../../hooks/useCurrency';
import { RelevantCollection } from '../../components/campaigns/Relevant/RelevantCollection.tsx';
import { ProductSkeleton } from './ProductSkeleton.tsx';
import { toast } from 'react-toastify';
import { useShop } from '../../hooks/useShop.ts';
import { CartModal } from '../cart/CartModal/CartModal.tsx';
import type { Size } from '../../context/shop/ShopTypes.ts';
import { assets } from '../../assets/frontend_assets/assets.ts';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton.tsx';

export const ProductComponent: FC = () => {
  const { 
    productData, 
    loading, 
    image, 
    setImage, 
    size, 
    setSize, 
    productCount,
    sizeQuantities,
    showCartModal,
    openCartModal,
    closeCartModal
  } = useProduct();
  
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const { increaseCartItem, decreaseCartItem } = useShop();

  

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (!productData?._id) return;
    
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    
    increaseCartItem(productData._id, size, 1);
    setSize(null);
  };

  // Function to handle quantity changes from the modal
  const handleSizeQuantityChange = (size: Size, newQuantity: number) => {
    if (!productData?._id) return;

    const currentQuantity = sizeQuantities.sizes[size] || 0;
    
    if (newQuantity > currentQuantity) {
      increaseCartItem(productData._id, size, newQuantity - currentQuantity);
    } else if (newQuantity < currentQuantity) {
      decreaseCartItem(productData._id, size, currentQuantity - newQuantity);
    }
  };

  if (loading) return <ProductSkeleton/>;
  if (!productData) return <p>Product not found</p>;

  return (
    <div className={`border-t-2 pt-10 ${theme === "dark" ? "border-t-[rgba(255,255,255,0.2)]" : "border-t-gray-300"}`}>
      {/* Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={closeCartModal}
        productName={productData.name}
        productPrice={productData.price}
        cartItem={sizeQuantities}
        onSizeQuantityChange={handleSizeQuantityChange}
      />

      {/* ----- Product Data -----*/} 
      <div className="flex gap-10 flex-col lg:flex-row"> 
        {/* ----- Product Images -----*/} 
        <div className="flex-1 flex flex-col lg:flex-row gap-3"> 
          {/* Thumbnail images - Modified to match main image width on small screens */} 
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start lg:w-1/5 gap-2 order-1 lg:order-0 w-full"> 
          {
            productData.image.map((item, index) => ( 
            <ImageWithSkeleton
              key={index}
              src={item}
              alt={`Product image ${index + 1}`}
              className='w-1/5 lg:w-full lg:h-auto flex-shrink-0'
              imageClassName='cursor-pointer'
              clickHandler={()=>{setImage(item)}}/>
              ))} 
          </div> 
          {/* Main image */} 
          <div className="w-full lg:min-w-4/5"> 
                  <ImageWithSkeleton
                    src={image || ''}
                    alt="Main product image"
                    className='w-full h-auto max-h-[500px]'
                    imageClassName='object-contain'/> 
          </div>  
        </div>
        {/* -----Product Info----- */}
          <div className="flex-1"> 
            <h1 className={`font-medium text-2xl mt-2 ${theme === 'dark' ? 'text-[#f1f1f1]' : ''}`}> {productData.name} 
            </h1> 
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className='w-3.5' /> 
              <img src={assets.star_icon} alt="" className='w-3.5' /> <img src={assets.star_icon} alt="" className='w-3.5' /> 
              <img src={assets.star_icon} alt="" className='w-3.5' /> <img src={assets.star_dull_icon} alt="" className='w-3.5' /> 
              <p className="pl-2">{122}</p> 
            </div> 
            <p className={`mt-5 text-3xl font-medium ${theme === 'dark' ? 'text-[#f1f1f1]' : ''}`}> {currency.symbol} {productData.price}
            </p>
            <p className={`mt-5 ${theme === 'dark' ? 'text-[#aaa]' : ''} md:max-w-4/5`}>   {productData.description} 
            </p> 
            <div className="flex flex-col gap-4 my-8"> 
              <div className="flex flex-col gap-4"> 
                <p className={`${theme === 'dark' ? 'text-[#f1f1f1]' : 'text-[rgb(0,0,0)]'}`}> Select Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => { 
                        if(productCount>=1){
                          openCartModal()
                          return
                        }setSize(item) }}
                      className={`border py-2 px-4 transition-all duration-200 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${item ===  size ? 'border-2 border-orange-500 ring-2 ring-orange-200 ring-opacity-50':'border-gray-300'} ${sizeQuantities.sizes[item] ? 'relative after:content-[""] after:absolute after:-top-1 after:-right-1 after:w-5 after:h-5 after:bg-orange-500 after:rounded-full after:text-white after:text-xs after:flex after:items-center after:justify-center' : ''}`
                      }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button for empty cart */}
            {productCount === 0 && (
              <button 
                className={`px-8 py-4 text-base font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  theme === 'dark' 
                    ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300' 
                    : 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'
                } shadow-lg hover:shadow-xl`}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            )}

            {/* Improved Quantity Controls for non-empty cart */}
            {productCount > 0 && (
              <div className='flex flex-col gap-4'>
                <div className={`flex gap-4 items-center  max-w-60`}>
                  {/* Remove Button */}
                  <button 
                    onClick={openCartModal}
                    className={
                      `w-10 h-10 rounded-[7px] flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300': 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'} shadow-lg`
                     }
                    title="Remove one item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  {/* Quantity Display - Clickable */}
                  <div 
                    className="flex flex-col items-center justify-start cursor-pointer group"
                    onClick={closeCartModal}
                  >
                    <span className="text-2xl font-bold group-hover:text-orange-500 transition-colors">
                      {productCount}
                    </span>
                    <span className="text-sm opacity-75 group-hover:opacity-100 transition-opacity">
                      item(s) in cart
                    </span>
                    <span className="text-xs text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                      Click to view/edit
                    </span>
                  </div>
                  
                  {/* Add Button */}
                  <button
                    onClick={openCartModal}
                    className={`w-10 h-10 rounded-[7px] flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300' 
                    : 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'
                } shadow-lg`}
                    title="Add one more item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={closeCartModal}
                  className={`py-3 px-6 rounded-lg font-medium transition-all duration-200 border-2 ${
                    theme === 'dark'
                      ? 'border-gray-600 hover:border-orange-500 bg-gray-800 hover:bg-gray-700'
                      : 'border-gray-300 hover:border-orange-400 bg-white hover:bg-gray-50'
                  } transform hover:scale-105 active:scale-95`}
                >
                  🛒 View Selected Sizes 
                </button>
              </div>
            )}

            <hr className={`${theme === "dark" ? "bg-[rgba(255,255,255,0.2)]" : "bg-gray-300"} border-0 h-[1px]`} />
            <div className="text-sm mt-5 flex flex-col gap-1">
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* -----Description & Review Section -----*/}
      <div className="mt-20">
        <div className="flex">
          <b className={`border px-5 py-3 text-sm ${theme === 'dark'?'border-[#3c4043] text-[#f1f1f1]':'border-[rgba(13,13,13,0.2)]'} border-r-0 border-b-0`}>Description</b>
          <p className={`border px-5 py-3 text-sm ${theme === 'dark'?'border-[#3c4043]':'border-[rgba(13,13,13,0.2)]'} border-b-0`}>Reviews {122}</p>
        </div>
        <div className={`flex flex-col gap-4 border px-6 py-6 text-sm ${theme === 'dark'?'border-[#3c4043]':'border-[rgba(13,13,13,0.2)]'}`}>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices and any available variations (e.g. sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      <RelevantCollection category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};