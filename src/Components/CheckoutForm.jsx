import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ formData, details }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // Handle payment method
      console.log('[PaymentMethod]', paymentMethod);
      
      // Assuming payment is successful, redirect to the booking confirmation page
      navigate('/booking-success', { state: { formData, details } });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe} style={{
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer'
      }}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
