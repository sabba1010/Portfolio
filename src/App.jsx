import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InteractiveDemo from './components/InteractiveDemo'
import FeatureGrid from './components/FeatureGrid'
import QuickStartGuide from './components/QuickStartGuide'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="bg-grid" />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <InteractiveDemo />
        <FeatureGrid />
        <QuickStartGuide />
      </main>
      <Footer />
    </>
  )
}

export default App
