import { useShop } from '../../hooks/useShop';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { product } from '../../context/shop/ShopTypes';

export function useProduct() {
  const { id } = useParams();
  const { shop } = useShop();

  const [productData, setProductData] = useState<product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [image,setImage]=useState<string|undefined>('');
  const [size,setSize]=useState<string>('')

  useEffect(() => {
    if (!id) {
      setProductData(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);

    // simulate async fetch (even though we're just reading from shop)
    const found = shop.find((p: product) => p._id === id);
    console.log(shop)

    setProductData(found);
    setImage(found?.image[0])
    setLoading(false);
  }, [shop, id]);

  return { productData, loading, setProductData,image,setImage,size,setSize };
}
