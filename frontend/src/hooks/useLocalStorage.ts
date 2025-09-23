import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue:T | (()=>T)):[T,(value:T)=> void]{
  const [value,setValue] = useState<T>(()=>{

    const storedValue = localStorage.getItem(key);

    if(storedValue !== null){
      return JSON.parse(storedValue);
    }

   if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    }

    return initialValue;
  });
  useEffect(()=>{
      localStorage.setItem(key,JSON.stringify(value));
  },[value,key]);

  const setStoredValue = (val: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof val === "function" ? (val as (prev: T) => T)(prev) : val));
  };

  return [value,setStoredValue];
}