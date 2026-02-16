import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// We'll use thunk for async operations
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await authService.loginWithGoogle();
    dispatch(setUser(user));
    dispatch(setIsAuthenticated(true));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await authService.logout();
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await authService.getCurrentUser();
    if (user) {
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
