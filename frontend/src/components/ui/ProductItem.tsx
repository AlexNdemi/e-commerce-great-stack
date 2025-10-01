import {type FC} from 'react'
import { type product } from '../../context/shop/ShopTypes'
import { Link } from 'react-router-dom'
import { useCurrency } from '../../hooks/useCurrency'
import {useTheme} from '../../hooks/useTheme'
import { scrollToTop } from '../../utils/scrollToTop'
import { ImageWithSkeleton } from './ImageWithSkeleton'
export type ProductsItemProp = Pick<product,"_id" | "image" | "name" | "price">

const ProductItem:FC<ProductsItemProp> = ({_id,image,name,price})=> {
  const {theme} = useTheme();

  const {currency}=useCurrency()
  return (
    <Link 
      to={`/product/${_id}`} 
      onClick={() => scrollToTop(false)}
      className={`${theme === "dark"?"text-textDark-900": "text-textLight-900"} cursor-pointer`}>
      <div className="overflow-hidden">
         <ImageWithSkeleton
            src={image[0]}
            alt={`Product ${_id}`}
            imageClassName='hover:scale-110 transition ease-in-out'
          /> 
      </div>
      <p className="pt-3 pb-1 text-sm">
        {name}
      </p>
      <p className="text-sm font-medium">{currency.symbol} {price}</p> 
    </Link>
  )
}

export default ProductItem
