import { type FC } from 'react';
import { useProduct } from './Productcomponent.hooks';
import { useTheme } from '../../hooks/useTheme';
import { assets } from '../../assets/frontend_assets/assets';
import { useCurrency } from '../../hooks/useCurrency';

export const ProductComponent: FC = () => {
  const { productData, loading,image,setImage,size,setSize } = useProduct();
  const{theme}=useTheme();
  const {currency}=useCurrency()



  if (loading) return <p>Loading...</p>;
  if (!productData) return <p>Product not found</p>;
  console.log(productData)

  return (
    <div className=
    {`border-t-2 pt-10 ${theme==="dark"?"border-t-[rgba(255,255,255,0.2)]":" border-t-gray-300"}`}>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={()=>{setImage(item)}}
                alt={`Product image ${index + 1}`}
              />
            ))}
          </div>
          <div className={'w-full sm:w-[80%]'}>
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className={`font-medium text-2xl mt-2 ${theme === 'dark'?'text-[#f1f1f1]':'' }`}>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <p className="pl-2">{122}</p>
          </div>
          <p className={`mt-5 text-3xl font-medium ${theme === 'dark'?'text-[#f1f1f1]':''}`}>{currency.symbol} {productData.price}</p>
          <p className={`mt-5 ${theme ==='dark'?'text-[#aaa]':'text-gray-500'} md:max-w-4/5 `}>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <div className="flex flex-col gap-4 my-8">
              <p className={`${theme === 'dark'?'text-[#f1f1f1]':'text-[rgb(0,0,0)]' }`}>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item,index)=>(
                  <button
                    key={index}
                    onClick={()=>{setSize(item)}} 
                    className={`border py-2 px-4 ${theme === 'dark'?'':'bg-gray-100'} ${item === size ?'border-orange-500':''}`}>
                      {item}
                  </button>
                ))}
              </div>
            </div>
            <button className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700`}>ADD TO CART</button>
            <hr className={`${theme==="dark"?"bg-[rgba(255,255,255,0.2)]":"bg-gray-300"} border-0 h-[1px]`}/>
            <div className="text-sm mt-5 flex flex-col gap-1">
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
