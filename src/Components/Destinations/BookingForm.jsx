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
        price: details?.price || '', // Added price
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            setError("No token found. Please log in again.");
            return;
        }

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

            console.log('Booking response:', response.data);
            setSuccess("Booking created successfully!");
            window.alert("Successfully booked!");
            navigate('/payment', { state: { formData, details } });
        } catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
            setError(errorMessage);
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Booking Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type} readOnly />
                    </div>
                    <div>
                        <label>Booking Name:</label>
                        <input type="text" name="bookingName" value={formData.bookingName} readOnly />
                    </div>
                    <div>
                        <label>Price:</label> {/* Added Price field */}
                        <input type="text" name="price" value={formData.price} readOnly />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#4CAF50', // Green background
                            color: '#fff', // White text
                            padding: '10px 20px', // Padding
                            border: 'none', // No border
                            borderRadius: '5px', // Rounded corners
                            cursor: 'pointer', // Pointer cursor on hover
                            fontSize: '16px', // Font size
                            marginTop: '10px' // Space above
                        }}
                    >
                        Confirm Booking
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BookingForm;
