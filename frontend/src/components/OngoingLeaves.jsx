import { useEffect, useState, useContext } from 'react';
import api from '../api';
import '../styles/GlobalTable.css';
import { AuthContext } from '../context/AuthContext';

const OngoingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyLeaves = async () => {
      try {
        const res = await api.get(`/leaves/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setLeaves(res.data);
      } catch (err) {
        console.error('Failed to fetch leave history:', err);
        setError("Failed to load leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyLeaves();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }).replace(' ', '-');
  };

  const filteredLeaves = leaves.filter((leave) => {
    const start = new Date(leave.start_date);
    const end = new Date(leave.end_date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return leave.status?.toLowerCase() === 'approved' && start <= today && end >= today;
  });

  return (
    <div className="leave-container">
      <h3>My Ongoing Leaves</h3>
      {loading && <p>Loading your leave requests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredLeaves.length === 0 && <p>No ongoing leaves at the moment.</p>}
      {!loading && !error && filteredLeaves.length > 0 && (
        <div className="leave-table">
          <div className="leave-table-header">
            <div>Type</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Reason</div>
            <div>Status</div>
            <div>Manager Comment</div>
          </div>

          {filteredLeaves.map((leave) => (
            <div className="leave-table-row" key={leave.id}>
              <div>{leave.leave_type}</div>
              <div>{formatDate(leave.start_date)}</div>
              <div>{formatDate(leave.end_date)}</div>
              <div>{leave.reason}</div>
              <div className="status-approved">Ongoing</div>
              <div>{leave.manager_comment || '-'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingLeaves;
