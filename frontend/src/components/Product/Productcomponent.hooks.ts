// Update the useProduct hook
import { useShop } from '../../hooks/useShop';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { cartItem, product, Size } from '../../context/shop/ShopTypes';

export function useProduct() {
  const { id } = useParams();
  const { shop, cartItems } = useShop();

  const [productData, setProductData] = useState<product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string | undefined>('');
  const [size, setSize] = useState<Size | null>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  function openCartModal(){
    document.body.classList.add('no-scroll');
    setShowCartModal(true);
  }
  function closeCartModal(){
    document.body.classList.remove('no-scroll');
    setShowCartModal(false);
  }

  const sizeQuantities: cartItem = useMemo(() => {
  if (!id || !productData) {
    return { sizes: {} };
  }

  let sizes: { [key: string]: number } = {};

  productData.sizes.forEach((size) => {
    sizes = { ...sizes, [size]: cartItems[id]?.sizes?.[size] ?? 0 };
  });

  return { sizes };
}, [cartItems, id, productData]);



  const productCount = useMemo(() => {
    if (!id) {
      return 0;
    }
    if (!cartItems[id]) {
      return 0;
    }
    return Object.values(cartItems[id].sizes || {}).reduce((acc, qty) => acc + qty, 0);
  }, [cartItems, id]);

  useEffect(() => {
    if (!id) {
      setProductData(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSize(null);

    const timer = setTimeout(() => {
      const found = shop.find((p: product) => p._id === id);
      setProductData(found);
      setImage(found?.image[0]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [shop, id]);

  return { 
    productData, 
    loading, 
    setProductData, 
    image, 
    setImage, 
    size, 
    setSize, 
    productCount,
    sizeQuantities,
    showCartModal,
    openCartModal,
    closeCartModal
  };
}