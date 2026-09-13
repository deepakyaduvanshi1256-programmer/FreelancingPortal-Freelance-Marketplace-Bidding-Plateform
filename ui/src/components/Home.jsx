import React from 'react'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import TrustedSection from './TrustedSection'
import TrendingSection from './TrendingSection'

import TestimonalSection from './TestimonalSection'
import Contact from './Contact'


import ArticleSection from './ArticleSection'
import TalentSection from './TalentSection'
import Pricing from './Pricing'

const Home = () => {
  return (
    <>
    <HeroSection />
    <CategorySection />
    <TrustedSection />
    <TrendingSection />
   
    <TestimonalSection />
    <Contact />
    <TalentSection />
    <Pricing />
   
  
    <ArticleSection />
    </>
  )
}

export default Home