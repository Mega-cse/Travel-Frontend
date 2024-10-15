import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaHotel, FaMapPin, FaCalendarDay } from 'react-icons/fa';
import StarRating from './StarRating';
import axios from 'axios';
import './DestinationDetails.css'; // Import CSS file

const DestinationDetails = () => {
    const { destinationName } = useParams();
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [hotelsResponse, placesResponse, packagesResponse] = await Promise.all([
                    axios.get(`https://travelworld-backend-6kcs.onrender.com/destinations/${destinationName}/hotels`),
                    axios.get(`https://travelworld-backend-6kcs.onrender.com/destinations/${destinationName}/places`),
                    axios.get(`https://travelworld-backend-6kcs.onrender.com/destinations/${destinationName}/packages`)
                ]);
                setHotels(hotelsResponse.data || []);
                setPlaces(placesResponse.data || []);
                setPackages(packagesResponse.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch destination data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [destinationName]);

    const handleBookNow = (type, details) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location } });
        } else {
            navigate('/booking', { state: { type, details: { ...details, price: details.price } } });
        }
    };

    const filteredHotels = hotels.filter(hotel => hotel.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredPlaces = places.filter(place => place.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredSuggestions = [...filteredHotels, ...filteredPlaces].slice(0, 5);

    useEffect(() => {
        if (searchQuery) {
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, filteredSuggestions]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <div className="destination-details-container">
            <h1 className="destination-title">{destinationName}</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search hotels and places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((item) => (
                            <li key={item.id} className="suggestion-item" onClick={() => { setSearchQuery(item.name); setSuggestions([]); }}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Hotels Section */}
            <h1 className="section-title">
                <FaHotel className="icon" />
                Hotels
            </h1>
            <div className="card-container">
                {filteredHotels.map((hotel) => (
                    <div key={hotel.id} className="card">
                        <img src={hotel.image} alt={hotel.name} className="card-image" />
                        <div className="card-content">
                            <strong>{hotel.name}</strong>
                            <StarRating rating={hotel.reviews[0]?.rating || 0} />
                            <p>Price Starts from: {hotel.price}</p>
                            <button
                                className={`book-button ${isAuthenticated ? '' : 'disabled'}`}
                                onClick={() => isAuthenticated ? handleBookNow('hotel', hotel) : null}
                                disabled={!isAuthenticated}
                            >
                                {isAuthenticated ? 'Book Now' : 'Login to Book'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Places Section */}
            <h2 className="section-title">
                <FaMapPin className="icon" />
                Places
            </h2>
            <div className="card-container">
                {filteredPlaces.map((place) => (
                    <div key={place.id} className="card">
                        <img src={place.image} alt={place.name} className="card-image" />
                        <div className="card-content">
                            <strong>{place.name}</strong>
                            <p>Price Starts from: {place.price}</p>
                            <p>{place.description}</p>
                            <button
                                className={`book-button ${isAuthenticated ? '' : 'disabled'}`}
                                onClick={() => isAuthenticated ? handleBookNow('place', place) : null}
                                disabled={!isAuthenticated}
                            >
                                {isAuthenticated ? 'Book Now' : 'Login to Book'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Packages Section */}
            <h2 className="section-title">
                <FaCalendarDay className="icon" />
                Packages
            </h2>
            <div className="card-container">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="card">
                        <img src={pkg.image} alt={pkg.name} className="card-image" />
                        <div className="card-content">
                            <h3>{pkg.name}</h3>
                            <p>{pkg.description}</p>
                            <p>Price: {pkg.price}</p>

                            <h4>Itinerary:</h4>
                            <ul>
                                {pkg.itinerary.map((item, dayIndex) => (
                                    <li key={dayIndex}>
                                        Day {item.day}: {item.activities}
                                    </li>
                                ))}
                            </ul>

                            <h4>Hotels:</h4>
                            <ul>
                                {pkg.hotels.map((hotel, index) => (
                                    <li key={index}>
                                        {hotel.name} - {hotel.price}
                                    </li>
                                ))}
                            </ul>

                            <h4>Food:</h4>
                            <p>{pkg.food}</p>

                            <h4>Travel Expenses:</h4>
                            <p>{pkg.travelExpenses}</p>

                            <button
                                className={`book-button ${isAuthenticated ? '' : 'disabled'}`}
                                onClick={() => isAuthenticated ? handleBookNow('package', pkg) : null}
                                disabled={!isAuthenticated}
                            >
                                {isAuthenticated ? 'Book Now' : 'Login to Book'}
                            </button>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default DestinationDetails;
