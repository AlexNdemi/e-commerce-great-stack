import { type Shop } from "../../../context/shop/ShopTypes";
import { useData } from "../../../hooks/useData";
import { useShop } from "../../../hooks/useShop";
import { useState } from "react";
export function useLatestCollection(){
 const {shop} = useShop();
 const {value:latestCollection} = useData<Shop>(
  ()=>{
    return shop.slice(0,10)
  }
 )
 const [description,setDescription] =useState<string>("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non eos quae nobis officiis vero officia");


 
return {description,latestCollection,setDescription}

}