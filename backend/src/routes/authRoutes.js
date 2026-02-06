const express = require('express');
const router = express.Router();

// 1. Import the functions from the controller
const { register, login } = require('../controllers/authController');

// 2. Import the security guard (middleware)
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * PUBLIC ROUTES
 * Anyone can access these to create an account or sign in.
 */

// Path: http://localhost:8000/api/auth/register
router.post('/register', register);

// Path: http://localhost:8000/api/auth/login
router.post('/login', login);

/**
 * PROTECTED ROUTES
 * Only users with a valid JWT Token can access these.
 */

// Path: http://localhost:8000/api/auth/profile
// Notice how 'authMiddleware' sits in the middle to check the token first
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ 
    message: "Welcome to your private profile!", 
    userId: req.user.userId 
  });
});

module.exports = router;