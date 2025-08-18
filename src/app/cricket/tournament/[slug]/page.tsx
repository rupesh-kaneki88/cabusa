'use client'
import { tournaments } from '@/data/tournament';
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const TournamentPage = () => {
  const { colors } = useTheme();
  const params = useParams();
  const tournament = tournaments.find((t) => t.slug === params.slug);
  const router = useRouter();
const titleRef = useRef<HTMLDivElement>(null);
  const matchDayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (matchDayRef.current) {
      const matches = matchDayRef.current.querySelectorAll('.tournament-fixture');
      gsap.fromTo(matches, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out' });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelectorAll('p, b, strong'), { 
      color: colors.secondaryBackground,
      duration: 0.3 
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelectorAll('p, b, strong'), { 
      color: colors.mainBackground,
      duration: 0.3 
    });
  };

  if (!tournament) {
    return <div>Tournament not found</div>;
  }


  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>{tournament.name}</h1>
      </div>
      <button
        onClick={() => router.back()}
        className="underline px-4 md:px-22 mt-4 md:mt-8 font-bold italic uppercase cursor-pointer"
        style={{ color: colors.mainBackground }}
      >
        Go Back
      </button>
      <div className="container mx-auto px-4 md:px-20 py-8" ref={matchDayRef}>
        {tournament.matchDays.map((matchDay) => (
          <div key={matchDay.date} className="mb-8 ">
            <div className="flex flex-col ml-4 items-start mb-2 border-b" style={{ borderBottomColor: 'lightblue', borderBottomWidth: '4px' }}>
              <p className="uppercase font-bold text-lg md:text-xl">{matchDay.date}</p>
              <h2 className="text-lg font-thin text-gray-500 mr-4">{matchDay.format}</h2>
            </div>
            <div className="">
              {matchDay.matches.map((match, index) => (
                <div 
                  key={match.matchNumber} 
                  className="tournament-fixture bg-white shadow-md p-4"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={0}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-1">
                      <p>{`Match ${match.matchNumber}`}</p>
                    </div>
                    <div className="md:col-span-5">
                      <div className="flex items-center">
                        <img decoding="async" src={match.team1.logo} alt={match.team1.name} className="w-8 h-8 mr-2" />
                        <b>{match.team1.name}</b>
                      </div>
                      <div className="flex items-center mt-2">
                        <img decoding="async" src={match.team2.logo} alt={match.team2.name} className="w-8 h-8 mr-2" />
                        <b>{match.team2.name}</b>
                      </div>
                    </div>
                    <div className="md:col-span-4 md:text-center mt-4 md:mt-0">
                      <p><strong>Result:</strong> {match.result}</p>
                    </div>
                    <div className="md:col-span-2 md:text-right mt-4 md:mt-0">
                      <Link href={match.scorecardUrl}>
                        <button className="py-2 px-4 medium regular extra-color-3 regular-button w-full md:w-auto cursor-pointer"  style={{backgroundColor: colors.thirdBackground, color:colors.secondaryBackground }}>
                          SCORECARD
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;
