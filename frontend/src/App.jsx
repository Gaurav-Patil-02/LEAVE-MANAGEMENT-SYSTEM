import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandinPage';

import ManagerLayout from './layouts/ManagerLayout';
import LeaveCalendar from './components/LeaveCalendar';
import EmployeesOnLeave from './components/EmployeesOnLeave';
import AllEmployeesLeaveHistory from './components/AllEmployeesLeaveHistory';
import PendingRequest from './components/PendingRequest';

import EmployeeLayout from './layouts/EmployeeLayout';
import OngoingLeaves from './components/OngoingLeaves';
import LeaveHistory from './components/LeaveHistory';

function App() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Manager Routes */}
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<PendingRequest />} />
        <Route path="on-leave" element={<EmployeesOnLeave />} />
        <Route path="request-history" element={<AllEmployeesLeaveHistory />} />
        <Route path="calendar" element={<LeaveCalendar />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<OngoingLeaves />} />
        <Route path="leave-history" element={<LeaveHistory />} />
      </Route>

      {/* Fallback Route */}
      <Route
        path="*"
        element={<h2 style={{ textAlign: 'center', padding: '2rem' }}>404 - Page Not Found</h2>}
      />
    </Routes>
  );
}

export default App;
