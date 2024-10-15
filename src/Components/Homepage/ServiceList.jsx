import React from 'react';
import { MdHotel } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoMdBus } from "react-icons/io";
//import Gallery from '../Gallery/Gallery';

// ServicesCard Component
const ServicesCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="bg-brown-500 text-4xl text-white p-4 mb-4 inline-block rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

// ServicesList Component
const ServicesList = () => {
  const services = [
    {
      title: 'Adventure Tours',
      description: 'Explore thrilling destinations with our guided adventure tours.',
      icon: <IoMdBus style={{color:'brown',fontSize:'2em'}}/>,
    },
    {
      title: 'Travel Planning',
      description: 'Let us handle the details! We plan, you enjoy your dream vacation.',
      icon: <FaPlaneDeparture style={{color:'brown',fontSize:'2em'}} />,
    },
    {
      title: 'High-Quality Accommodations',
      description: 'Experience comfort and luxury with our carefully selected accommodations.',
      icon: <MdHotel style={{color:'brown',fontSize:'2em'}} />,
    },
  ];

  return (
    <div className="bg-white-100 py-12 px-6">
      <div className="text-left mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4" style={{textAlign:'center',color:'brown',fontFamily:'-moz-initial',fontSize:'2.5em'}}>Our Best Services</h1>
       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServicesCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
        
      </div>
      <div>
      {/* <Gallery/> */}
      </div>
    
    </div>
  );
};

export default ServicesList;
