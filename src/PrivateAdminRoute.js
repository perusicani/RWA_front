import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Loader from 'react-spinners/BeatLoader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateAdminRoute = () => {

    const navigate = useNavigate();

    const [Authenticated, setAuthenticated] = useState(false);

    const [loading, setloading] = useState(true);

    useEffect(() => {

        axios.get('/api/checkingAuthenticated').then((response) => {
            if (response.status === 200) {
                console.log('Checking Auth success');
                setAuthenticated(true);
            }
            setloading(false);
        });

        return () => {
            setAuthenticated(false);
        }
    }, []);

    // undefined === any error you can intercept
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error) {

        if (error.response.status === 401) {
            console.log('Unauthorized! ' + error.response.data.message);
            toast.error('Unauthorized! ' + error.response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2500);
        }
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403)  // Access denied
        {
            console.log('Forbidden! ' + error.response.data.message);
            toast.error('Forbidden! ' + error.response.data.message);
            setTimeout(() => {
                navigate('/403');
            }, 2500);
        }
        if (error.response.status === 404)  // No page
        {
            console.log('Page not found!');
            toast.error('Page not found!');
            setTimeout(() => {
                navigate('/404');
            }, 2500);
        }
        return Promise.reject(error);
    });

    // neč kao debounce
    if (loading) {
        return <>
            <ToastContainer />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                <Loader />
            </div>
        </>
    }


    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return Authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateAdminRoute;