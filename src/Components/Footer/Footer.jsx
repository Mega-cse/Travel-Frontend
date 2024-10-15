import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo.png'; 

const Footer = () => {
    const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === '') {
      alert('Invalid email address. Please enter a valid email address.');
    } else {
      alert(`Email successfully submitted: ${email}`);
      setEmail('');
    }
  };
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };



    return (
        <footer className="bg-gray-800 text-white px-4 py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
                {/* Footer Content */}
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                    <img
                        src={logo}
                        alt="Trips Travels Logo"
                        className="h-10 md:mr-12"
                    />
                    <div className="flex flex-col mt-3 md:text-left">
                        <p className="mb-2">Address: 123 Travel St, City, Country</p>
                        <p className="mb-2">Phone: +1 234 567 890</p>
                        <p className="mb-2">Email: info@tripstravels.com</p>
                        <p>&copy; 2024 Trips Travels. All rights reserved.</p>
                    </div>

                    <div className="flex justify-center mt-4">
                        <FontAwesomeIcon icon={faInstagram} className="text-[#964B00] mx-2 text-2xl" />
                        <FontAwesomeIcon icon={faFacebook} className="text-[#964B00] mx-2 text-2xl" />
                        <FontAwesomeIcon icon={faWhatsapp} className="text-[#964B00] mx-2 text-2xl" />
                    </div>
                </div>

                {/* Sign-Up Form */}
                <div>
      <div className="newsletter-container p-10">
        <h2 className="text-2xl font-semibold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-100 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            required
            className="px-2 py-2 border text-black border-gray-300 rounded-md mb-4 focus:outline-none focus:border-BaseColor"
          />
          <button type="submit" className="btn">
            Subscribe
          </button>
        </form>
      </div>
    </div>
            </div>
        </footer>
    );
};

export default Footer;
