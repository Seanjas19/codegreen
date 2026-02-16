import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import analysisReducer from './analysisSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analysis: analysisReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser', 'analysis/setCurrentAnalysis'],
      },
    }),
});

export default store;
