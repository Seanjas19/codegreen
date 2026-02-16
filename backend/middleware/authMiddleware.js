const { auth } = require('../utils/firebaseInit');

async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid authorization token' });
  }
}

async function verifyOptionalAuth(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (token) {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
    } catch (error) {
      console.warn('Optional token verification failed:', error.message);
    }
  }

  next();
}

module.exports = { verifyFirebaseToken, verifyOptionalAuth };
