import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://travelworld-backend-6kcs.onrender.com/api/login', {
                email,
                password,
            });

            if (response.data.success) {
                const { token, user } = response.data; 
                
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                
                setUser(user);
                setToken(token);

                const from = location.state?.from?.pathname || '/destination'; 
                navigate(from);
            } else {
                setLoginError(response.data.message || 'Login failed');
            }
        } catch (error) {
            setLoginError(error.response?.data?.message || 'An error occurred');
        }
    };

    const formContainerStyle = {
        maxWidth: '400px', // Set a max width for larger screens
        width: '90%', // Use percentage for responsiveness
        margin: '20px auto',
        padding: '40px',
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
        fontSize: '16px', // Increased font size for better readability
    };

    const buttonStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px', // Increased font size for better accessibility
        transition: 'background-color 0.3s', // Transition for hover effect
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center',
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Login</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <label style={labelStyle}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
            {loginError && <p style={errorStyle}>{loginError}</p>}
            <p style={{ textAlign: 'center' }}>
                <a href="/register" style={{ textDecoration: 'underline', color: '#007bff' }}>Register</a> |
                <a href="/forgot-password" style={{ textDecoration: 'underline', color: '#007bff' }}>Forgot Password</a>
            </p>
        </div>
    );
};

export default Login;
