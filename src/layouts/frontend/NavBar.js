import axios from 'axios';
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {

    const navigate = useNavigate();

    const logoutSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/logout').then(response => {
            if (response.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');

                toast.success(response.data.message);

                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        }).catch((error) => {
            console.log('Logout: ' + error);
            toast.error('Logout failed!');
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        {/* login and register */ }
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        )
    } else {
        {/* logout */ }
        AuthButtons = <li className="nav-item">
            <button type='button' onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" >Logout</button>
        </li>
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <ToastContainer />
            <div className="container">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
