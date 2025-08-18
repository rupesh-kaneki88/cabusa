'use client'
import { boardOfDirectors } from '@/data/boardOfDirectors';
import { useTheme } from '@/components/ThemeProvider';
import BoardIntro from '@/components/BoardIntro';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const BoardOfDirectorsPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Board of Directors</h1>
      </div>
      <BoardIntro />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardOfDirectors.map((member) => (
            <div key={member.name} className="flip-card bg-transparent rounded-lg shadow-md" style={{ minHeight: '400px' }}>
              <div
                className="flip-card-inner"
                role="button"
                tabIndex={0}
                aria-pressed="false"
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.setAttribute('aria-pressed', 'true');
                  const front = card.querySelector('.flip-card-front');
                  const back = card.querySelector('.flip-card-back');
                  if (front && back) {
                    front.setAttribute('aria-hidden', 'true');
                    back.setAttribute('aria-hidden', 'false');
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.setAttribute('aria-pressed', 'false');
                  const front = card.querySelector('.flip-card-front');
                  const back = card.querySelector('.flip-card-back');
                  if (front && back) {
                    front.setAttribute('aria-hidden', 'false');
                    back.setAttribute('aria-hidden', 'true');
                  }
                }}
                onClick={(e) => {
                  const card = e.currentTarget;
                  const isPressed = card.getAttribute('aria-pressed') === 'true';
                  card.setAttribute('aria-pressed', String(!isPressed));
                  const front = card.querySelector('.flip-card-front');
                  const back = card.querySelector('.flip-card-back');
                  if (front && back) {
                    front.setAttribute('aria-hidden', String(!isPressed));
                    back.setAttribute('aria-hidden', String(isPressed));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const card = e.currentTarget;
                    const isPressed = card.getAttribute('aria-pressed') === 'true';
                    card.setAttribute('aria-pressed', String(!isPressed));
                    const front = card.querySelector('.flip-card-front');
                    const back = card.querySelector('.flip-card-back');
                    if (front && back) {
                      front.setAttribute('aria-hidden', String(!isPressed));
                      back.setAttribute('aria-hidden', String(isPressed));
                    }
                  }
                }}
              >
                <div className="flip-card-front" aria-hidden="false">
                  <div className="relative h-74">
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-center mb-2">{member.name}</h2>
                    <h3 className="text-lg text-gray-600 text-center mb-4">{member.title}</h3>
                  </div>
                </div>
                <div className="flip-card-back bg-white rounded-lg p-6 flex items-center justify-center" aria-hidden="true">
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectorsPage;
