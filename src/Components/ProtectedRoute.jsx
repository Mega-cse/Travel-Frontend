import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useUser();

    // If the user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element; // Render the protected component
};

export default ProtectedRoute;
