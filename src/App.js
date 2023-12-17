import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homePage';
import TestPage from './pages/test';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchLeague from './pages/searchLeague';
import CreateLeague from './pages/createLeague';
import CreateTeam from './pages/createTeam';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createLeague" element={<CreateLeague />} />
          <Route path="/createTeam" element={<CreateTeam />} />
          <Route path="/searchLeague" element={<SearchLeague />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
