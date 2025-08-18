'use client'
import { tournaments } from '@/data/tournament';
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const TournamentListPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const tournamentListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (tournamentListRef.current) {
      const tournaments = tournamentListRef.current.querySelectorAll('.tournament-card');
      gsap.fromTo(tournaments, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Tournaments</h1>
      </div>
      <div className="container mx-auto px-4 py-8" ref={tournamentListRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <Link key={tournament.slug} href={`/cricket/tournament/${tournament.slug}`}>
              <div className="tournament-card bg-white shadow-md rounded-lg p-8 block hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-center">{tournament.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentListPage;