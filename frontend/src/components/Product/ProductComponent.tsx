import { type FC } from 'react';
import { useProduct } from './Productcomponent.hooks';
import { useTheme } from '../../hooks/useTheme';
import { assets } from '../../assets/frontend_assets/assets';
import { useCurrency } from '../../hooks/useCurrency';
import {RelevantCollection} from '../../components/campaigns/Relevant/RelevantCollection.tsx'
import { ProductSkeleton } from './ProductSkeleton.tsx';
import { toast } from 'react-toastify';
import { useShop } from '../../hooks/useShop.ts';


export const ProductComponent: FC = () => {
  const { productData, loading, image, setImage, size, setSize } = useProduct();
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const {addToCart} = useShop();

  if (loading) return <ProductSkeleton/>;
  if (!productData) return <p>Product not found</p>;

  return (
    <div className={`border-t-2 pt-10 ${theme === "dark" ? "border-t-[rgba(255,255,255,0.2)]" : "border-t-gray-300"}`}>
      {/* ----- Product Data -----*/}
      <div className="flex gap-12 flex-col lg:flex-row">
        {/* ----- Product Images -----*/}
        <div className="flex-1 flex flex-col lg:flex-row gap-3">
          {/* Thumbnail images - Modified to match main image width on small screens */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start lg:w-1/5 gap-2 order-1 lg:order-0 w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-1/5 lg:w-full lg:h-auto flex-shrink-0 cursor-pointer object-cover"
                onClick={() => { setImage(item) }}
                alt={`Product image ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Main image */}
          <div className="w-full lg:w-4/5">
            <img 
              src={image} 
              alt="Main product image" 
              className="w-full h-auto object-contain max-h-[500px]" 
            />
          </div>
        </div>

        {/* -----Product Info----- */}
        <div className="flex-1">
          <h1 className={`font-medium text-2xl mt-2 ${theme === 'dark' ? 'text-[#f1f1f1]' : ''}`}>
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="" className='w-3.5' />
            <p className="pl-2">{122}</p>
          </div>
          <p className={`mt-5 text-3xl font-medium ${theme === 'dark' ? 'text-[#f1f1f1]' : ''}`}>
            {currency.symbol} {productData.price}
          </p>
          <p className={`mt-5 ${theme === 'dark' ? 'text-[#aaa]' : 'text-gray-500'} md:max-w-4/5`}>
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <div className="flex flex-col gap-4">
              <p className={`${theme === 'dark' ? 'text-[#f1f1f1]' : 'text-[rgb(0,0,0)]'}`}>
                Select Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setSize(item) }}
                    className={`border py-2 px-4 ${theme === 'dark' ? '' : 'bg-gray-100'} ${item === size ? 'border-orange-500' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className={`${theme === 'dark'? 'bg-[rgb(255,255,255)] text-[#0f0f0f] active:bg-[#ffffffe5]':'bg-black text-white active:bg-gray-700'} px-8 py-3 text-sm`}
              onClick={
                ()=>{
                  if(!size){
                    toast.error("Select  Product Size")
                    return
                  }
                 addToCart(productData._id,size)
              }
              }>
              ADD TO CART
            </button>
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