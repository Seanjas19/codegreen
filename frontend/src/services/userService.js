import apiClient from './apiClient';

export const userService = {
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/user');
      return response.data.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  async updateUserProfile(name, profileImage) {
    try {
      const response = await apiClient.put('/auth/user', {
        name,
        profileImage,
      });
      return response.data.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },
};

export default userService;
