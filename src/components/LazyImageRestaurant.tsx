import React, { useState, useRef, useEffect } from 'react';

import ImagePreloader from './ImagePreloader';

type Props = {
  src: string;
  alt: string;
}

const registerObserver = (ref: any, setShowImage: any) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowImage(true);
      observer.disconnect();
    });
  });
  observer.observe(ref)
}

const LazyImageRestaurant: React.FC<Props> = ({ src, alt }) => {
  const [showImage, setShowImage] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    registerObserver(imageRef.current, setShowImage)
  }, [])

  if (showImage) {
    return (
      <>
        {!imgVisible && <ImagePreloader />}
        <img
          src={src}
          alt={alt}
          className='card__image'
          onLoad={() => setImgVisible(true)}
        />
      </>
    )
  }

  return <div ref={imageRef} className="card__image"></div>
}

export default LazyImageRestaurant;
