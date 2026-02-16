const express = require('express');
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const {
  registerUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/authController');

const router = express.Router();

// Public route
router.post('/register', registerUser);

// Protected routes (require authentication)
router.get('/user', verifyFirebaseToken, getCurrentUser);
router.put('/user', verifyFirebaseToken, updateUser);

module.exports = router;
