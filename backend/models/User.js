const { db } = require('../utils/firebaseInit');

class User {
  constructor(data = {}) {
    this.uid = data.uid;
    this.email = data.email;
    this.name = data.name || '';
    this.profileImage = data.profileImage || '';
    this.analysisCount = data.analysisCount || 0;
    this.averageScore = data.averageScore || 0;
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    try {
      await db.collection('users').doc(this.uid).set({
        email: this.email,
        name: this.name,
        profileImage: this.profileImage,
        analysisCount: this.analysisCount,
        averageScore: this.averageScore,
        createdAt: this.createdAt,
        updatedAt: new Date(),
      });
      return this.uid;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  static async findById(uid) {
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (!doc.exists) {
        return null;
      }
      return new User({
        uid: doc.id,
        ...doc.data(),
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  static async findOrCreate(uid, email, name = '') {
    try {
      let user = await User.findById(uid);
      if (!user) {
        user = new User({
          uid,
          email,
          name,
          createdAt: new Date(),
        });
        await user.save();
      }
      return user;
    } catch (error) {
      console.error('Error finding or creating user:', error);
      throw error;
    }
  }

  async updateAverageScore() {
    try {
      const snapshot = await db.collection('analyses').doc(this.uid).collection('history').get();
      const analyses = snapshot.docs.map((doc) => doc.data());

      if (analyses.length === 0) {
        this.averageScore = 0;
      } else {
        const totalScore = analyses.reduce((sum, analysis) => sum + analysis.energyScore, 0);
        this.averageScore = Math.round((totalScore / analyses.length) * 10) / 10;
      }

      await db.collection('users').doc(this.uid).update({
        averageScore: this.averageScore,
      });

      return this.averageScore;
    } catch (error) {
      console.error('Error updating average score:', error);
      throw error;
    }
  }
}

module.exports = User;
