import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

import axios from 'axios';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

//CSRF token Laravel sanctum SPA docs
axios.defaults.withCredentials = true;

function App() {

  function getAuth() {
    return localStorage.getItem('auth_token');
  }

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path='/' name='Home' render={(props) => <Home {...props} />} element={<Home />} />

          {/* if user is authenticated, redirect from login and register to home till they logout */}
          <Route path='/login'
            name='Login'
            render={(props) => !getAuth() ? <Login {...props} /> : <Navigate to='/' />}
            element={!getAuth() ? <Login /> : <Navigate to='/' />}
          />
          <Route path='/register'
            name='Register'
            render={(props) => !getAuth() ? <Register {...props} /> : <Navigate to='/' />}
            element={!getAuth() ? <Register /> : <Navigate to='/' />}
          />

          {/* if user isn't authenticated, redirectto login */}

          <Route path='/admin/*' name='Admin' render={(props) => <MasterLayout {...props} />} element={<MasterLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
