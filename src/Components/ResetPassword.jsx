import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from URL params
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://travelworld-backend-6kcs.onrender.com/api/reset-password/${token}`, {
                method: 'PUT', // Ensure method matches backend expectations
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/'); // Redirect to login page after success
            }, 2000); // Delay to allow user to see success message
        } catch (error) {
            setError(error.message);
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
            <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Reset Password</button>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>}
            {success && <div style={{ color: 'green', textAlign: 'center' }}>Password reset successful! Redirecting to login...</div>}
        </div>
    );
};

export default ResetPassword;
