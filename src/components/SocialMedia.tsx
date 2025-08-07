import React from 'react';

const SocialMedia = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Follow Us</h3>
      <div className="space-y-4">
        <a href="#" className="block p-6 bg-blue-600 text-white rounded-lg shadow-md text-center hover:bg-blue-700 transition-colors duration-300 min-h-96 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-2">Facebook Page</h4>
          <p className="text-sm">Connect with us on Facebook</p>
        </a>
        <a href="#" className="block p-6 bg-pink-500 text-white rounded-lg shadow-md text-center hover:bg-pink-600 transition-colors duration-300 min-h-96 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-2">Instagram Page</h4>
          <p className="text-sm">See our latest posts on Instagram</p>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
