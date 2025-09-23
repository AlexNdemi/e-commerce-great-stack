export type Size = 'S'|'M'|'L'| 'Xl';
export type cartItem = Readonly<{
  sizes:Readonly<{
    [size in Size]?:number;

  }>;
}>;

export type cartItems = Readonly<{
  [productId:string]:cartItem
}>;
export type cartCount =number
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
  searchTerm:string,
  setSearchTerm: (term: string) => void,
  showSearchBar:boolean,
  setShowSearchBar:(state:boolean)=>void,
  cartItems:cartItems,
  addToCart:(itemId: string, size: Size, quantity: number)=>void,
  removeFromCart:(itemId: string, size: Size, quantity: number)=> void,
  cartCount:cartCount
}