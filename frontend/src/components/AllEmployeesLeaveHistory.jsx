import { useEffect, useState, useContext } from "react";
import api from "../api"; 
import "../styles/GlobalTable.css"; 
import { AuthContext } from "../context/AuthContext";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

const AllEmployeesLeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const res = await api.get("/leaves/all", {
          headers : {
            Authorization : `Bearer ${user.token}`
          }
        });
        const data = res.data;

        if (Array.isArray(data)) {
          setLeaveHistory(data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Failed to fetch leave history:", err);
        setError(err.response?.data?.message || err.message || "Error fetching leave history");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  if (loading) return <p>Loading leave history...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="leave-container">
    <h3>Leave History of Managed Employees</h3>
      {leaveHistory.length === 0 ? (
        <p>No leave history found.</p>
      ) : (
        <div className="leave-table">
          <div className="leave-table-header">
            <div>Employee</div>
            <div>Type</div>
            <div>From</div>
            <div>To</div>
            <div>Status</div>
            <div>Manager Comment</div>
          </div>

          {leaveHistory.map((leave) => (
            <div key={leave.id} className="leave-table-row">
              <div>
                {leave.employee_name}
              </div>
              <div>{leave.leave_type}</div>
              <div>{formatDate(leave.start_date)}</div>
              <div>{formatDate(leave.end_date)}</div>
              <div>
                <span className={`status-${leave.status}`}>
                  {leave.status}
                </span>
              </div>
              <div>{leave.manager_comment || "-"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeesLeaveHistory;
