import apiClient from './apiClient';

export const analysisService = {
  async submitCodeForAnalysis(code, language = 'javascript') {
    try {
      const response = await apiClient.post('/api/analyze', {
        code,
        language,
      });
      return response.data.data;
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  },

  async getUserHistory(limit = 10) {
    try {
      const response = await apiClient.get(`/api/history?limit=${limit}`);
      return response.data.data;
    } catch (error) {
      console.error('History error:', error);
      throw error;
    }
  },

  async getAnalysisById(analysisId) {
    try {
      const response = await apiClient.get(`/api/results/${analysisId}`);
      return response.data.data;
    } catch (error) {
      console.error('Get analysis error:', error);
      throw error;
    }
  },

  async getPublicResult(analysisId, shareToken) {
    try {
      const response = await apiClient.get(`/api/results/${analysisId}/share?token=${shareToken}`);
      return response.data.data;
    } catch (error) {
      console.error('Public result error:', error);
      throw error;
    }
  },

  async deleteAnalysis(analysisId) {
    try {
      const response = await apiClient.post(`/api/results/${analysisId}/delete`);
      return response.data;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },
};

export default analysisService;
