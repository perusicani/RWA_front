import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path='/' name='Home' render={(props) => <Home {...props} />} element={<Home />} />
          <Route path='/admin/*' name='Admin' render={(props) => <MasterLayout {...props} />} element={<MasterLayout />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
