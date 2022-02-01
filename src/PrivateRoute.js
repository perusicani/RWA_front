import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import axios from 'axios';

const PrivateRoute = () => {
    function getAuth() {
        return localStorage.getItem('auth_token');
    }

    // const [Authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {

    //     axios.get('/api/checkingAuthenticated').then((response) => {
    //         if (response.status === 200) {
    //             console.log('Checking Auth success');
    //             setAuthenticated(true);
    //         }
    //     }).catch((error) => {
    //         console.log('Error while checking Auth: ' + error);
    //     });

    //     return () => {
    //         setAuthenticated(false);
    //     }
    // }, []);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;