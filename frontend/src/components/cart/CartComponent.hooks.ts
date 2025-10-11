import { useMemo } from "react";
import { useShop } from "../../hooks/useShop";
import type { Size } from "../../context/shop/ShopTypes";

export type CartDataEntry = {
  _id: string;
  size: Size;
  quantity: number;
  subtotal: number; 
};

export type CartData = {
  cartitemsSubtotal: number; 
  cartTotalQuantity: number; 
  cartDataEntries: CartDataEntry[];
};

function useCartData(): CartData {
  const { cartItems, shop } = useShop();

  const cartData = useMemo(() => {
    return Object.entries(cartItems).reduce<CartData>(
      (acc, [productId, cartItem]) => {
        const productPrice =
          shop.find((product) => product._id === productId)?.price ?? 0;

        Object.entries(cartItem.sizes).forEach(([size, quantity]) => {
          if (quantity && quantity > 0) {
            const subtotal = quantity * productPrice;

            acc.cartDataEntries.push({
              _id: productId,
              size: size as Size,
              quantity,
              subtotal,
            });

            acc.cartitemsSubtotal += subtotal;
            acc.cartTotalQuantity += quantity;
          }
        });

        return acc;
      },
      {
        cartitemsSubtotal: 0,
        cartTotalQuantity: 0,
        cartDataEntries: [],
      }
    );
  }, [cartItems, shop]);

  return cartData;
}

export default useCartData;
