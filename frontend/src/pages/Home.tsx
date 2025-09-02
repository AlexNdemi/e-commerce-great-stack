import {type FC} from 'react'
import Navbar from '../components/ui/Navbar.tsx'
import Hero from '../components/ui/Hero.tsx'
import { LatestCollection } from '../components/collections/LatestCollection/LatestCollection.tsx'
import BestCollection from '../components/collections/BestCollection/BestCollection.tsx'

const Home:FC= () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <LatestCollection/>
      <BestCollection/>
    </div>
  )
}

export default Home
