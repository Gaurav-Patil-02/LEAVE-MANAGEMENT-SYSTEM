import { useState, useEffect, useContext } from "react";
import api from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/LeaveForm.css";
import { AuthContext } from "../context/AuthContext";

const LeaveForm = ({ userId, onRequestSubmitted }) => {
  const [form, setForm] = useState({
    leave_type: "sick",
    start_date: null,
    end_date: null,
    reason: "",
  });

  const [balance, setBalance] = useState({
    vacation: 0,
    sick: 0,
    casual: 0,
    maternity: 0,
  });
  const { user } = useContext(AuthContext);

  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get(`/leaves/balance/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setBalance({
          vacation: res.data.vacation_days,
          sick: res.data.sick_days,
          casual: res.data.casual_days || 0,
          maternity: res.data.maternity_days || 0,
        });
      } catch (err) {
        console.error("Failed to fetch balance:", err);
      }
    };

    fetchBalance();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.start_date || !form.end_date) {
    setWarning("Please select both start and end dates.");
    return;
  }

  const start = new Date(form.start_date);
  const end = new Date(form.end_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    setWarning("Start date cannot be in the past.");
    return;
  }

  if (end < start) {
    setWarning("End date cannot be before start date.");
    return;
  }
  try {
    await api.post(
      "/leaves/submit",
      {
        ...form,
        user_id: userId,
        start_date: form.start_date.toISOString().split("T")[0],
        end_date: form.end_date.toISOString().split("T")[0],
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setForm({
      leave_type: "sick",
      start_date: null,
      end_date: null,
      reason: "",
    });

    onRequestSubmitted();
  } catch (err) {
    console.error("Submit error:", err.response?.data || err.message);
    setWarning(`Error: ${err.response?.data?.message || err.message}`);
  }
};


  return (
    <div className="form-container">
      {warning && (
        <div className="popup-backdrop">
          <div className="popup-box">
            <h4>{warning}</h4>
            <button onClick={() => setWarning("")}>OK</button>
          </div>
        </div>
      )}

      <form className="styled-form" onSubmit={handleSubmit}>
        <h2>Apply Leave</h2>

        <label>Leave Type</label>
        <select
          name="leave_type"
          value={form.leave_type}
          onChange={handleChange}
          required
        >
          <option value="sick">Sick Leave</option>
          <option value="vacation">Vacation</option>
          <option value="casual">Casual Leave</option>
          <option value="maternity">Maternity / Paternity Leave</option>
        </select>

        <p className="balance-text">
          Available: {balance[form.leave_type] ?? 0} day(s)
        </p>

        <div className="date-pickers">
          <div>
            <label>From</label>
            <DatePicker
              selected={form.start_date}
              onChange={(date) => setForm({ ...form, start_date: date })}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select start date"
              required
            />
          </div>

          <div>
            <label>To</label>
            <DatePicker
              selected={form.end_date}
              onChange={(date) => setForm({ ...form, end_date: date })}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select end date"
              required
            />
          </div>
        </div>

        <label>Leave Reason</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          maxLength={500}
          placeholder="e.g. Feeling sick due to cold & cough"
          required
        />

        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
};

export default LeaveForm;
