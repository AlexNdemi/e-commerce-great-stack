import {type FC}from 'react'

import { useRelevantCollection } from './RelevantCollection';
import CollectionHeader from '../../ui/CollectionHeader';
import ProductCollection from '../../ui/ProductCollection';
import MediaScrollerComponent from '../../ui/MediaScrollerComponent';
import { Carousel } from '../../ui/Carousel';
interface RelevantCollectionProps{
  category:string
  subCategory:string
}

export const RelevantCollection:FC<RelevantCollectionProps> = ({category,subCategory}) => {
  const {relevantCollection:latestProducts,description}= useRelevantCollection({category,subCategory});

  
  return (
   <>
    <CollectionHeader 
      description={description}
      text1={'RELATED'}
      text2={'PRODUCTS'}
    />
    {/* <ProductCollection 
      collection={latestProducts}/> */}
    <MediaScrollerComponent collection={latestProducts}/>
    <Carousel 
      title={'RELATED PRODUCTS' }
      items={latestProducts}/> 
   </>
   
  )
}