import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from the URL parameters

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        console.error('No user ID provided');
        return; // Early return if ID is not available
      }

      try {
        console.log(`Fetching user profile for ID: ${id}`);
        const response = await axios.get(`https://travelworld-backend-6kcs.onrender.com/api/users/${id}`, { withCredentials: true });
        console.log('Response:', response.data);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, user, { withCredentials: true });
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  // Show loading state while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '20px 0'
      }}>
        <label>
          <strong>Username:</strong>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Email:</strong>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Location (District):</strong>
          <input
            type="text"
            name="location.district"
            value={user.location?.district || ''}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Location (State):</strong>
          <input
            type="text"
            name="location.state"
            value={user.location?.state || ''}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Phone Number:</strong>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Age:</strong>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
        <label>
          <strong>Date of Birth:</strong>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth ? user.dateOfBirth.split('T')[0] : ''}
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </label>
      
      </form>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Profile;
