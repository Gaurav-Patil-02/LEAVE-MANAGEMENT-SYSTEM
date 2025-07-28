import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import Modal from '../components/Modal';
import '../styles/GlobalTable.css';
import Toast from '../components/Toast';

const PendingRequest = () => {
  const { user } = useContext(AuthContext);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [actionType, setActionType] = useState('');
  const [managerComment, setManagerComment] = useState('');

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchPendingLeaves = async () => {
      try {
        
        const res = await api.get(`/leaves/pending`, {
  headers: {
    Authorization: `Bearer ${user.token}`
  }
});
        setPendingLeaves(res.data);
      } catch (err) {
        console.error('Error fetching pending leaves:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingLeaves();
  }, [user]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }).replace(' ', '-');
  };

  const handleDecision = (id, action) => {
    setSelectedLeaveId(id);
    setActionType(action);
  };

  const submitComment = async () => {
    if (!managerComment.trim()) {
      setToast({ show: true, message: 'Comment is required.', type: 'error' });
      return;
    }

    try {
      await api.put(`/leaves/${selectedLeaveId}/${actionType}`, {
        manager_comment: managerComment.trim(),
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }, 
      } 
    );

      setPendingLeaves((prev) =>
        prev.filter((leave) => leave.id !== selectedLeaveId)
      );

      setToast({
        show: true,
        message: `Leave ${actionType}ed successfully.`,
        type: 'success',
      });
    } catch (err) {
      console.error(`Failed to ${actionType} leave`, err);
      setToast({
        show: true,
        message: `Failed to ${actionType} leave.`,
        type: 'error',
      });
    } finally {
      setSelectedLeaveId(null);
      setActionType('');
      setManagerComment('');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leave-container">
      <h3>Pending Leave Requests</h3>

      {pendingLeaves.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <div className="leave-table">
          <div className="leave-table-header">
            <div>Employee Name</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Reason</div>
            <div>Actions</div>
          </div>

          {pendingLeaves.map((leave) => (
            <div className="leave-table-row" key={leave.id}>
              <div>{leave.employee_name}</div>
              <div>{formatDate(leave.start_date)}</div>
              <div>{formatDate(leave.end_date)}</div>
              <div>{leave.reason}</div>
              <div>
                <button
                  className="btn approve-btn"
                  onClick={() => handleDecision(leave.id, 'approve')}
                >
                  Approve
                </button>
                <button
                  className="btn reject-btn"
                  onClick={() => handleDecision(leave.id, 'reject')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLeaveId && (
        <Modal
          onClose={() => {
            setSelectedLeaveId(null);
            setActionType('');
            setManagerComment('');
          }}
        >
          <h3>Enter Comment</h3>
          <textarea
            value={managerComment}
            onChange={(e) => setManagerComment(e.target.value)}
            rows="5"
            placeholder="Type your comment..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              resize: 'none',
              marginTop: '10px',
            }}
          />
          <div style={{ marginTop: '15px', textAlign: 'right' }}>
            <button
              className="btn submit-btn"
              style={{ marginLeft: '10px' }}
              onClick={submitComment}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default PendingRequest;
