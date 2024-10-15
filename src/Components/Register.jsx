import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!username || !email || !password || !district || !state || !phoneNumber || !age || !dateOfBirth) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('https://travelworld-backend-6kcs.onrender.com/api/register', {
                username,
                email,
                password,
                location: { district, state },
                phoneNumber,
                age,
                dateOfBirth
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) { // Status code for successful registration
                alert(response.data.message || 'Registration successful');

                // Clear form fields
                setUsername('');
                setEmail('');
                setPassword('');
                setDistrict('');
                setState('');
                setPhoneNumber('');
                setAge('');
                setDateOfBirth('');

                // Redirect to login page
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            // Detailed error handling
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const formContainerStyle = {
        width: '50%',
        margin: '20px auto',
        padding: '20px',
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

    return (
        <div style={formContainerStyle}>
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                    required
                />
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
                <label style={labelStyle}>District:</label>
                <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={inputStyle}
                    required
                />
                <label style={labelStyle}>State:</label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={inputStyle}
                    required
                />
                <label style={labelStyle}>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={inputStyle}
                    required
                />
                <label style={labelStyle}>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={inputStyle}
                    required
                />
                <label style={labelStyle}>Date of Birth:</label>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Register</button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
            <p style={{ textAlign: 'center' }}>
                <a href="/login" style={{ textDecoration: 'underline', color: '#007bff' }}>Login</a>
            </p>
        </div>
    );
};

export default Register;
