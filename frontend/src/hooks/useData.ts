import { useState } from "react";

export function useData<T>(callback: () => T){
  const [value,setValue]=useState<T>(callback);
  return { value, setValue };

}