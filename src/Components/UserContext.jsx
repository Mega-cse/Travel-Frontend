import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null); // Store token

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
