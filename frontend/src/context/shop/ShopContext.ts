import { createContext } from "react";
import {type ShopContextType} from './ShopTypes'
export const ShopContext = createContext<ShopContextType | undefined>(undefined);