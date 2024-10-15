import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import axios from 'axios';
import './Destination.css'; // Import CSS file

const Destination = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://travelworld-backend-6kcs.onrender.com/api/place/get'); // Your API endpoint
        setPlaces(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (place) => {
    navigate(`/destination/${place.name}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="destination-container">
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <h1 className="destination-title">Select a Destination</h1>
      <div className="destination-list">
        {filteredPlaces.map((place) => (
          <div key={place.id} className="destination-card">
            <img
              src={place.image}
              alt={place.name}
              className="destination-image"
            />
            <h2 className="destination-name">
              <FaLocationArrow className="location-icon" />
              {place.name}
            </h2>
            <button className="view-button" onClick={() => handleViewClick(place)}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;
