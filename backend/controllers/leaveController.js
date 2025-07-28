const db = require("../config/db");

exports.submitLeave = async (req, res) => {
  try {
    const { leave_type, start_date, end_date, reason } = req.body;
    const user_id = req.user?.id;

    if (!user_id) return res.status(401).json({ message: "Unauthorized" });

    await db.query(
      `INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, 'pending')`,
      [user_id, leave_type, start_date, end_date, reason]
    );

    res.status(201).json({ message: "Leave request submitted" });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ message: "Submission failed" });
  }
};

exports.getPendingLeaves = async (req, res) => {
  const managerId = req.user?.id;
  try {
    const [results] = await db.query(
      `SELECT lr.*, u.name AS employee_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE lr.status = 'pending' AND u.manager_id = ?`,
      [managerId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.approveLeave = async (req, res) => {
  const leaveId = req.params.id;
  const { manager_comment } = req.body;

  try {
    const [[leave]] = await db.query(`SELECT * FROM leave_requests WHERE id = ?`, [leaveId]);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    const days = Math.ceil((new Date(leave.end_date) - new Date(leave.start_date)) / (1000 * 60 * 60 * 24)) + 1;
    const column = leave.leave_type.toLowerCase() + "_days";

    await db.query(
      `UPDATE leave_balances SET ${column} = GREATEST(${column} - ?, 0) WHERE user_id = ?`,
      [days, leave.user_id]
    );

    await db.query(
      `UPDATE leave_requests SET status = 'approved', manager_comment = ? WHERE id = ?`,
      [manager_comment || "", leaveId]
    );

    res.json({ message: "Leave approved", days_deducted: days });
  } catch (err) {
    console.error("Approve error:", err);
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.rejectLeave = async (req, res) => {
  const leaveId = req.params.id;
  const { manager_comment } = req.body;

  try {
    await db.query(
      `UPDATE leave_requests SET status = 'rejected', manager_comment = ? WHERE id = ?`,
      [manager_comment || "", leaveId]
    );
    res.json({ message: "Leave rejected" });
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const userId = req.user?.id;
    const [results] = await db.query("SELECT * FROM leave_requests WHERE user_id = ?", [userId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.getAllLeaves = async (req, res) => {
  const managerId = req.user?.id;
  try {
    const [results] = await db.query(
      `SELECT lr.*, u.name AS employee_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE u.manager_id = ?
       ORDER BY lr.start_date DESC`,
      [managerId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.getLeaveBalance = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT vacation_days, sick_days, casual_days, maternity_days FROM leave_balances WHERE user_id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "No balance found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getEmployeesCurrentlyOnLeave = async (req, res) => {
  const managerId = req.user?.id;
  try {
    const [results] = await db.query(
      `SELECT lr.*, u.name AS employee_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE lr.status = 'approved'
       AND CURDATE() BETWEEN lr.start_date AND lr.end_date
       AND u.manager_id = ?`,
      [managerId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err });
  }
};

exports.getLeaveCalendar = async (req, res) => {
  const managerId = req.user?.id;
  try {
    const [results] = await db.query(
      `SELECT u.name, lr.leave_type, lr.start_date, lr.end_date
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE lr.status = 'approved'
       AND u.manager_id = ?`,
      [managerId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
