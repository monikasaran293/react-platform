import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FxDashboard from './pages/fx.dashboard';
import Home from './pages/home';
import UserMeeting from './pages/user.meeting';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/meetings" element={<Home />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/new-meeting" element={<UserMeeting />} />
      <Route path="/dashboard" element={<FxDashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
