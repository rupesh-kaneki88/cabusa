'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { gsap } from 'gsap';
import { SquareChevronLeft, SquareChevronRight, X } from 'lucide-react';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const resetAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(handleNext, 5000);
  }, [handleNext]);

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoScroll]);

  useEffect(() => {
    if (carouselRef.current && carouselWrapperRef.current) {
      gsap.to(carouselRef.current, {
        x: -currentIndex * carouselWrapperRef.current.offsetWidth,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isModalOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    resetAutoScroll();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(index);
    }
  };

  const handleNextInModal = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  };

  const handlePrevInModal = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  };

  useEffect(() => {
    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextInModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevInModal();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleModalKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [isModalOpen, selectedImageIndex]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-4 md:mt-8">
      <h2 className="text-3xl font-bold text-center mb-8 uppercase" style={{ color: colors.mainBackground }}>Team Gallery</h2>
      <div ref={carouselWrapperRef} className="overflow-hidden aspect-video relative">
        <div ref={carouselRef} className="flex h-full">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-shrink-0 w-full h-full" 
              style={{ flex: '0 0 100%' }}
              role="button"
              tabIndex={0}
              onClick={() => openModal(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="cursor-pointer object-cover transition md:opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => { handlePrev(); resetAutoScroll(); }}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-black/50 bg-opacity-20 text-white p-2 rounded-none hover:bg-opacity-75 transition z-10"
        aria-label="Previous image"
      >
        <SquareChevronLeft size={24} />
      </button>
      <button
        onClick={() => { handleNext(); resetAutoScroll(); }}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-black/50 bg-opacity-20 text-white p-2 rounded-none hover:bg-opacity-75 transition z-10"
        aria-label="Next image"
      >
        <SquareChevronRight size={24} />
      </button>

      <div className="flex items-center justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => { goToSlide(index); resetAutoScroll(); }}
            className={`w-3 h-3 mx-1 rounded-full transition ${currentIndex === index ? 'bg-gray-400' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {isModalOpen && selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-90 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative w-full h-screen md:h-[90%] max-w-7xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
            <Image src={images[selectedImageIndex].src} alt={images[selectedImageIndex].alt} layout="fill" objectFit="contain" />
            <div className="absolute bottom-0 md:-bottom-8 right-0 md:-right-12 text-gray-300 text-sm md:text-lg px-2 py-1 rounded-md">
              {selectedImageIndex + 1} / {images.length}
            </div>
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-2 md:-top-8 right-0 md:-right-12 text-gray-300 p-2 rounded-none opacity-80 hover:opacity-100 transition"
              aria-label="Close image view"
            >
              <X size={32} className='transition hover:rotate-180'/>
            </button>
            <button
              onClick={handleNextInModal}
              className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 text-white p-2 rounded-none hover:bg-opacity-75 transition z-10"
              aria-label="Next image"
            >
              <SquareChevronRight size={34} />
            </button>
            <button
              onClick={handlePrevInModal}
              className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 text-white p-2 rounded-none hover:bg-opacity-75 transition z-10"
              aria-label="Previous image"
            >
              <SquareChevronLeft size={34} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
