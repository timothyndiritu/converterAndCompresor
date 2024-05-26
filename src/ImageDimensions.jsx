// ImageDimensions.js
import React, { useState, useEffect } from 'react';

const ImageDimensions = ({ imageUrl, onDimensions }) => {
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    const handleImageLoad = () => {
      const dimensions = {
        width: img.width,
        height: img.height,
      };
      onDimensions(dimensions);
    };

    img.onload = handleImageLoad;

    // Cleanup the event listener on component unmount
    return () => {
      img.onload = null;
    };
  }, [imageUrl, onDimensions]);

  return null; // This component doesn't render anything visible
};

export default ImageDimensions;
