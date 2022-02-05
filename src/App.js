import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/admin/AdminLayout';
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
import FrontendLayout from './layouts/frontend/FrontendLayout';

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


          <Route path='/403'
            name='Page403'
            element={<Page403 />}
          />
          <Route path='/404'
            name='Page404'
            element={<Page404 />}
          />


          <Route element={<FrontendLayout />}>
            <Route index
              name='Home'
              element={<Home />}
            />

            {/* if user is authenticated, redirect from login and register to home till they logout */}
            <Route path='/login'
              name='Login'
              element={!getAuth() ? <Login /> : <Navigate to='/' />}
            />
            <Route path='/register'
              name='Register'
              element={!getAuth() ? <Register /> : <Navigate to='/' />}
            />

          </Route>

          {/* protected route by admin role check */}
          <Route path='/admin' element={<PrivateAdminRoute />}>

            {/* wrapper for AdminLayout (check there for outlet placement) */}
            <Route element={<AdminLayout />}>

              {/* routes that should render inside outlet */}
              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/users" element={<Users />} />

            </Route>
            <Route path="/admin/*" element={<Page404 />} />

          </Route>

          <Route path='/*'
            name='Page404'
            element={<Page404 />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
