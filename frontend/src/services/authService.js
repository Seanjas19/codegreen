import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import apiClient from './apiClient';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const authService = {
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Register on backend FIRST before saving anything
      await apiClient.post('/auth/register', {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || '',
      });

      // Only save to localStorage if backend succeeded
      localStorage.setItem('firebaseToken', idToken);
      localStorage.setItem('userId', result.user.uid);

      return {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      // If backend fails, also sign out of Firebase to keep state clean
      await signOut(auth);
      localStorage.removeItem('firebaseToken');
      localStorage.removeItem('userId');
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('firebaseToken');
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            localStorage.setItem('firebaseToken', idToken);
            resolve({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
            });
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      });
    });
  },

  getAuthToken() {
    return localStorage.getItem('firebaseToken');
  },

  isAuthenticated() {
    return !!localStorage.getItem('firebaseToken');
  },
};

export default authService;
