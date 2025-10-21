import { type FC } from 'react'
import ProductItem from './ProductItem'
import type { product } from '../../context/shop/ShopTypes'
import { useUiColors } from '../../constants/backgrounds';

interface ProductCollectionProps {
  collection: product[];
  overideClassname?: string;
}

const ProductCollection: FC<ProductCollectionProps> = ({ collection, overideClassname }) => {
  const {cardsAndSurfaceElements} =useUiColors()

  const baseClasses = `
    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
    gap-5 gap-y-7 p-8
    rounded-[2px]
    transition-all duration-300 ${cardsAndSurfaceElements}   
  `;

  return (
    <div className={overideClassname ?? baseClasses}>
      {collection.map((item, index) => (
        <ProductItem
          key={index}
          _id={item._id}
          image={item.image}
          name={item.name}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default ProductCollection;
