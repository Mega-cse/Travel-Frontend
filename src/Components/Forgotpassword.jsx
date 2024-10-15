import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://travelworld-backend-6kcs.onrender.com/api/forget-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    const formContainerStyle = {
        width: '400px',
        margin: '100px auto',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        margin: '10px 0 5px',
    };

    const inputStyle = {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    };

    const buttonStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Send Reset Link</button>
            </form>
            {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
