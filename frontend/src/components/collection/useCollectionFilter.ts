import { useState } from "react"
import { useShop } from "../../hooks/useShop"
export function useCollectionFilter(){
  const {shop}=useShop()
  const [showFilter,setShowFilter]=useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleCheckboxChange = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };
  return{shop,showFilter,setShowFilter,selectedValues,handleCheckboxChange}
}