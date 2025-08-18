'use client'
import { useTheme } from '@/components/ThemeProvider';
import ContactForm from '@/components/ContactForm';
import Map from '@/components/Map';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactUsPage = () => {
  const { colors } = useTheme();
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (titleRef.current) {
      tl.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1 });
    }

    tl.fromTo(contactInfoRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(mapRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Contact Us</h1>
      </div>
      <div className="container mx-auto  px-4 md:px-14 py-8">
        <div ref={contactInfoRef} className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 uppercase" style={{ color: colors.thirdBackground }}>Blind Cricket USA</h2>
          <p className="text-lg text-gray-600">123 Main Street, Anytown, USA 12345</p>
          <p className="text-lg text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-lg text-gray-600">
            Email: <a href="mailto:contact@blindcricketusa.com" className="text-blue-500 hover:underline">contact@blindcricketusa.com</a>
          </p>
        </div>
        <hr className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={formRef}>
            <h3 className="text-2xl font-bold mb-4 uppercase">Send us a message</h3>
            <ContactForm />
          </div>
          <div ref={mapRef}>
            <h3 className="text-2xl font-bold mb-4 uppercase">Our Location</h3>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
