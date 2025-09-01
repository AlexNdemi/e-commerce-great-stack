import { useContext } from "react";
import type { ShopContextType } from "../context/shop/ShopTypes";
import { ShopContext } from "../context/shop/ShopContext";

export function useShop():ShopContextType{
  const shop =useContext(ShopContext);
  if(!shop){
    throw new Error("useShop must be used within a ShopProvider")
  }
  return shop;
}