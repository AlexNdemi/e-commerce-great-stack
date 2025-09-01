
export interface product{
  _id:string,
  name:string,
  description:string,
  price:number,
  image:string[],
  category:string,
  subCategory:string,
  sizes:string[]
  date:number,
  bestseller:boolean

}
export interface currency {
      name: string,
      namePlural: string,
      code: string,
      symbol: string,
      symbolNative: string,
      decimalDigits: number,
      rounding: number,
  
}

export type Shop = product[];
type Currencies = currency[];
type Delivery_fee = number;

export interface ShopContextType{
  shop:Shop,
  currencies:Currencies,
  delivery_fee:Delivery_fee,


  
}