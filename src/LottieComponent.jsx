import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './assets/loading-video.json'; // Import your Lottie animation JSON file

const LottieComponent = () => {
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

  useEffect(() => {
    setIsAnimationLoaded(true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      {isAnimationLoaded && (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </div>
  );
}

export default LottieComponent;
