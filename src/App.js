import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';

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
