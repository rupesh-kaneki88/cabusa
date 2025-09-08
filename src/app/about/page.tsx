
'use client'
import { useTheme } from '@/components/ThemeProvider';
import AboutIntro from '@/components/AboutIntro';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const objectivesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (objectivesRef.current) {
      gsap.fromTo(objectivesRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.flip-card');
      gsap.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out' });

      cards.forEach(card => {
        const htmlCard = card as HTMLElement;
        const listItems = card.querySelectorAll('li');
        const back = card.querySelector('.flip-card-back');
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(back, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        tl.fromTo(listItems, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }, "-=0.3");

        const playAnimation = () => {
          const isPressed = htmlCard.getAttribute('aria-pressed') === 'true';
          if (isPressed) {
            tl.play();
          } else {
            tl.reverse();
          }
        };

        htmlCard.addEventListener('mouseenter', () => {
          htmlCard.setAttribute('aria-pressed', 'true');
          playAnimation();
        });

        htmlCard.addEventListener('mouseleave', () => {
          htmlCard.setAttribute('aria-pressed', 'false');
          playAnimation();
        });

        htmlCard.addEventListener('focus', () => {
          htmlCard.setAttribute('aria-pressed', 'true');
          playAnimation();
        });

        htmlCard.addEventListener('blur', () => {
          htmlCard.setAttribute('aria-pressed', 'false');
          playAnimation();
        });

        htmlCard.addEventListener('click', () => {
          const isPressed = htmlCard.getAttribute('aria-pressed') === 'true';
          htmlCard.setAttribute('aria-pressed', String(!isPressed));
          playAnimation();
        });

        htmlCard.addEventListener('keydown', (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
            const isPressed = htmlCard.getAttribute('aria-pressed') === 'true';
            htmlCard.setAttribute('aria-pressed', String(!isPressed));
            playAnimation();
          }
        });
      });
    }
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>About CABUSA</h1>
      </div>
      <AboutIntro />
      <div ref={objectivesRef} className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase" style={{ color: colors.thirdBackground }}>Objectives and Goals</h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flip-card bg-transparent rounded-lg shadow-md" style={{ minHeight: '400px' }}>
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
              <div className="flip-card-front bg-white rounded-lg p-6 flex flex-col items-center justify-center" aria-hidden="false">
                <h3 className="text-2xl font-bold mb-4">Short-Term Objectives (2025&#x2012;2026)</h3>
              </div>
              <div className="flip-card-back bg-white rounded-lg p-6" aria-hidden="true">
                <ul className="list-disc list-inside text-justify">
                  <li>Establish the First-Ever USA Women&#39;s Cricket team for the Blind with participation in the first ever Women&#39;s T20 World Cup &#x2010; Cricket for the Blind in India, November 2025.</li>
                  <li>Multiple Coaching Camps to the USA Women&#39;s Cricket team for the Blind</li>
                  <li>Launch awareness campaigns and introductory workshops across major U.S. cities.</li>
                  <li>Registration and Coaching camp for Men and Establish USA Men&#39;s Cricket team for Blind</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flip-card bg-transparent rounded-lg shadow-md" style={{ minHeight: '400px' }}>
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
              <div className="flip-card-front bg-white rounded-lg p-6 flex flex-col items-center justify-center" aria-hidden="false">
                <h3 className="text-2xl font-bold mb-4">Long-Term Goals (2026&#x2012;2030)</h3>
              </div>
              <div className="flip-card-back bg-white rounded-lg p-6" aria-hidden="true">
                <ul className="list-disc list-inside text-justify">
                  <li>Organise Bilateral/ Triangular/ Quad angular Cricket Series for Men & Women in the US</li>
                  <li>Participate in the Tournament organised by WBCC and WBCC Member Countries</li>
                  <li>Form state-level men&#39;s and women&#39;s cricket teams across all U.S. states.</li>
                  <li>Institutionalize Cricket for the Blind through school, university, and community programs.</li>
                  <li>Develop a cadre of certified blind cricket coaches, officials, and volunteers across the U.S.</li>
                  <li>Facilitate career paths in sports administration, coaching, and public advocacy for visually impaired individuals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
