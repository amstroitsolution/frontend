import React from 'react'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import OurValues from '../../components/OurValues/OurValues'
import SareeList from '../../components/SareeList/SareeList'
import HomeServicesCarousel from '../../components/HomeServicesCarousel/HomeServicesCarousel'
import SlowFashion from '../../components/SlowFashion/SlowFashion'
import WorkSection from '../../components/OurWork/WorkSection'
import WatchBuySection from '../../components/WatchBuySection/WatchBuySection'
import GownDressesSection from '../../components/GownDressesSection/GownDressesSection'
import TrendingSection from '../../components/TrendingSection/TrendingSection'
import NewArrivalsSection from '../../components/NewArrivalsSection/NewArrivalsSection'
import SpecialOffersSection from '../../components/SpecialOffersSection/SpecialOffersSection'
import FeaturedCollectionSection from '../../components/FeaturedCollectionSection/FeaturedCollectionSection'

import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Hero/>
      {/* <Services/> */}
      <TrendingSection/>
      <OurValues/>
      <SlowFashion/>
      <NewArrivalsSection/>
      <GownDressesSection/>
      <SpecialOffersSection/>
      <WatchBuySection/>
      <FeaturedCollectionSection/>
      <SareeList/>
      <HomeServicesCarousel/>
      {/* <WorkSection title="Our Recent Works" limit={6} /> */}
    </>
  )
}

export default Home