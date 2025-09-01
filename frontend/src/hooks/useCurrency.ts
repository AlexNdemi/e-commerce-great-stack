import { type currency} from "../context/shop/ShopTypes";
import { useShop } from "./useShop";
import { useData } from "./useData";
export function useCurrency() {
  const { currencies } = useShop();
  const { value: currency } = useData<currency>(() => {

    return currencies.find((curr: currency) => curr.name === "Kenyan Shilling") || { name: 'US Dollar', namePlural: 'US dollars',code: 'USD',symbol: '$',symbolNative: '$',decimalDigits: 2,rounding: 0, 
    } as currency
  })
  return{currency}
}