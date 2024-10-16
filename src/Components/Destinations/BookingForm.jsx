import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';
import './Booking.css'; // Import the CSS file for styles

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useUser();

    const { type, details } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        type: type || '',
        bookingName: details?.name || '',
        price: details?.price || '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBookingSuccess = () => {
        setSuccess("Booking created successfully!");
        window.alert("Successfully booked!");
        setTimeout(() => {
            navigate('/booking-success', { state: { formData, details } }); // Pass state to success page
        }, 1000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            setError("No token found. Please log in again.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://travelworld-backend-6kcs.onrender.com/api/book/create', {
                ...formData,
                bookingName: formData.bookingName.trim(),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.success) {
                handleBookingSuccess();
            } else {
                setError("Booking failed. Please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-container">
            <div className="image-section">
                <img src="./image/img1.jpg" alt="Booking" />
            </div>
            <div className="form-section">
                <h2>Booking Form</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                {loading && <p className="loading-message">Processing your booking...</p>}
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'phone', 'date'].map((field) => (
                        <div key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input
                                type={field === 'date' ? 'date' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div>
                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type} readOnly />
                    </div>
                    <div>
                        <label>Booking Name:</label>
                        <input type="text" name="bookingName" value={formData.bookingName} readOnly />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price" value={formData.price} readOnly />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#ccc' : '#4CAF50',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            marginTop: '10px'
                        }}
                    >
                        {loading ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
