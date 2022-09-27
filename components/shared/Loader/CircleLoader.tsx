import * as React from 'react';

const CircleLoader = () => {
  const circleCommonClasses = 'h-1.5 w-1.5 bg-gray-800 rounded-full';

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} animate-bounce200 mr-1`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
};

export default CircleLoader;
