import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import UserMeeting from './pages/user.meeting';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/meetings" element={<Home />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/new-meeting" element={<UserMeeting />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
