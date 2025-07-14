const express = require('express');
const router = express.Router();
const { authRateLimiter } = require('../middleware/rateLimiter');
const protect = require('../middleware/authMiddleware');


const { register, login , updateProfile} = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authRateLimiter,register);

// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
router.post('/login',authRateLimiter, login);
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.json({ message: 'Logged out successfully' });
});
router.get('/me', protect, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});
router.put('/update', protect, updateProfile);
module.exports = router;
