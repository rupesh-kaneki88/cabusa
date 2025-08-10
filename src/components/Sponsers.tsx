'use client'

import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { sponsors } from '@/data/sponsors'
import { useTheme } from './ThemeProvider';
const Sponsers = () => {
  const { colors } = useTheme();
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create infinite scroll animation with GSAP
    const createAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.to(container, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        paused: isPaused
      })
    }

    createAnimation()

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [isPaused])

  const handleMouseEnter = () => {
    setIsPaused(true)
    if (animationRef.current) {
      animationRef.current.pause()
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    if (animationRef.current) {
      animationRef.current.resume()
    }
  }

  const handleSponsorClick = (sponsor: typeof sponsors[0]) => {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section 
      className="w-full py-12"
      aria-label="Our Sponsors"
      style={{ backgroundColor:colors.mainBackground }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{ color: colors.textAccent }}>
          Our Sponsors
        </h2>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          role="region"
          aria-label="Scrolling sponsors list"
          tabIndex={0}
        >
          {/* Sponsors container */}
          <div 
            ref={containerRef}
            className="flex items-center gap-8 whitespace-nowrap"
            style={{ width: 'max-content' }}
          >
            {/* First set of sponsors */}
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 cursor-pointer transition-transform duration-300 hover:scale-105 focus-within:scale-105"
                tabIndex={0}
                role="button"
                aria-label={`${sponsor.name} sponsor logo`}
                onClick={() => handleSponsorClick(sponsor)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSponsorClick(sponsor)
                  }
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {/* Placeholder for sponsor logo - replace with actual logos */}
                  <div className="text-black font-semibold text-sm text-center">
                    {sponsor.name}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless infinite scroll */}
            {sponsors.map((sponsor) => (
              <div
                key={`duplicate-${sponsor.id}`}
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg flex items-center justify-center p-4 cursor-pointer transition-transform duration-300 hover:scale-105 focus-within:scale-105"
                tabIndex={0}
                role="button"
                aria-label={`${sponsor.name} sponsor logo`}
                onClick={() => handleSponsorClick(sponsor)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSponsorClick(sponsor)
                  }
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {/* Placeholder for sponsor logo - replace with actual logos */}
                  <div className="text-black font-semibold text-sm text-center">
                    {sponsor.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[#292F36] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#292F36] to-transparent pointer-events-none" />
        </div>
        
        {/* Accessibility announcement */}
        <div className="sr-only" aria-live="polite">
          {isPaused ? 'Sponsor scrolling paused' : 'Sponsor scrolling active'}
        </div>
      </div>
    </section>
  )
}

export default Sponsers