const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Only logged-in users can update their profile
router.put('/update', authMiddleware, updateProfile);

module.exports = router;