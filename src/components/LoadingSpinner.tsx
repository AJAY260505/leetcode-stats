
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin-slow"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-primary animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
