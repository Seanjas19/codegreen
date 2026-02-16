const { db } = require('../utils/firebaseInit');

class Analysis {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId;
    this.originalCode = data.originalCode;
    this.optimizedCode = data.optimizedCode;
    this.language = data.language || 'javascript';
    this.energyScore = data.energyScore || 0;
    this.improvements = data.improvements || [];
    this.estimatedReduction = data.estimatedReduction || 0;
    this.timestamp = data.timestamp || new Date();
    this.shareToken = data.shareToken || this.generateShareToken();
  }

  generateShareToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async save() {
    try {
      const analysisRef = db.collection('analyses').doc(this.userId).collection('history');
      const docRef = await analysisRef.add({
        originalCode: this.originalCode,
        optimizedCode: this.optimizedCode,
        language: this.language,
        energyScore: this.energyScore,
        improvements: this.improvements,
        estimatedReduction: this.estimatedReduction,
        timestamp: this.timestamp,
        shareToken: this.shareToken,
      });

      this.id = docRef.id;

      // Update user analysis count
      await db.collection('users').doc(this.userId).update({
        analysisCount: (await this.getUserAnalysisCount()) + 1,
      });

      return this.id;
    } catch (error) {
      console.error('Error saving analysis:', error);
      throw error;
    }
  }

  async getUserAnalysisCount() {
    try {
      const snapshot = await db.collection('analyses').doc(this.userId).collection('history').get();
      return snapshot.size;
    } catch (error) {
      return 0;
    }
  }

  static async findById(userId, analysisId) {
    try {
      const doc = await db.collection('analyses').doc(userId).collection('history').doc(analysisId).get();
      if (!doc.exists) {
        return null;
      }
      return new Analysis({
        id: doc.id,
        userId,
        ...doc.data(),
      });
    } catch (error) {
      console.error('Error finding analysis:', error);
      throw error;
    }
  }

  static async findByUserId(userId, limit = 10) {
    try {
      const snapshot = await db
        .collection('analyses')
        .doc(userId)
        .collection('history')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      return snapshot.docs.map((doc) => new Analysis({
        id: doc.id,
        userId,
        timestamp: doc.data().timestamp.toDate(),
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error finding analyses:', error);
      throw error;
    }
  }

  static async findByShareToken(shareToken) {
    try {
      const snapshot = await db.collectionGroup('history').where('shareToken', '==', shareToken).get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const parentRef = doc.ref.parent.parent;
      const userId = parentRef.id;

      return new Analysis({
        id: doc.id,
        userId,
        timestamp: doc.data().timestamp.toDate(),
        ...doc.data(),
      });
    } catch (error) {
      console.error('Error finding analysis by share token:', error);
      throw error;
    }
  }

  async delete() {
    try {
      await db.collection('analyses').doc(this.userId).collection('history').doc(this.id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting analysis:', error);
      throw error;
    }
  }
}

module.exports = Analysis;
