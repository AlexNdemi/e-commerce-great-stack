import { type Shop } from "../../../context/shop/ShopTypes";
import { useData } from "../../../hooks/useData";
import { useShop } from "../../../hooks/useShop";
import { useState } from "react";
export function useRelevantCollection({category,subCategory}:{category:string,subCategory:string}){
 const {shop} = useShop();
 const {value:relevantCollection} = useData<Shop>(
  ()=>{
    return shop.filter((item)=>category === item.category).filter((item)=>subCategory==item.subCategory).slice(0.5);
  }
 )
 const [description,setDescription] =useState<string>("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non eos quae nobis officiis vero officia");


 
return {description,relevantCollection,setDescription}

}