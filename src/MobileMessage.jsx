import React from 'react';

const MobileMessage = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-200 via-white to-purple-200 flex items-center justify-center p-4">
    <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
      <h1 className="text-2xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-4">
        For the best experience, please visit my website on a computer!
      </p>
      <p className="text-sm text-gray-600">
        My portfolio looks great on larger screens. Can't wait to show you!
      </p>
    </div>
  </div>
);

export default MobileMessage;