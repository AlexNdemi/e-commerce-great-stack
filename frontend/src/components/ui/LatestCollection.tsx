import {type FC}from 'react'
import Title from './Title'
import { useShop } from '../../hooks/useShop';
import { useCampaign } from '../../hooks/useCampaign';

export const LatestCollection:FC = () => {

  const {shop}=useShop();
  const {value:latestProducts}= useCampaign(()=>shop.slice(0,10))
  
  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Title text1='LATEST' text2='COLLECTIONS'/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia omnis molestias quos repudiandae quod earum eos?</p>
      </div>

    </div>
  )
}
