import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const { setUser, setToken } = useUser(); // Use setToken from UserContext
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
                
                // Store token and user in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                
                // Update user context
                setUser(user);
                setToken(token); // Store token in context

                // Redirect to the original location or to destinations
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
        width: '50%',
        margin: '20px auto',
        padding: '60px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
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

    const errorStyle = {
        color: 'red',
        textAlign: 'center',
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
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
            <p>
                <a href="/register" style={{ textDecoration: 'underline', color: '#007bff' }}>Register</a> |
                <a href="/forgot-password" style={{ textDecoration: 'underline', color: '#007bff' }}>Forgot Password</a>
            </p>
        </div>
    );
};

export default Login;
