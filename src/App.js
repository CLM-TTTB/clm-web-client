import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homePage';
import TestPage from './pages/test';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchLeague from './pages/searchLeague';
import CreateLeague from './pages/createLeague';
import CreateTeam from './pages/createTeam';
import GlobalNavigate from './components/globalNavigate';
import ProfileSettings from './pages/profileSettings';

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalNavigate>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/createLeague" element={<CreateLeague />} />
            <Route path="/createTeam" element={<CreateTeam />} />
            <Route path="/searchLeague" element={<SearchLeague />} />
            <Route path="/profileSettings" element={<ProfileSettings />} />
          </Routes>
        </GlobalNavigate>
      </Router>
    </div>
  );
}

export default App;
