import {type FC} from 'react'
import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'

const Home:FC= () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default Home
