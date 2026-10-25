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
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return 'home'

    // Check pathname first
    const path = window.location.pathname.toLowerCase()
    if (path.startsWith('/about')) return 'about'
    if (path.startsWith('/services')) return 'services'
    if (path.startsWith('/contact')) return 'contact'

    // Backwards compatibility for old hash links
    const hash = window.location.hash
    if (hash.startsWith('#/about') || hash === '#about') {
      window.history.replaceState(null, '', '/about')
      return 'about'
    }
    if (hash.startsWith('#/services') || hash === '#services') {
      const qIdx = hash.indexOf('?')
      const search = qIdx !== -1 ? hash.substring(qIdx) : ''
      window.history.replaceState(null, '', `/services${search}`)
      return 'services'
    }
    if (hash.startsWith('#/contact') || hash === '#contact') {
      window.history.replaceState(null, '', '/contact')
      return 'contact'
    }
    if (hash.startsWith('#/')) {
      window.history.replaceState(null, '', '/')
      return 'home'
    }

    return 'home'
  }

  const [route, setRoute] = useState(getInitialRoute)

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
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase()
      if (path.startsWith('/about')) {
        setRoute('about')
        scrollToTop()
      } else if (path.startsWith('/services')) {
        setRoute('services')
        scrollToTop()
      } else if (path.startsWith('/contact')) {
        setRoute('contact')
        scrollToTop()
      } else {
        setRoute('home')
        scrollToTop()
      }
    }

    window.addEventListener('popstate', handleLocationChange)

    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/about') || hash === '#about') {
        navigate('about')
      } else if (hash.startsWith('#/services') || hash === '#services') {
        navigate('services')
      } else if (hash.startsWith('#/contact') || hash === '#contact') {
        navigate('contact')
      }
    }
    window.addEventListener('hashchange', handleHash)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const navigate = (newRoute, param) => {
    setRoute(newRoute)
    let targetPath = '/'
    if (newRoute === 'about') {
      targetPath = '/about'
    } else if (newRoute === 'services') {
      targetPath = param ? `/services?category=${param}` : '/services'
    } else if (newRoute === 'contact') {
      targetPath = '/contact'
    } else {
      targetPath = '/'
    }

    window.history.pushState(null, '', targetPath)
    scrollToTop()
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

