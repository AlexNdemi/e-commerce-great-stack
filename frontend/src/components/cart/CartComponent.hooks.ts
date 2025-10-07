import { useMemo,useState } from "react";
import { useShop } from "../../hooks/useShop";
import type { Size } from "../../context/shop/ShopTypes";

export type CartDataEntry = {
  _id: string;
  size: Size;
  quantity: number;
};

function useCartData() {
  const { cartItems } = useShop();
  const [isDeleteModalOpen,setIsDeleteModalOpen]=useState<boolean>(false);
  function openDeleteItemModal(){
    document.body.classList.add('no-scroll');
    setIsDeleteModalOpen(true);
    
  }
  function closeDeleteItemModal(){
    document.body.classList.remove('no-scroll');
    setIsDeleteModalOpen(false)
  }
  const cartData = useMemo(() => {
    return Object.entries(cartItems).reduce<CartDataEntry[]>((acc, [productId, cartItem]) => {
      Object.entries(cartItem.sizes).forEach(([size, quantity]) => {
        if (quantity && quantity > 0) {
          acc.push({
            _id: productId,
            size: size as Size,
            quantity,
          });
        }
      });
      return acc;
    }, []);
  }, [cartItems]);

  return {cartData,isDeleteModalOpen,openDeleteItemModal,closeDeleteItemModal};
}


export default useCartData;
