import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useUser } from '../UserContext';
import './MyBookings.css'

const MyBookings = () => {
    const { token } = useUser(); // Get the token from UserContext
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            // Decode the token to get user ID
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // Adjust this if your token has a different structure

            try {
                const response = await axios.get(`https://travelworld-backend-6kcs.onrender.com/api/book/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setBookings(response.data.bookings);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError('Error fetching bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-bookings">
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <h3>{booking.bookingName}</h3>
                            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                            <p><strong>Price:</strong> ${booking.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;
