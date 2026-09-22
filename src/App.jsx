import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedProjects from './components/FeaturedProjects'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import AboutPage from './components/AboutPage'

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      return hash === '#/about' || hash === '#about' ? 'about' : 'home'
    }
    return 'home'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#/about' || hash === '#about') {
        setRoute('about')
        window.scrollTo(0, 0)
      } else {
        setRoute('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (newRoute) => {
    setRoute(newRoute)
    if (newRoute === 'about') {
      window.history.pushState(null, '', '#/about')
      window.scrollTo(0, 0)
    } else {
      window.history.pushState(null, '', '#/')
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="app-root">
      <CustomCursor />
      <ScrollProgress />
      <Navbar currentRoute={route} onNavigate={navigate} />
      <main>
        {route === 'about' ? (
          <AboutPage onNavigateHome={() => navigate('home')} />
        ) : (
          <>
            <Hero />
            <Services />
            <FeaturedProjects />
            <Process />
            <Testimonials />
            <CtaBanner />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}
