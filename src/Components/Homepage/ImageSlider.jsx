// ImageSlider.js
import React, { useEffect, useState } from 'react';
import './ImageSlider.css'; // Import CSS for styling

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="image-slider">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slider Image ${index + 1}`}
                    className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default ImageSlider;
