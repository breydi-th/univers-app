import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Courses from './pages/Courses';
import Results from './pages/Results';
import Profile from './pages/Profile';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/TeacherCourses.tsx';
import TeacherAssignments from './pages/TeacherAssignments';
import AdminDashboard from './pages/AdminDashboard';
import AdminAccountCreation from './pages/AdminAccountCreation';
import AdminStudents from './pages/AdminStudents';
import AdminTeachers from './pages/AdminTeachers';
import AdminClasses from './pages/AdminClasses';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import TeacherClasses from './pages/TeacherClasses';
import Messages from './pages/Messages';

import AdminSchoolSettings from './pages/AdminSchoolSettings';
import AdminAcademicSettings from './pages/AdminAcademicSettings';
import AdminSecuritySettings from './pages/AdminSecuritySettings';
import AdminNotificationSettings from './pages/AdminNotificationSettings';
import AdminNotifications from './pages/AdminNotifications';
import AdminProfile from './pages/AdminProfile';

export default function App() {
  // Initialize theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('app-theme') || 'dark';
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/teacher-assignments" element={<TeacherAssignments />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-accounts" element={<AdminAccountCreation />} />
        <Route path="/admin-students" element={<AdminStudents />} />
        <Route path="/admin-teachers" element={<AdminTeachers />} />
        <Route path="/admin-classes" element={<AdminClasses />} />
        <Route path="/admin-reports" element={<AdminReports />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/admin-settings/school" element={<AdminSchoolSettings />} />
        <Route path="/admin-settings/academic" element={<AdminAcademicSettings />} />
        <Route path="/admin-settings/security" element={<AdminSecuritySettings />} />
        <Route path="/admin-settings/notifications" element={<AdminNotificationSettings />} />
        <Route path="/admin-notifications" element={<AdminNotifications />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/teacher-classes" element={<TeacherClasses />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
