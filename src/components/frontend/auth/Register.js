import axios from 'axios';
import React, { useState, useEffect } from 'react';

import NavBar from '../../../layouts/frontend/NavBar';

function Register() {

    const [registerInput, setregister] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleInput = (event) => {
        event.persist();
        setregister({ ...registerInput, [event.target.name]: event.target.value });
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            confirm_password: registerInput.confirm_password,
        }

        axios.get('/sanctum/csrf-cookie').then((CSRFresponse) => {

            console.log('CSRF: ' + CSRFresponse);

            axios.post('/api/register', data).then((response) => {
                console.log('Register: ' + response);
            }).catch((error) => {
                console.log('Register: ' + error);
            });

        }).catch((error) => {
            //Error gettinf CSRF token?
            console.log('CSRF: ' + error);
        });

    }

    return (
        <div>
            <NavBar />
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
                                            type=''
                                            name='name'
                                            className='form-control'
                                            value={registerInput.name}
                                        // onChange={ }
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input
                                            type=''
                                            name='email'
                                            className='form-control'
                                            value={registerInput.email}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input
                                            type=''
                                            name='password'
                                            className='form-control'
                                            value={registerInput.password}
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Confirm Password</label>
                                        <input
                                            type=''
                                            name='confirm_password'
                                            className='form-control'
                                            value={registerInput.confirm_password}
                                        />
                                    </div>

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
