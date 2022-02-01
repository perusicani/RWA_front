import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    function getAuth() {
        return localStorage.getItem('auth_token');
    }

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;