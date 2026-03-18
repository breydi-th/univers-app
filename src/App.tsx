import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Courses from './pages/Courses';
import Results from './pages/Results';
import Profile from './pages/Profile';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminAccountCreation from './pages/AdminAccountCreation';
import AdminStudents from './pages/AdminStudents';
import AdminTeachers from './pages/AdminTeachers';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-accounts" element={<AdminAccountCreation />} />
        <Route path="/admin-students" element={<AdminStudents />} />
        <Route path="/admin-teachers" element={<AdminTeachers />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
