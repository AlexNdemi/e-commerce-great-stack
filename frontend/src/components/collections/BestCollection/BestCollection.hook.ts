import { type Shop } from "../../../context/shop/ShopTypes";
import { useData } from "../../../hooks/useData";
import { useShop } from "../../../hooks/useShop";
import { useState } from "react";
export function useBestCollection(){
 const {shop} = useShop();
 const {value:bestSellerCollection} = useData<Shop>(
  ()=>{
    return shop.filter(product=>product.bestseller)
  }
);
const [description,setDescription] =useState<string>("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non eos quae nobis officiis vero officia");

return {description,bestSellerCollection,setDescription}

}