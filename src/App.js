import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

import axios from 'axios';


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
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path='/' name='Home' render={(props) => <Home {...props} />} element={<Home />} />

          <Route path='/admin/*' name='Admin' render={(props) => <MasterLayout {...props} />} element={<MasterLayout />} />

          <Route path='/login' name='Login' render={(props) => <Login {...props} />} element={<Login />} />
          <Route path='/register' name='Register' render={(props) => <Register {...props} />} element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
