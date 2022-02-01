import axios from 'axios';
import React, { useState } from 'react';

import NavBar from '../../../layouts/frontend/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        // confirm_password: '',
        error_list: [],
    });

    const handleInput = (event) => {

        setLogin({ ...loginInput, [event.target.name]: event.target.value });

    }

    const loginSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then((CSRFresponse) => {

            axios.post('/api/login', data).then((response) => {

                if (response.status === 200) {

                    console.log('Login success: ' + JSON.stringify(response.data));

                    // once the Login passes, get token and store to local storage
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_name', response.data.user.name);

                    toast.success(response.data.message);

                    setTimeout(() => {
                        navigate('/');
                    }, 2500);

                } else if (response.status === 401) {

                    //bad creds error
                    console.log('Login bad creds');
                    toast.warning(response.data.message);

                } else if (response.status === 403) {
                    //validation error
                    console.log('Validation error: ' + response.data.validation_errors);
                    setLogin({ ...loginInput, error_list: response.data.validation_errors });
                    toast.error('Login failed in validation!');
                }

            }).catch((error) => {
                console.log('Login catch error: ' + error);
                toast.error('Login failed!');
            });

        }).catch((error) => {
            //Error gettinf CSRF token?
            console.log('CSRF: ' + error);
            toast.error('An error occurred while getting the CSRF token!');
        });
    }

    return (
        <div>
            <ToastContainer />
            <NavBar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Login</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            name='email'
                                            className='form-control'
                                            value={loginInput.email}
                                            onChange={handleInput}
                                        />
                                        <span>{loginInput.error_list ? loginInput.error_list.email ?? '' : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            value={loginInput.password}
                                            onChange={handleInput}
                                        />
                                        <span>{loginInput.error_list ? loginInput.error_list.password ?? '' : ''}</span>
                                    </div>

                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary' >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Login;

