import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const UserMeeting = lazy(() => import('./pages/user.meeting'));
const Game = lazy(() => import('./pages/tic.tac.toe'));
const TodoApp = lazy(() => import('./pages/todo.app'));
const FxDashboard = lazy(() => import('./pages/fx.dashboard'));

const withSuspence = (LazyComponent) => <Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/meetings" element={withSuspence(Home)} />
      <Route exact path="/" element={withSuspence(Home)} />
      <Route exact path="/new-meeting" element={withSuspence(UserMeeting)} />
      <Route exact path="/dashboard" element={withSuspence(FxDashboard)} />
      <Route exact path="/game" element={withSuspence(Game)} />
      <Route exact path="/todo" element={withSuspence(TodoApp)} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
