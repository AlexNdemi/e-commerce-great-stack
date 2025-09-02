import {type FC} from 'react'
import ProductItem from './ProductItem'
import type { product} from '../../context/shop/ShopTypes'
interface ProductCollectionProps{
  collection:product[];
}

const ProductCollection:FC<ProductCollectionProps> = ({collection}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {collection.map((item,index)=>(
        <ProductItem 
          key={index} 
          _id={item._id}
          image={item.image} 
          name={item.name} 
          price={item.price}/>
        ))
      }
    </div>
  )
}

export default ProductCollection
