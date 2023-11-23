import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import CircularProgress from '@mui/material/CircularProgress';

const LazyLoadingCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([images[0]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = loadedImages[activeIndex];
    img.onload = () => setLoading(false);
  }, [loadedImages, activeIndex]);

  const handleNext = () => {
    setLoading(true);
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
    if (!loadedImages.includes(images[nextIndex])) {
      setLoadedImages((prevImages) => [...prevImages, images[nextIndex]]);
    }
  };

  const handlePrev = () => {
    setLoading(true);
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(prevIndex);
    if (!loadedImages.includes(images[prevIndex])) {
      setLoadedImages((prevImages) => [...prevImages, images[prevIndex]]);
    }
  };

const handlers = useSwipeable({
  onSwipedLeft: handleNext,
  onSwipedRight: handlePrev,
});

  return (
    <div {...handlers}>
      {loading ? (
        <CircularProgress />
      ) : (
        <img src={loadedImages[activeIndex]} alt="carousel" />
      )}
    </div>
  );
};

export default LazyLoadingCarousel;