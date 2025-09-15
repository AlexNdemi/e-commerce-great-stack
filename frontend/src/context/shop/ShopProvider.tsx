import {  type FC, type ReactNode,useState} from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../../assets/frontend_assets/assets";
import type { ShopContextType } from "./ShopTypes";
import { currencies } from 'currencies.json';
export const ShopProvider:FC<{children:ReactNode}>=({children})=>{
  const delivery_fee=10;
  const [showSearchBar,setShowSearchBar]=useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return <ShopContext.Provider value={{shop:products,currencies,delivery_fee, searchTerm, setSearchTerm,showSearchBar,setShowSearchBar} as ShopContextType}>
    {children}
  </ShopContext.Provider>
}