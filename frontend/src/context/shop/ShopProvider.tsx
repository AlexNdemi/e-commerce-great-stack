import { type FC, type ReactNode, useState } from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../../assets/frontend_assets/assets";
import type { cartItems, ShopContextType, Size } from "./ShopTypes";
import { currencies } from "currencies.json";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

import { produce } from "immer";

export const ShopProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const delivery_fee = 10;
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [cartItems, setCartItems] = useLocalStorage<cartItems>("cartItems", {});
  const [cartCount, setCartCount] = useLocalStorage<number>("cartCount", 0);

  const addToCart = (itemId: string, size: Size, quantity: number = 1): void => {
    const newCartItems = produce(cartItems, (draft) => {
      if (!draft[itemId]) {
        draft[itemId] = { sizes: {} };
      }
      if (!draft[itemId].sizes[size]) {
        draft[itemId].sizes[size] = quantity;
      } else {
        draft[itemId].sizes[size]! += quantity;
      }
    });

    
    setCartItems(newCartItems);

    
    const newCartCount = cartCount + quantity;
    setCartCount(newCartCount);
    toast.success('product added successfuly')
  };

  const removeSizeFromCart = (itemId: string, size: Size): void => {
    let removedQty = 0;

    const newCartItems = produce(cartItems, (draft) => {
      const currentItem = draft[itemId];
      if (!currentItem) return;

      const currentQty = currentItem.sizes[size] ?? 0;
      if (currentQty > 0) {
        removedQty = currentQty;
        delete currentItem.sizes[size];
      }

    // Clean up if no sizes left
      if (Object.keys(currentItem.sizes).length === 0) {
      delete draft[itemId];
       }
    });

    if (removedQty > 0) {
      setCartItems(newCartItems);
      const newCartCount = cartCount - removedQty;
      setCartCount(newCartCount);
      toast("Size removed successfully");
    }
  };


  const removeFromCart = (itemId: string, size: Size, quantity: number): void => {
    const newCartItems = produce(cartItems, (draft) => {
      const currentItem = draft[itemId];
      if (!currentItem) return;
      const currentQty = currentItem.sizes[size] ?? 0;
      if (currentQty === 0) return;

      const newQty = currentQty - quantity;

      if (newQty > 0) {
        currentItem.sizes[size] = newQty;
      } else {
        delete currentItem.sizes[size];
      }
      if (Object.keys(currentItem.sizes).length === 0) {
        delete draft[itemId];
      }
    });

    setCartItems(newCartItems);

    const newCartCount = cartCount - quantity;
    setCartCount(newCartCount);
    toast.success('product removed successfuly')
  };

  return (
    <ShopContext.Provider
      value={
        {
          shop: products,
          currencies,
          delivery_fee,
          searchTerm,
          setSearchTerm,
          showSearchBar,
          setShowSearchBar,
          cartItems,
          addToCart,
          removeFromCart,
          removeSizeFromCart,
          cartCount,
        } as ShopContextType
      }
    >
      {children}
    </ShopContext.Provider>
  );
};