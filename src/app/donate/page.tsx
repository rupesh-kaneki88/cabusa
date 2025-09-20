

'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DonationForm from '@/components/DonationForm';

gsap.registerPlugin(ScrollTrigger);

const DonatePage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState('paypal');
  const whyDonateRef = useRef<HTMLDivElement>(null);
  const donationOptionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }

    const sections = contentRef.current?.querySelectorAll('.donation-section');
    if (sections) {
      sections.forEach(section => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', 
            scrollTrigger: {
              trigger: section as any,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    if (whyDonateRef.current) {
      const cards = whyDonateRef.current.querySelectorAll('.why-donate-card');
      gsap.fromTo(cards[0], { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: cards[0] as any, start: 'top 80%' } });
      gsap.fromTo(cards[1], { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: cards[1] as any, start: 'top 80%' } });
      gsap.fromTo(cards[2], { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: cards[2] as any, start: 'top 80%' } });
      gsap.fromTo(cards[3], { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: cards[3] as any, start: 'top 80%' } });
    }
  }, []);

  useEffect(() => {
    if (donationOptionsRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(donationOptionsRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'bounce.out' })
        .fromTo(donationOptionsRef.current.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }, "-=.25");
    }
  }, [selectedOption]);

  const renderDonationOption = () => {
    switch (selectedOption) {
      case 'paypal':
        return (
          <div className="text-center">
            <p className="text-lg md:text-xl mb-8 text-gray-400">
              Click the button below to donate via PayPal.
            </p>
            <a 
              href="#" // Replace with your PayPal donation link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white font-bold py-3 px-6 border tranparent transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{ color: colors.secondaryBackground }}
            >
              Donate with PayPal
            </a>
          </div>
        );
      case 'bank':
        return (
          <div>
            <div className="mb-8 text-gray-400">
              <h3 className="text-2xl font-bold mb-4 uppercase">Bank Account Details</h3>
              <p><strong>Account Name:</strong> Your Account Name</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Bank Name:</strong> Your Bank Name</p>
              <p><strong>SWIFT/BIC Code:</strong> YOURCODE</p>
              <p><strong>IBAN:</strong> YOURIBAN</p>
            </div>
            <hr className="my-8" />
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase opacity-70" style={{color:colors.secondaryBackground}}>Please fill out this form before transferring</h3>
              <DonationForm />
            </div>
          </div>
        );
      case 'zelle':
        return (
          <div className="text-center">
            <p className="text-lg md:text-xl mb-8 text-gray-400">
              Scan the QR code below or use the email/phone number to donate via Zelle.
            </p>
            {/* Replace with your Zelle QR code image */}
            <img src="/path/to/zelle-qr-code.png" alt="Zelle QR Code" className="mx-auto mb-4" /> 
            <p className="text-lg md:text-xl text-gray-400">
              <strong>Email/Phone:</strong> your-email@example.com
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Donate</h1>
      </div>
      <div ref={contentRef} className="container py-8 mb-8 px-4 md:px-24 space-y-2 md:space-y-4">
        <div className="donation-section mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 uppercase" style={{ color: colors.thirdBackground }}>Our Impact</h2>
          <p className="text-lg md:text-xl text-gray-500">Every contribution has the power to transform lives. Whether by covering travel expenses for a young athlete, providing essential equipment, or supporting a training session, your generosity helps create meaningful opportunities for individuals with visual impairments to thrive.</p>
        </div>

        <div className="donation-section mb-12 p-8 border rounded-lg shadow-lg" style={{ background: `linear-gradient(to right,rgb(0, 0, 0),rgb(99, 99, 99))` }}>
          <h2 className="text-3xl font-bold text-center mb-8 uppercase" style={{ color: colors.thirdBackground }}>Ways to Give</h2>
          <div className="flex justify-center mb-8">
            <button 
              className={`px-4 py-2 font-bold ${selectedOption === 'paypal' ? 'border-b-2' : ''}`}
              style={{ borderColor: selectedOption === 'paypal' ? colors.thirdBackground : 'transparent', color:colors.secondaryBackground }}
              onClick={() => setSelectedOption('paypal')}
            >
              PayPal
            </button>
            <button 
              className={`px-4 py-2 font-bold ${selectedOption === 'bank' ? 'border-b-2' : ''}`}
              style={{ borderColor: selectedOption === 'bank' ? colors.thirdBackground : 'transparent', color:colors.secondaryBackground }}
              onClick={() => setSelectedOption('bank')}
            >
              Bank Transfer
            </button>
            <button 
              className={`px-4 py-2 font-bold ${selectedOption === 'zelle' ? 'border-b-2' : ''}`}
              style={{ borderColor: selectedOption === 'zelle' ? colors.thirdBackground : 'transparent', color:colors.secondaryBackground }}
              onClick={() => setSelectedOption('zelle')}
            >
              Zelle
            </button>
          </div>
          <div ref={donationOptionsRef}>
            {renderDonationOption()}
          </div>
        </div>

        <div ref={whyDonateRef} className="donation-section mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 uppercase" style={{ color: colors.thirdBackground }}>Why Donate?</h2>
          <p className="text-lg md:text-xl text-center text-gray-500">Your donation can help us in:</p>
        </div>

        <div className="donation-section grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 shadow-lg rounded-lg why-donate-card">
            <h3 className="text-2xl font-bold mb-2">Building Excellence</h3>
            <p className="text-gray-500">By organizing training camps with professional coaches to develop blind cricket teams.</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg why-donate-card">
            <h3 className="text-2xl font-bold mb-2">Spreading Awareness</h3>
            <p className="text-gray-500">By hosting awareness programs to promote the sport across schools, universities, and communities.</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg why-donate-card">
            <h3 className="text-2xl font-bold mb-2">Equipping for Success</h3>
            <p className="text-gray-500">By providing specialized gear for blind cricket, including sound-emitting balls, adapted kits, and safe playing conditions.</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg why-donate-card">
            <h3 className="text-2xl font-bold mb-2">Championing Recognition</h3>
            <p className="text-gray-500">By advocating for global recognition and working toward making blind cricket part of the Paralympics.</p>
          </div>
        </div>

        <div className="donation-section text-center">
          <h2 className="text-3xl font-bold mb-4 uppercase" style={{ color: colors.thirdBackground }}>Join the Movement</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-500">Donate to support blind cricket in the USA and be part of this game-changing journey. Donate now and make a difference!</p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;

