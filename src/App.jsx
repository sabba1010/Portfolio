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
import ServicesPage from './components/ServicesPage'
import ContactPage from './components/ContactPage'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash.startsWith('#/about') || hash === '#about') return 'about'
      if (hash.startsWith('#/services') || hash === '#services') return 'services'
      if (hash.startsWith('#/contact') || hash === '#contact') return 'contact'
      return 'home'
    }
    return 'home'
  })

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/about') || hash === '#about') {
        setRoute('about')
        scrollToTop()
      } else if (hash.startsWith('#/services') || hash === '#services') {
        setRoute('services')
        scrollToTop()
      } else if (hash.startsWith('#/contact') || hash === '#contact') {
        setRoute('contact')
        scrollToTop()
      } else {
        setRoute('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (newRoute, param) => {
    setRoute(newRoute)
    if (newRoute === 'about') {
      window.history.pushState(null, '', '#/about')
      scrollToTop()
    } else if (newRoute === 'services') {
      const targetHash = param ? `#/services?category=${param}` : '#/services'
      window.history.pushState(null, '', targetHash)
      scrollToTop()
    } else if (newRoute === 'contact') {
      window.history.pushState(null, '', '#/contact')
      scrollToTop()
    } else {
      window.history.pushState(null, '', '#/')
      scrollToTop()
    }
  }

  return (
    <SmoothScroll>
      <div className="app-root">
      <CustomCursor />
      <ScrollProgress />
      <Navbar currentRoute={route} onNavigate={navigate} />
      <main>
        {route === 'about' ? (
          <AboutPage onNavigateHome={() => navigate('home')} onNavigate={navigate} />
        ) : route === 'services' ? (
          <ServicesPage onNavigateHome={() => navigate('home')} onNavigate={navigate} />
        ) : route === 'contact' ? (
          <ContactPage onNavigateHome={() => navigate('home')} onNavigate={navigate} />
        ) : (
          <>
            <Hero />
            <Services onNavigate={navigate} />
            <FeaturedProjects />
            <Process onNavigate={navigate} />
            <Testimonials />
            <CtaBanner onNavigate={navigate} />
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
      </div>
    </SmoothScroll>
  )
}

