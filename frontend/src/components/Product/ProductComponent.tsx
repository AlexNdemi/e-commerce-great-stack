import { type FC } from 'react';
import { useProduct } from './Productcomponent.hooks';
import { useTheme } from '../../hooks/useTheme';

export const ProductComponent: FC = () => {
  const { productData, loading,image,setImage } = useProduct();
  const{theme}=useTheme();


  if (loading) return <p>Loading...</p>;
  if (!productData) return <p>Product not found</p>;

  return (
    <div className=
    {`border-t-2 pt-10 ${theme==="dark"?"border-t-gray-800  ":" border-t-gray-300"}`}>
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
      </div>
    </div>
  );
};
