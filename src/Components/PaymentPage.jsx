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
        <div style={styles.container}>
            <h1 style={styles.header}>Payment for {details?.name}</h1>
            <p style={styles.priceText}>Total Price: {details?.price}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm formData={formData} details={details} />
            </Elements>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        width: '90%', // Make the container responsive
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '10px',
    },
    priceText: {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '20px',
    },
};

export default PaymentPage;
