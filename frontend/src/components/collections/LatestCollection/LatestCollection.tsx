import {type FC}from 'react'

import { useLatestCollection } from './LatestCollection.hooks';
import CollectionHeader from '../../ui/CollectionHeader';
import ProductCollection from '../../ui/ProductCollection';


export const LatestCollection:FC = () => {
  const {latestCollection:latestProducts,description}= useLatestCollection();

  
  return (
   <>
    <CollectionHeader 
      description={description}
      text1={'LATEST'}
      text2={'COLLECTIONS'}
    />
    <ProductCollection 
      collection={latestProducts}/>
   </>
      
      

      
  )
}
