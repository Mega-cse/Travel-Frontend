import React, { useEffect, useState } from 'react';
import './Testimonial.css'; // Import CSS for styling

// Array of image paths
const images = [
  "/image/emily.jpg",
  "/image/john.jpg",
  "/image/mark.jpg",
  "/image/sarah.jpg"
];

const testimonials = [
  {
    id: 1,
    text: "The best travel experience I've ever had! The scenery was breathtaking.",
    author: "Emily.",
    image: images[0], // Use the path from the array
  },
  {
    id: 2,
    text: "Absolutely loved my trip! The itinerary was perfectly planned.",
    author: "John",
    image: images[1], // Use the path from the array
  },
  {
    id: 3,
    text: "I discovered hidden gems and unforgettable experiences. Highly recommend!",
    author: "Sarah",
    image: images[2], // Use the path from the array
  },
  {
    id: 4,
    text: "An incredible journey! The local guides were knowledgeable and friendly.",
    author: "Mark",
    image: images[3], // Use the path from the array
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="testimonials-slider">
      <div className="testimonial">
        <img 
          src={testimonials[currentIndex].image} 
          alt={`${testimonials[currentIndex].author}`} 
          className="testimonial-image" 
        />
        <p>"{testimonials[currentIndex].text}"</p>
        <h4>- {testimonials[currentIndex].author}</h4>
      </div>
      <div className="indicators">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
