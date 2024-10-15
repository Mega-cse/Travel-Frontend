import React from 'react';
import ImageSlider from './ImageSlider'; // Import the new ImageSlider component
import Gallery from '../../Gallery/Gallery';
import ServicesList from './ServiceList';
import Footer from '../Footer/Footer';
import TestimonialSlider from '../Testimonial/TestimonialSlider';

const Header = () => {
    const images = [
        "/image/img.jpg",
        "/image/img2.jpg",
        "/image/img3.jpg",
        "/image/img4.jpg",
        "/image/img5.jpg",

    ];

    return (
        <div>
            {/* Header Section */}
            <ImageSlider images={images} /> {/* Use the ImageSlider here */}
            <Gallery />
            <ServicesList />
            <TestimonialSlider />
            <Footer />
        </div>
    );
};

export default Header;
