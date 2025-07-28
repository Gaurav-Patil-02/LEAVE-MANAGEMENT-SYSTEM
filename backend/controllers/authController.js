const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};


exports.register = async (req, res) => {
  const { name, email, password, role, manager_id } = req.body;  
    try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password, role, manager_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'employee', manager_id || null]
    );

    await db.query(
      'INSERT INTO leave_balances (user_id, vacation_days, sick_days, casual_days, maternity_days) VALUES (LAST_INSERT_ID(), 20, 10, 10, 20)'
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
exports.getManagers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name FROM users WHERE role = 'manager'");
    console.log(rows)
    res.json(rows );
  } catch (err) {
    console.error('Failed to get managers:', err);
    res.status(500).json({ message: 'Error fetching managers' });
  }
};


