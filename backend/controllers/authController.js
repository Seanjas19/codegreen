const User = require('../models/User');

// POST /auth/register
async function registerUser(req, res, next) {
  try {
    const { uid, email, name } = req.body;

    if (!uid || !email) {
      return res.status(400).json({
        success: false,
        error: 'uid and email are required',
      });
    }

    const user = await User.findOrCreate(uid, email, name);

    res.status(201).json({
      success: true,
      data: {
        uid: user.uid,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /auth/user
async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user.uid;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        analysisCount: user.analysisCount,
        averageScore: user.averageScore,
      },
    });
  } catch (error) {
    next(error);
  }
}

// PUT /auth/user
async function updateUser(req, res, next) {
  try {
    const userId = req.user.uid;
    const { name, profileImage } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    if (name) user.name = name;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  getCurrentUser,
  updateUser,
};
