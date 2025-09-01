import {  type FC, type ReactNode} from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../../assets/frontend_assets/assets";
import type { ShopContextType } from "./ShopTypes";
import { currencies } from 'currencies.json';
export const ShopProvider:FC<{children:ReactNode}>=({children})=>{
  const delivery_fee=10;
  return <ShopContext.Provider value={{shop:products,currencies,delivery_fee} as ShopContextType}>
    {children}
  </ShopContext.Provider>
}