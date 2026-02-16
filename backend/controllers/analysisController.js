const Analysis = require('../models/Analysis');
const User = require('../models/User');
const { optimizeCodeWithGemini, calculateEnergyScore } = require('../utils/geminiOptimizer');
const { validateCode, sanitizeCode } = require('../utils/codeValidator');

// POST /api/analyze
async function analyzeCode(req, res, next) {
  try {
    const { code, language = 'javascript' } = req.body;
    const userId = req.user.uid;

    // Validate input
    validateCode(code);
    const sanitizedCode = sanitizeCode(code);

    // Call Gemini API to optimize code
    const { optimizedCode, improvements, estimatedReduction } = await optimizeCodeWithGemini(
      sanitizedCode,
      language
    );

    // Calculate energy score
    const energyScore = calculateEnergyScore(estimatedReduction, improvements.length);

    // Create and save analysis
    const analysis = new Analysis({
      userId,
      originalCode: sanitizedCode,
      optimizedCode,
      language,
      energyScore,
      improvements,
      estimatedReduction,
      timestamp: new Date(),
    });

    const analysisId = await analysis.save();

    // Update user's average score
    const user = await User.findById(userId);
    if (user) {
      await user.updateAverageScore();
    }

    res.status(201).json({
      success: true,
      data: {
        id: analysisId,
        originalCode: sanitizedCode,
        optimizedCode,
        language,
        energyScore,
        improvements,
        estimatedReduction,
        timestamp: analysis.timestamp,
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/history
async function getUserHistory(req, res, next) {
  try {
    const userId = req.user.uid;
    const limit = parseInt(req.query.limit, 10) || 10;

    const analyses = await Analysis.findByUserId(userId, limit);

    res.status(200).json({
      success: true,
      data: analyses.map((analysis) => ({
        id: analysis.id,
        originalCode: analysis.originalCode.substring(0, 100) + '...', // Preview only
        energyScore: analysis.energyScore,
        improvements: analysis.improvements,
        estimatedReduction: analysis.estimatedReduction,
        language: analysis.language,
        timestamp: analysis.timestamp,
      })),
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/results/:id
async function getAnalysisById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const analysis = await Analysis.findById(userId, id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: analysis.id,
        originalCode: analysis.originalCode,
        optimizedCode: analysis.optimizedCode,
        energyScore: analysis.energyScore,
        improvements: analysis.improvements,
        estimatedReduction: analysis.estimatedReduction,
        language: analysis.language,
        timestamp: analysis.timestamp,
        shareToken: analysis.shareToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/results/:id/share (public endpoint)
async function getPublicResult(req, res, next) {
  try {
    const { id } = req.params;
    const { token } = req.query;

    const analysis = await Analysis.findById(id, token);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Shared analysis not found',
      });
    }

    // Verify share token matches
    if (analysis.shareToken !== token) {
      return res.status(403).json({
        success: false,
        error: 'Invalid share token',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        originalCode: analysis.originalCode,
        optimizedCode: analysis.optimizedCode,
        energyScore: analysis.energyScore,
        improvements: analysis.improvements,
        estimatedReduction: analysis.estimatedReduction,
        language: analysis.language,
        timestamp: analysis.timestamp,
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/results/:id/delete
async function deleteAnalysis(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    const analysis = await Analysis.findById(userId, id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found',
      });
    }

    await analysis.delete();

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeCode,
  getUserHistory,
  getAnalysisById,
  getPublicResult,
  deleteAnalysis,
};
