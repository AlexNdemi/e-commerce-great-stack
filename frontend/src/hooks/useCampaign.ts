
import { useState } from "react";
import { type Shop } from "../context/shop/ShopTypes";
export function useCampaign(callback:(()=>Shop)){

const [value,setValue] = useState<Shop>(
  ()=>{
    return callback();
  }
);
return {value,setValue}

}