import { useContext, useEffect, useState } from 'react';
import api from '../api';
import '../styles/LeaveBalance.css';

import { FaUmbrellaBeach, FaHeartbeat, FaUserClock, FaBaby } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const LeaveBalance = () => {
  const [balance, setBalance] = useState({
    vacation: 0,
    sick: 0,
    casual: 0,
    maternity: 0,
  });
  
  const {user} = useContext(AuthContext)

  useEffect(() => {
    if (!user) return;

    const fetchBalance = async () => {
      try {
        const res = await api.get(`/leaves/balance/${user.id}`, {
  headers: {
    Authorization: `Bearer ${user.token}`
  }
});
        
        setBalance({
          vacation: res.data.vacation_days || 0,
          sick: res.data.sick_days || 0,
          casual: res.data.casual_days || 0,
          maternity: res.data.maternity_days || 0,
        });
      } catch (err) {
        console.error('Failed to fetch leave balance:', err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="leave-balance-card-container">
      <div className="leave-card vacation-leave">
        <div className="leave-icon">
          <FaUmbrellaBeach />
        </div>
        <div className="leave-info">
          <h3>Vacation Leave</h3>
          <p>{balance.vacation} Days</p>
        </div>
      </div>

      <div className="leave-card sick-leave">
        <div className="leave-icon">
          <FaHeartbeat />
        </div>
        <div className="leave-info">
          <h3>Sick Leave</h3>
          <p>{balance.sick} Days</p>
        </div>
      </div>

      <div className="leave-card casual-leave">
        <div className="leave-icon">
          <FaUserClock />
        </div>
        <div className="leave-info">
          <h3>Casual Leave</h3>
          <p>{balance.casual} Days</p>
        </div>
      </div>

      <div className="leave-card maternity-leave">
        <div className="leave-icon">
          <FaBaby />
        </div>
        <div className="leave-info">
          <h3>Maternity / Paternity</h3>
          <p>{balance.maternity} Days</p>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;
