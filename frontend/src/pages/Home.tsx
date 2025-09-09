import {type FC} from 'react'
import Hero from '../components/ui/Hero.tsx'
import { LatestCollection } from '../components/campaigns/LatestCollection/LatestCollection.tsx'
import BestCollection from '../components/campaigns/BestCollectionCampaign/BestCollection.tsx'
import OurPolicy from '../components/OurPolicy.tsx'
import NewsletterBox from '../components/NewsletterBox.tsx'

const Home:FC= () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestCollection/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
