'use client'
import { players } from '@/data/players';
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const ProfilesPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const profilesRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (profilesRef.current) {
      const profiles = profilesRef.current.querySelectorAll('.profile-card');
      gsap.fromTo(profiles, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out' });
    }
  }, [filter]);

  const filteredPlayers = filter === 'All' ? players : players.filter((p) => p.gender === filter);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    const checkout = e.currentTarget.querySelector('.checkout-text');
    gsap.to(img, { scale: 1.1, duration: 0.3 });
    gsap.fromTo(checkout, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    const checkout = e.currentTarget.querySelector('.checkout-text');
    gsap.to(img, { scale: 1, duration: 0.3 });
    gsap.to(checkout, { y: 20, opacity: 0, duration: 0.3 });
  };

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Player Profiles</h1>
      </div>
      <div className="container mx-auto md:px-24 py-8">
        <div className="flex justify-center mb-8" style={{backgroundColor: colors.thirdBackground}}>
          <div className="flex w-full">
            <button onClick={() => setFilter('All')} className={`flex-grow px-4 py-2 text-white text-center ${filter === 'All' ? 'bg-gray-700' : ''}`}>All</button>
            <button onClick={() => setFilter("Men's")} className={`flex-grow px-4 py-2 text-white text-center ${filter === "Men's" ? 'bg-gray-700' : ''}`}>Men</button>
            <button onClick={() => setFilter("Women's")} className={`flex-grow px-4 py-2 text-white text-center ${filter === "Women's" ? 'bg-gray-700' : ''}`}>Women</button>
          </div>
        </div>
        <div ref={profilesRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPlayers.map((player) => (
            <Link 
              key={player.slug} 
              href={`/team/profiles/${player.slug}`} 
              className="profile-card relative block w-full h-64 bg-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full h-full">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <p className="text-white text-sm">{player.gender}</p>
                  <h3 className="text-white text-lg font-bold">{player.name}</h3>
                </div>
                <div className="checkout-text absolute bottom-4 right-4 text-white opacity-0 uppercase italic underline">
                  <p>Check out</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
