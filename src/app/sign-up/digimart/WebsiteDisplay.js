'use client'

// components/WebsiteDisplay.js
import React, { useState } from 'react';

const WebsiteDisplay = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <p className="text-center text-gray-900">Failed to load the content. Please try again later.</p>
        </div>
      )}
      <iframe
        src={url}
        className={`${loading || error ? 'hidden' : 'block'} w-full h-full border-none`}
        onLoad={handleLoad}
        onError={handleError}
        title="Embedded Website"
      />
    </div>
  );
};

export default WebsiteDisplay;
