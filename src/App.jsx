import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedProjects from './components/FeaturedProjects'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <div className="app-root">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedProjects />
        <Process />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
