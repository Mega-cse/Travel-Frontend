import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ formData, details }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true); // Start loading

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setLoading(false); // Stop loading

    if (error) {
      console.log('[error]', error);
      // Optionally show error to the user
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Navigate to booking success page after successful payment
      navigate('/booking-success', { state: { formData, details } });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.container}>
      <div style={formStyles.cardElementContainer}>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || loading} style={formStyles.button}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const formStyles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  cardElementContainer: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px', // Increased font size for better readability
    transition: 'background-color 0.3s',
  },
};

export default CheckoutForm;
