import React, { useEffect } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = ({ image, setCompressedImage }) => {
  useEffect(() => {
    const compressImage = async () => {
      try {
        if (!image) return;

        const options = {
          maxSizeMB: 0.1, // Maximum size of the compressed image in MB
          maxWidthOrHeight: 800, // Max width or height of the output image
          useWebWorker: true, // Use multi-threading for better performance
        };

        const compressedFile = await imageCompression(image, options);
        const compressedImageUrl = URL.createObjectURL(compressedFile);
        setCompressedImage(compressedImageUrl);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    };

    compressImage();
  }, [image, setCompressedImage]);

  return null;
};

export default ImageCompressor;
