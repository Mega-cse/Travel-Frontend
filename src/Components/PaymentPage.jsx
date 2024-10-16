import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PxSZpRs8NL4kngvFVsI96ZuKq3XURAw9ZDdvfRNlNXbiOjakBsOmD1GNFwKsMc7KCGIqRvn3Nm6wJYDwUGDTMwe00038l6IYH'); 

const PaymentPage = () => {
    const { state } = useLocation();
    const { formData, details } = state || {};

    return (
        <div style={{
            width: '50%',
            margin: '20px auto',
            padding: '100px',
            height: '100%',
            borderRadius: '10px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9'
        }}>
            <h1 style={{ textAlign: 'center' }}>Payment for {details?.name}</h1>
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Total Price: {details?.price}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm formData={formData} details={details} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
