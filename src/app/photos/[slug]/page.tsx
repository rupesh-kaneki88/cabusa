'use client';

import { photos } from '@/data/photos';
import { useTheme } from '@/components/ThemeProvider';
import Image from 'next/image';
import { useState, useEffect, useCallback, use, useRef } from 'react';
import { SquareChevronLeft, SquareChevronRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const PhotoSlugPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const { colors } = useTheme();
  const photo = photos.find((p) => p.slug === slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const openModalButtonRef = useRef<HTMLDivElement | null>(null);

  const handleNextInModal = useCallback(() => {
    if (selectedImageIndex !== null && photo) {
      const newIndex = selectedImageIndex === photo.images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, photo]);

  const handlePrevInModal = useCallback(() => {
    if (selectedImageIndex !== null && photo) {
      const newIndex = selectedImageIndex === 0 ? photo.images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, photo]);

  useGSAP(() => {
    const gridItems = gridRef.current?.children 
      ? Array.from(gridRef.current.children) 
      : [];
  
    if (gridItems.length) {
      gsap.fromTo(
        gridItems,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: gridRef });

  useGSAP(() => {
    const buttonEl = buttonRef.current;
    if (!buttonEl) return;
  
    const hoverIn = () => {
      gsap.to(buttonEl, {
        y: -3, 
        scale: 1.2,
        backgroundColor: colors.mainBackground,
        color: colors.secondaryBackground,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
  
    const hoverOut = () => {
      gsap.to(buttonEl, {
        y: 0,
        scale: 1,
        backgroundColor: 'transparent', // or original color
        color: colors.mainBackground,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    };
  
    buttonEl.addEventListener('mouseenter', hoverIn);
    buttonEl.addEventListener('mouseleave', hoverOut);
  

    return () => {
      buttonEl.removeEventListener('mouseenter', hoverIn);
      buttonEl.removeEventListener('mouseleave', hoverOut);
    };
  }, { dependencies: [colors.mainBackground] });
  
  
  const openModal = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    openModalButtonRef.current = e.currentTarget;
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    openModalButtonRef.current?.focus();
  };

  useEffect(() => {
    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
      if (e.key === 'ArrowRight') {
        handleNextInModal();
      }
      if (e.key === 'ArrowLeft') {
        handlePrevInModal();
      }
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll('button');
        if (focusableElements) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleModalKeyDown);
      modalRef.current?.focus();
    } else {
      window.removeEventListener('keydown', handleModalKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [isModalOpen, handleNextInModal, handlePrevInModal]);
  
  
    if (!photo) {
      return <div>Photo not found</div>;
    }
  
    return (
    <div>
      <div style={{ backgroundColor: colors.mainBackground }} className="relative h-[400px] md:h-[600px] mt-4 md:mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 transition-opacity duration-400"/>
        <Image src={photo.image} alt={photo.description} width={500} height={300} className="w-full h-full object-cover" />
        <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
          <Link href={'/photos'}>
            <button ref={buttonRef} className='border border-gray-400 py-2 px-6 mb-2 cursor-pointer'>Photos</button>
          </Link>
          <h1 className="text-3xl md:text-6xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>{photo.title}</h1>

        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {photo.images.map((image, index) => (
            <div key={index} className="relative shadow-md overflow-hidden cursor-pointer group" onClick={(e) => openModal(index, e)} tabIndex={0}>
              <Image src={image.url} alt={image.description} width={500} height={300} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic underline">VIEW</button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
                <h2 className="text-lg font-bold text-white">{image.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedImageIndex !== null && (
        <div ref={modalRef} className="fixed inset-0 bg-black/80 bg-opacity-90 flex items-center justify-center z-50" onClick={closeModal} role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="relative w-full h-screen md:h-[90%] max-w-7xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
            <Image src={photo.images[selectedImageIndex].url} alt={photo.images[selectedImageIndex].description} layout="fill" objectFit="contain" />
            <div className="absolute bottom-0 md:-bottom-8 right-0 md:-right-12 text-gray-300 text-sm md:text-lg px-2 py-1 rounded-md">
              {selectedImageIndex + 1} / {photo.images.length}
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 md:-top-8 right-0 md:-right-12 text-gray-300 p-2 rounded-none opacity-80 hover:opacity-100 transition"
              aria-label="Close image view"
            >
              <X size={32} className='transition hover:rotate-180'/>
            </button>
          </div>
          <button
            onClick={handleNextInModal}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white p-2 rounded-none hover:bg-opacity-75 transition z-50"
            aria-label="Next image"
          >
            <SquareChevronRight size={34} />
          </button>
          <button
            onClick={handlePrevInModal}
            className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white p-2 rounded-none hover:bg-opacity-75 transition z-50"
            aria-label="Previous image"
          >
            <SquareChevronLeft size={34} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoSlugPage;