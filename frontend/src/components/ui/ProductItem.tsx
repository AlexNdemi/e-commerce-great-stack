import {type FC} from 'react'
import { type product } from '../../context/shop/ShopTypes'
import { Link } from 'react-router-dom'
import { useCurrency } from '../../hooks/useCurrency'
import {useTheme} from '../../hooks/useTheme'
export type ProductsItemProp = Pick<product,"_id" | "image" | "name" | "price">

const ProductItem:FC<ProductsItemProp> = ({_id,image,name,price})=> {
  const {theme} = useTheme();

  const {currency}=useCurrency()
  return (
    <Link 
      to={`/product/${_id}`} 
      className={`${theme === "dark"?"text-textDark-900": "text-textLight-900"} cursor-pointer`}>
      <div className="overflow-hidden">
        <img 
          className="hover:scale-110 transition ease-in-out" 
          src={image[0]} alt="" />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency.symbol} {price}</p>  
    </Link>
  )
}

export default ProductItem
