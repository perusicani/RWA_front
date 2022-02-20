import axios from 'axios';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        // confirm_password: '',
        error_list: [],
    });

    const handleInput = (event) => {

        setRegister({ ...registerInput, [event.target.name]: event.target.value });

    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            // confirm_password: registerInput.confirm_password,
        }

        axios.get('/sanctum/csrf-cookie').then((CSRFresponse) => {
            axios.post('/api/register', data).then((response) => {
                if (response.status === 200) {

                    if (response.data.validation_errors && response.data.validation_errors.length) {

                        setRegister({ ...registerInput, error_list: response.data.validation_errors });
                        toast.error('Register failed!');

                    } else {

                        console.log('Register: ' + JSON.stringify(response.data));

                        // once the register passes, get token and store to local storage
                        localStorage.setItem('auth_token', response.data.token);
                        localStorage.setItem('auth_name', response.data.user.name);
                        localStorage.setItem('user_id', response.data.user.id);
                        localStorage.setItem('role', response.data.role === 'admin');

                        toast.success(response.data.message);

                        setTimeout(() => {
                            navigate('/');
                        }, 2500);
                    }

                } else {
                    setRegister({ ...registerInput, error_list: response.data.validation_errors });
                    toast.error('Register failed!');
                }

            }).catch((error) => {
                console.log('Register: ' + error + ' ' + error.response + ' ' + error.response.data);
                toast.error('Register failed!');
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
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Register</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Name</label>
                                        <input
                                            type='name'
                                            name='name'
                                            className='form-control'
                                            value={registerInput.name}
                                            onChange={handleInput}
                                        />
                                        <span>{registerInput.error_list.name ?? ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            name='email'
                                            className='form-control'
                                            value={registerInput.email}
                                            onChange={handleInput}
                                        />
                                        <span>{registerInput.error_list.email ?? ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            value={registerInput.password}
                                            onChange={handleInput}
                                        />
                                        <span>{registerInput.error_list.password ?? ''}</span>
                                    </div>
                                    {/* <div className='form-group mb-3'>
                                        <label>Confirm Password</label>
                                        <input
                                            type=''
                                            name='confirm_password'
                                            className='form-control'
                                        value={registerInput.confirm_password}
                                        />
                                    </div> */}

                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary' >
                                            Register
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

export default Register;
