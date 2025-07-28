import { useEffect, useState, useContext} from 'react';
import api from '../api';
import '../styles/GlobalTable.css';
import { AuthContext } from '../context/AuthContext';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short'
  });
};

const EmployeesOnLeave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const{user} = useContext(AuthContext)

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const res = await api.get('/leaves/on-leave', {
          headers: {
    Authorization: `Bearer ${user.token}`
  } 
        });
        setLeaveData(res.data);
      } catch (err) {
        console.error('Error fetching leave data:', err);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <div className="leave-container">
      <h3>Employees Currently on Leave</h3>
      <div className="leave-table">
        <div className="leave-table-header">
            <div>Employee Name</div>
            <div>Leave Type</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Reason</div>
          </div>

          {leaveData.map((leave, idx) => (
          
            <div className="leave-table-row" key={idx}>
              <div>{leave.employee_name}</div>
              <div>{leave.leave_type}</div>
              <div>{formatDate(leave.start_date)}</div>
              <div>{formatDate(leave.end_date)}</div>
              <div>{leave.reason}</div>
            </div>
           
          ))}
      </div>
    </div>
  );
};

export default EmployeesOnLeave;
