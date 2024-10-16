import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const successImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPfBQ9Gfz0jF6_iyrNc6Cb1s7HeiRjU0TCdQ&s'; 

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formData } = state || {};
  const details = state?.details || {};

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to the home page after 6 seconds
    }, 6000);
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigate]);

  return (
    <div style={containerStyle}>
      <img src={successImageUrl} alt="Success" style={imageStyle} />
      <h1>Booking Successful!!!</h1>
      <p>Thank you for your booking.</p>
      <p><strong>Booking Details:</strong></p>
      <p><strong>Name:</strong> {formData?.name}</p>
      <p><strong>Email:</strong> {formData?.email}</p>
      <p><strong>Phone:</strong> {formData?.phone}</p>
      <p><strong>Date:</strong> {formData?.date}</p>
      <p><strong>Booking Name:</strong> {details?.name}</p>
      <p><strong>Total Price:</strong> {details?.price}</p>
    </div>
  );
};

export default BookingSuccess;
