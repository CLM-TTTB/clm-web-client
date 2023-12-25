// routes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import TestPage from './pages/test';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchLeague from './pages/searchLeague';
import CreateLeague from './pages/createLeague';
import CreateTeam from './components/leagueInfoTabs/opening/enroll/createTeam';
import LeagueDetailPage from './pages/leagueInfo/leagueInfo-layout';
import VerificationConfirm from './pages/verificationConfirm';
import RequireAuth from './components/requireAuth';
import PersistLogin from './components/persistLogin';
import TeamInfo from './pages/teamInfo/teamInfo';
import MyLeagues from './pages/myLeagues';
import ProfileSettings from './pages/profileSettings';
import Guide from './pages/guide';
import CreateTeamTemplate from './pages/myTemplates';
import AboutUs from './pages/aboutUs';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/searchLeague" element={<SearchLeague />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      {/* <<<<<<< HEAD */}
      <Route path="/verificationConfirm" element={<VerificationConfirm />} />
      <Route element={<PersistLogin />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<RequireAuth />}>
          <Route path="/createLeague" element={<CreateLeague />} />
          <Route path="/createTeam" element={<CreateTeam />} />
          <Route path="/league/:leagueId" element={<LeagueDetailPage />} />
          <Route path="/teamInfo/:teamId" element={<TeamInfo />} />
          <Route path="/myLeagues" element={<MyLeagues />} />
          <Route path="/profileSettings" element={<ProfileSettings />} />
          <Route path="/myTemplates" element={<CreateTeamTemplate />} />
        </Route>
      </Route>
      {/* =======
      <Route path="/createLeague" element={<CreateLeague />} />
      <Route path="/createTeam" element={<CreateTeam />} />
      <Route path="/searchLeague" element={<SearchLeague />} />
      <Route path="/league/:leagueId" element={<LeagueDetailPage />} />
>>>>>>> dev */}
    </Routes>
  );
};

export default AppRoutes;
