import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useUser } from '../UserContext';
import './Navbar.css';

const Navbar = () => {
    const { user, setUser } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav>
            <div className="toggle-button" onClick={toggleNav}>
                ☰
            </div>
            <Link to="/" className="brand">
                <img src={logo} alt="Touro Logo" />
            </Link>
            <ul className={`nav-list ${navOpen ? 'show' : ''}`}>
                <li>
                    <Link to="/" className="link">Home</Link>
                </li>
                <li>
                    <Link to="/destination" className="link">Destinations</Link>
                </li>
                <li>
                    <Link to="/gallery" className="link">Gallery</Link>
                </li>
                <li>
                    <Link to="/contact" className="link">Contact</Link>
                </li>
            </ul>
            <div className="login-container">
                {user ? (
                    <li className="dropdown">
                        <span className="link" onClick={toggleDropdown}>
                            Welcome, {user.username}
                        </span>
                        {dropdownOpen && (
                            <div className="dropdown-content">
                                <Link to={`/profile/${user.id}`} className="dropdown-link">Profile</Link>
                                <Link to="/my-bookings" className="dropdown-link">My Bookings</Link> {/* New link added here */}
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </div>
                        )}
                    </li>
                ) : (
                    <Link to="/login" className="link login-button">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
