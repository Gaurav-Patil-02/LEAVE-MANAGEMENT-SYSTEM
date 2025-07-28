import { useEffect, useState, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../styles/DashboardLayout.css';
import LeaveBalance from '../components/LeaveBalance';
import Modal from '../components/Modal';
import LeaveForm from '../components/LeaveForm';
import { AuthContext } from '../context/AuthContext';
import {
  FaSignOutAlt,
  FaCalendarAlt,
  FaHistory,
  FaRegPaperPlane,
  FaFileAlt,
} from 'react-icons/fa';

const EmployeeLayout = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'employee') {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const refresh = () => {
    setUser({ ...user });
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
  
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>HYSCALER</h2>
        </div>
        <nav className="menu">
          <a className="menu-item" onClick={() => setShowForm(true)}>
            <FaFileAlt className="menu-icon" /> Apply Leave
          </a>
          <Link className="menu-item" to="/employee">
            <FaRegPaperPlane className="menu-icon" /> Ongoing Leaves
          </Link>
          <Link className="menu-item" to="/employee/leave-history">
            <FaHistory className="menu-icon" /> Leave History
          </Link>
          <div className="menu-item" onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt className="menu-icon" /> Logout
          </div>
        </nav>
      </aside>

   
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Leave Management System</h1>
          <button className="apply-btn" onClick={() => setShowForm(true)}>
            Apply Leave
          </button>
        </header>

        <section className="leave-balance-section">
          <LeaveBalance />
        </section>

        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <LeaveForm
              userId={user.id}
              onRequestSubmitted={() => {
                refresh();
                setShowForm(false);
                setShowSuccess(true);
              }}
            />
          </Modal>
        )}

        {showSuccess && (
          <Modal onClose={() => setShowSuccess(false)}>
            <div className="modal-success">
              <h2>Leave Applied</h2>
              <p>We will let you know when your leave is approved</p>
              <button onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </Modal>
        )}

        {showLogoutConfirm && (
          <Modal onClose={() => setShowLogoutConfirm(false)}>
            <div className="modal-logout">
              <h2>Are you sure you want to logout?</h2>
              <div className="modal-logout-buttons">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="logout-btn"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="logout-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}

        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default EmployeeLayout;
