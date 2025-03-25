import React, { useState, useEffect } from 'react';

const PhotoPlaceholder = ({ photoNumber }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    // Check if the image exists in the Photos folder
    const checkImageExists = async () => {
      try {
        // Try to fetch the image
        const response = await fetch(`${process.env.PUBLIC_URL}/Photos/Photo${photoNumber}.png`);
        if (response.ok) {
          setImageSrc(`${process.env.PUBLIC_URL}/Photos/Photo${photoNumber}.png`);
          setImageExists(true);
        } else {
          // If PNG doesn't exist, try JPG
          const jpgResponse = await fetch(`${process.env.PUBLIC_URL}/Photos/Photo${photoNumber}.jpg`);
          if (jpgResponse.ok) {
            setImageSrc(`${process.env.PUBLIC_URL}/Photos/Photo${photoNumber}.jpg`);
            setImageExists(true);
          } else {
            setImageExists(false);
          }
        }
      } catch (error) {
        console.error(`Error checking for Photo${photoNumber}:`, error);
        setImageExists(false);
      }
    };

    checkImageExists();
  }, [photoNumber]);

  return (
    <div className="photo-placeholder">
      {imageExists ? (
        <img 
          src={imageSrc} 
          alt={`Photo ${photoNumber}`} 
          className="w-full h-auto rounded-lg shadow-md"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 rounded-lg p-8 text-center min-h-[200px]">
          <p className="text-gray-600">
            Photo{photoNumber} - Add your image by placing Photo{photoNumber}.png in the Photos folder
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoPlaceholder;
