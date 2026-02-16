// Centralized error handler middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  // Gemini API errors
  if (err.message.includes('Code optimization failed')) {
    return res.status(503).json({
      error: 'Code optimization service temporarily unavailable',
      message: err.message,
    });
  }

  // Validation errors
  if (err.message.includes('must be')) {
    return res.status(400).json({
      error: 'Invalid input',
      message: err.message,
    });
  }

  // Firebase errors
  if (err.code === 'auth/invalid-id-token') {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid token',
    });
  }

  // Firestore errors
  if (err.code?.startsWith('firestore/')) {
    return res.status(500).json({
      error: 'Database error',
      message: 'An error occurred while accessing the database',
    });
  }

  // Default error
  return res.status(err.statusCode || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
}

module.exports = { errorHandler };
