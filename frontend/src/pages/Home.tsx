import {type FC} from 'react'
import Navbar from '../components/ui/Navbar.tsx'
import Hero from '../components/ui/Hero.tsx'
import { LatestCollection } from '../components/ui/LatestCollection.tsx'

const Home:FC= () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <LatestCollection/>
    </div>
  )
}

export default Home
