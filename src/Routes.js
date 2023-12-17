// routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import TestPage from './pages/test';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchLeague from './pages/searchLeague';
import CreateLeague from './pages/createLeague';
import CreateTeam from './pages/createTeam';
import LeagueDetailPage from './pages/leagueInfo/leagueInfo-layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createLeague" element={<CreateLeague />} />
      <Route path="/createTeam" element={<CreateTeam />} />
      <Route path="/searchLeague" element={<SearchLeague />} />
      <Route path="/league/:leagueId" element={<LeagueDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
