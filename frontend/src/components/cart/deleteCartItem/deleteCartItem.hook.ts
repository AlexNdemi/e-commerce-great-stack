import { useState, useCallback, useEffect } from "react";
import {type  Size } from "../../../context/shop/ShopTypes";
import { useShop } from "../../../hooks/useShop";

interface ItemToDelete {
  itemId: string;
  size: Size;
}

export function useDeleteCartItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {removeSizeFromCart}=useShop();
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete>({
    itemId: "",
    size: "L",
  });

  // Open modal + disable scroll
  const openModal = useCallback((itemId: string, size: Size) => {
    document.body.classList.add("no-scroll");
    setItemToDelete({ itemId, size });
    setIsOpen(true);
    console.log("open Modal")
  }, []);

  //Reset state
  const resetItemToDelete = useCallback(
    (itemId: string = "", size: Size = "L") => {
      setItemToDelete({ itemId, size });
    },
    []
  );

  // Close modal + restore scroll
  const closeModal = useCallback(() => {
    document.body.classList.remove("no-scroll");
    setIsOpen(false);
    resetItemToDelete()
  }, [resetItemToDelete]);

  

  const confirmDelete = useCallback(() => {
    if (itemToDelete.itemId) {
      removeSizeFromCart(itemToDelete.itemId, itemToDelete.size);
      
      closeModal();
    }
  }, [itemToDelete, removeSizeFromCart, closeModal]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount or when modal closes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, closeModal]);

  return {
    isOpen,
    itemToDelete,
    openModal,
    closeModal,
    confirmDelete
  };
}
