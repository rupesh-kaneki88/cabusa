'use client'
import { boardOfDirectors } from '@/data/boardOfDirectors';
import { useTheme } from '@/components/ThemeProvider';
import BoardIntro from '@/components/BoardIntro';

const BoardOfDirectorsPage = () => {
  const { colors } = useTheme();

  return (
    <div className='mb-4 md:mb-8'>
      <div style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Board of Directors</h1>
      </div>
      <BoardIntro />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardOfDirectors.map((member) => (
            <div key={member.name} className="flip-card bg-transparent rounded-lg shadow-md" style={{ minHeight: '400px' }}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="relative h-74">
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-center mb-2">{member.name}</h2>
                    <h3 className="text-lg text-gray-600 text-center mb-4">{member.title}</h3>
                  </div>
                </div>
                <div className="flip-card-back bg-white rounded-lg p-6 flex items-center justify-center">
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
