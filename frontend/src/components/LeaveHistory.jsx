import { useEffect, useState, useContext } from 'react';
import api from '../api';
import '../styles/GlobalTable.css';
import { AuthContext } from '../context/AuthContext';

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchLeaves = async () => {
      try {
        const res = await api.get(`/leaves/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setLeaves(res.data);
      } catch (err) {
        console.error('Failed to fetch leave history:', err);
      }
    };

    fetchLeaves();
  }, [user]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }).replace(' ', '-');
  };

  return (
    <div className="leave-container">
      <h3>Leave History</h3>
      {leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <div className="leave-table">
          <div className="leave-table-header">
            <div>Type</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Reason</div>
            <div>Status</div>
            <div>Manager Comment</div>
          </div>

          {leaves.map((leave) => (
            <div className="leave-table-row" key={leave.id}>
              <div>{leave.leave_type}</div>
              <div>{formatDate(leave.start_date)}</div>
              <div>{formatDate(leave.end_date)}</div>
              <div>{leave.reason}</div>
              <div className={`status-${(leave.status || 'pending').toLowerCase()}`}>
                {leave.status || 'Pending'}
              </div>
              <div>{leave.manager_comment || '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;
