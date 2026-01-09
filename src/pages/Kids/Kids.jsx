import React from 'react'
import KidsHero from '../../components/Kids/KidsHero'
import GenderCategories from '../../components/Kids/GenderCategories'
import TrendingKids from '../../components/Kids/TrendingKids'
import KidsNewArrivals from '../../components/Kids/KidsNewArrivals'
import KidsSpecialOffers from '../../components/Kids/KidsSpecialOffers'
import KidsFeaturedCollections from '../../components/Kids/KidsFeaturedCollections'
import KidsProduct from '../../components/Kids/KidsProduct'

const Kids = () => {
  return (
    <>
      <KidsHero/>
      <GenderCategories/>
      <TrendingKids/>
      <KidsNewArrivals/>
      <KidsSpecialOffers/>
      <KidsFeaturedCollections/>
      <KidsProduct/>
    </>
  )
}

export default Kids
