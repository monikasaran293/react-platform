import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FxDashboard from './pages/fx.dashboard';
import Home from './pages/home';
import UserMeeting from './pages/user.meeting';
import Game from './pages/tic.tac.toe'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/meetings" element={<Home />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/new-meeting" element={<UserMeeting />} />
      <Route exact path="/dashboard" element={<FxDashboard />} />
      <Route exact path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
