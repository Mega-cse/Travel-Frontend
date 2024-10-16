import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Homepage/Header';
import Login from './Components/Login';
import Contact from './Components/Contact';
import Gallery from './Gallery/Gallery';
import ServicesList from './Components/Homepage/ServiceList';
import Destination from './Components/Destinations/Destination';
import DestinationDetails from './Components/Destinations/DestinationDetails';
import BookingForm from './Components/Destinations/BookingForm';
import Register from './Components/Register';
import PaymentPage from './Components/PaymentPage';
import BookingSuccess from './Components/Destinations/BookingSuccess';
import ForgotPassword from './Components/Forgotpassword';
import ResetPassword from './Components/ResetPassword';
import { UserProvider } from './Components/UserContext'; // Import UserProvider
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute
import MyBookings from './Components/Destinations/MyBookings';

function App() {
  return (
    <UserProvider> {/* Wrap your application with UserProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/destination' element={<Destination />} />
          <Route path="/destination/:destinationName" element={<DestinationDetails />} />          
          {/* Protected Routes */}
          <Route path="/booking" element={<ProtectedRoute element={<BookingForm />}  />}/>
          <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />}  />}/>
          <Route path="/booking-success" element={<ProtectedRoute element={<BookingSuccess />} />} />
          <Route path='/profile/:id' element={<ProtectedRoute element={<Profile />} />} />\
          <Route path="/my-bookings"  element={<MyBookings/>}  />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
