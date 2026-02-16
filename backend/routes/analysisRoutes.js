const express = require('express');
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const {
  analyzeCode,
  getUserHistory,
  getAnalysisById,
  getPublicResult,
  deleteAnalysis,
} = require('../controllers/analysisController');

const router = express.Router();

// Protected routes (require authentication)
router.post('/analyze', verifyFirebaseToken, analyzeCode);
router.get('/history', verifyFirebaseToken, getUserHistory);
router.get('/results/:id', verifyFirebaseToken, getAnalysisById);
router.post('/results/:id/delete', verifyFirebaseToken, deleteAnalysis);

// Public routes (no authentication required)
router.get('/results/:id/share', getPublicResult);

module.exports = router;
