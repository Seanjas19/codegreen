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
      if (!auth) {
        throw new Error('Firebase not initialized. Check your .env file.');
      }

      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      localStorage.setItem('firebaseToken', idToken);
      localStorage.setItem('userId', result.user.uid);

      // Register user on backend
      await apiClient.post('/auth/register', {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || '',
      });

      return {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/configuration-not-found') {
        console.error('Firebase configuration error. Make sure:');
        console.error('1. .env exists with correct Firebase credentials');
        console.error('2. Google provider is enabled in Firebase Console');
        console.error('3. localhost:3000 is in Authorized domains in Firebase');
      }
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
