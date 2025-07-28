const express = require('express');
const router = express.Router();

const { login, register, getManagers } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/managers', getManagers)

module.exports = router;
