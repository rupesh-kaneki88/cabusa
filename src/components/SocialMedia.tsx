import React from 'react';
import { useTheme } from './ThemeProvider';

const SocialMedia = () => {
  const { colors } = useTheme();

  return (
    <div className="px-4 md:px-14 mb-4 md:mb-10 uppercase">
      <h3 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{ color: colors.mainBackground }}>Follow Us</h3>
      <div className="flex flex-col flex-wrap gap-4 md:flex-row lg:flex-col">
        <a href="#" className="flex-1 p-6 bg-blue-600 text-white shadow-md text-center hover:bg-blue-700 transition-colors duration-300 min-h-96 flex flex-col justify-center" >
          <h4 className="text-2xl font-semibold mb-2">Facebook Page</h4>
          <p className="text-sm">Connect with us on Facebook</p>
        </a>
        <a href="#" className="flex-1 p-6 bg-pink-500 text-white shadow-md text-center hover:bg-pink-600 transition-colors duration-300 min-h-96 flex flex-col justify-center" >
          <h4 className="text-2xl font-semibold mb-2">Instagram Page</h4>
          <p className="text-sm">See our latest posts on Instagram</p>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
