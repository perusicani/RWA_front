import React from 'react';

import NavBar from '../../../layouts/frontend/NavBar';

function Login() {

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
                                <form>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type='' name='email' className='form-control' value='' />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input type='' name='password' className='form-control' value='' />
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
