'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { getTopStories, type Story } from '@/data/stories'
import { useTheme } from './ThemeProvider'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const { colors } = useTheme()

  const stories = getTopStories(4)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % stories.length)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isPlaying, isHovered, stories.length])

  // GSAP animation for slide transitions
  useEffect(() => {
    if (slidesRef.current) {
      // Calculate the correct slide width (25% for 4 slides)
      const slideWidth = 100 / stories.length
      const translateX = -(currentSlide * slideWidth)
      
      gsap.to(slidesRef.current, {
        x: `${translateX}%`,
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }, [currentSlide, stories.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleStoryClick = (story: Story) => {
    // This will link to the stories page in the future
    // For now, we'll just log the story ID
    console.log(`Navigating to story: ${story.id}`)
    // TODO: Implement navigation to stories page
    // router.push(`/stories/${story.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section className={`w-full bg-gradient-to-b from-${colors.background} to-black py-16`}>
      <div className="container mx-auto px-4 lg:px-12 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-4xl font-bold mb-2">
              Top Stories
            </h2>
            <p className="text-gray-300 text-lg">
              Discover the latest in cricket news and insights
            </p>
          </div>
          
          {/* View All Button */}
          <button
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            onClick={() => {
              // TODO: Navigate to stories page
              console.log('Navigate to all stories page')
            }}
          >
            View All Stories
          </button>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides */}
          <div 
            ref={slidesRef}
            className="flex"
            style={{ 
              width: `${stories.length * 100}%`,
              transform: 'translateX(0%)'
            }}
          >
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="flex-shrink-0 px-4 h-[600px]"
                style={{ width: `${100 / stories.length}%` }}
              >
                <div 
                  className="bg-white rounded-xl overflow-hidden shadow-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105 h-full"
                  onClick={() => handleStoryClick(story)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleStoryClick(story)
                    }
                  }}
                >
                  {/* Story Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20">
                      {story.id}
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
                        {story.category}
                      </span>
                    </div>
                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {story.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {story.excerpt}
                    </p>
                    
                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-medium">{story.author}</span>
                      <span>{formatDate(story.publishDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} color='black'/>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} color='black'/>
          </button>

          {/* Play/Pause Button */}
          {/* <button
            onClick={togglePlayPause}
            className="absolute opacity-60 top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isPlaying ? <Pause size={20} color='black'/> : <Play size={20} color='black'/>}
          </button> */}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-30 hover:bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Accessibility Announcement */}
        <div className="sr-only" aria-live="polite">
          {`Slide ${currentSlide + 1} of ${stories.length}`}
        </div>
      </div>
    </section>
  )
}

export default Carousel
