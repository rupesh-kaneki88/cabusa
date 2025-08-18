'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/ThemeProvider';
import { committees } from '@/data/committees';

const CommitteesPage = () => {
  const { colors } = useTheme();
  const tableRef = useRef<HTMLTableElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    const rows = tableRef.current?.querySelectorAll('tbody tr');
    if (rows) {
      gsap.fromTo(rows, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Committees</h1>
      </div>
      <div className="container mx-auto px-2 md:px-24 py-8">
        <figure>
          <figcaption className="text-lg font-bold text-center mb-4">Committees and Their Members</figcaption>
          <div className="overflow-x-auto">
            <table ref={tableRef} className="min-w-full bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Sr. No.</th>
                  <th className="py-3 px-6 text-left">Committee</th>
                  <th className="py-3 px-6 text-left">Chair</th>
                  <th className="py-3 px-6 text-left">Other Members</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {committees.map((committee) => (
                  <tr key={committee.sr_no} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left align-top whitespace-nowrap">{committee.sr_no}</td>
                    <td className="py-3 px-6 text-left align-top">{committee.committee}</td>
                    <td className="py-3 px-6 text-left align-top">{committee.chair}</td>
                    <td className="py-3 px-6 text-left align-top align-top">
                      <div>
                        {committee.members.map((member, index) => (
                          <div key={index}>{member}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default CommitteesPage;
