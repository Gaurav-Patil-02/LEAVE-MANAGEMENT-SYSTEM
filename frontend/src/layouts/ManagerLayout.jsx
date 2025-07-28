import { useEffect, useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../styles/DashboardLayout.css'; 
import Modal from '../components/Modal';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaHistory, FaUsers, FaSignOutAlt, FaUserClock } from 'react-icons/fa'; 

const ManagerLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'manager') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>HYSCALER</h2>
        </div>
        <nav className="menu">
          <Link className="menu-item" to="/manager">
            <FaUsers className="menu-icon" /> Pending Requests
          </Link>
          <Link className="menu-item" to="/manager/request-history">
            <FaHistory className="menu-icon" /> Request History
          </Link>
          <Link className="menu-item" to="/manager/on-leave">
            <FaUserClock className="menu-icon" /> Employees On Leave
          </Link>
          <Link className="menu-item" to="/manager/calendar">
            <FaCalendarAlt className="menu-icon" /> Calendar
          </Link>
          <a className="menu-item" onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt className="menu-icon" /> Logout
          </a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Manager Dashboard</h1>
        </header>
        <section className="outlet-section">
          <Outlet />
        </section>
      </main>

      {showLogoutConfirm && (
        <Modal onClose={() => setShowLogoutConfirm(false)}>
          <div className='modal-logout'>
            <h2>Are you sure you want to logout?</h2>
            <div className='modal-logout-buttons'>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className='logout-btn'
              >
                Yes, Logout
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className='logout-btn'>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerLayout;
