import {type FC} from 'react'
import { useBestCollection } from './BestCollection.hook'
import CollectionHeader from '../../ui/CollectionHeader'
import ProductCollection from '../../ui/ProductCollection'

const BestCollection:FC = () => {
  const{bestSellerCollection:bestSellerProducts,description}=useBestCollection()
  
  return (
    <>
      <CollectionHeader description={description} text1={'BEST'} text2={'SELLERS'}/>
      <ProductCollection collection={bestSellerProducts}/>
      
    </>
  )
}

export default BestCollection
