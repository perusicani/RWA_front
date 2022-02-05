import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import PrivateAdminRoute from './PrivateAdminRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';

import axios from 'axios';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Users from './components/admin/Users';

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

          <Route exact path='/'
            name='Home'
            element={<Home />}
          />

          <Route path='/403'
            name='Page403'
            element={<Page403 />}
          />
          <Route path='/404'
            name='Page404'
            element={<Page404 />}
          />

          {/* if user is authenticated, redirect from login and register to home till they logout */}
          <Route path='/login'
            name='Login'
            // render={(props) => !getAuth() ? <Login {...props} /> : <Navigate to='/' />}
            element={!getAuth() ? <Login /> : <Navigate to='/' />}
          />
          <Route path='/register'
            name='Register'
            // render={(props) => !getAuth() ? <Register {...props} /> : <Navigate to='/' />}
            element={!getAuth() ? <Register /> : <Navigate to='/' />}
          />

          {/* <Route path='/admin/*' name='Admin' render={(props) => <MasterLayout {...props} />} element={<MasterLayout />} /> */}
          <Route path='/admin' element={<PrivateAdminRoute />}>

            <Route element={<MasterLayout />}>

              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/users" element={<Users />} />

            </Route>
            <Route path="/admin/*" element={<Page404 />} />

          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
