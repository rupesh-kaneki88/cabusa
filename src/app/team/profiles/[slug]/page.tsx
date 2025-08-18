'use client'
import { players } from '@/data/players';
import { useTheme } from '@/components/ThemeProvider';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Grid2X2} from 'lucide-react';

const PlayerProfilePage = () => {
  const { colors } = useTheme();
  const params = useParams();
  const player = players.find((p) => p.slug === params.slug);

  const imageRef = useRef<HTMLImageElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }

    if(imageRef.current){
      gsap.fromTo(imageRef.current, { opacity: 0 }, { opacity:1, duration: 0.2, ease: 'power3.out'});
    }

    if (bioRef.current) {
      gsap.fromTo(bioRef.current, { y: window.innerHeight, opacity: 0.4 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' });
    }
  }, [player]);

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <button className='fixed item-center left-4 md:left-8 z-50 p-2 rounded-full cursor-pointer'
        aria-label='Go back to player list'
         onClick={() => router.back()}
        >
          <Grid2X2     color={colors.secondaryBackground} />
        </button>
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>{player.name}</h1>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 md:mr-12">
            <img ref={imageRef} src={player.image} alt={player.name} className="w-full h-auto shadow-lg" />
          </div>
          <div ref={bioRef} className="col-span-1 p-4 md:p-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase italic" style={{ color: colors.mainBackground }}>Bio</h2>
            <p className="text-base md:text-lg text-gray-700">{player.bio}</p>
            {/* Add more player details here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;
