import {type FC} from 'react'
import { type product } from '../../context/shop/ShopTypes'
import { Link } from 'react-router-dom'
import { useCurrency } from '../../hooks/useCurrency'
import { scrollToTop } from '../../utils/scrollToTop'
import { Image } from './ImageWithSkeleton'
export type ProductsItemProp = Pick<product,"_id" | "image" | "name" | "price">

const ProductItem:FC<ProductsItemProp> = ({_id,image,name,price})=> {

  const {currency}=useCurrency()
  return (
    <Link 
      to={`/product/${_id}`} 
      onClick={() => scrollToTop(false)}
      className={`cursor-pointer`}>
      <div className="overflow-hidden">
         <Image
            className=''
            src={image[0]}
            alt={`Product ${_id}`}
            imageClassName='hover:scale-110 transition ease-in-out'
          /> 
      </div>
      <p className="pt-3 pb-1 px-2 text-sm">
        {name}
      </p>
      <p className="text-sm font-medium px-2 pb-1 text-[var(--text)]">{currency.symbol} {price}</p> 
    </Link>
  )
}

export default ProductItem
