import { createSlice } from '@reduxjs/toolkit';
import analysisService from '../services/analysisService';

const initialState = {
  currentAnalysis: null,
  history: [],
  loading: false,
  error: null,
  isPublicLoading: false,
  publicResult: null,
};

export const submitCodeForAnalysis = (code, language) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await analysisService.submitCodeForAnalysis(code, language);
    dispatch(setCurrentAnalysis(result));
    dispatch(setError(null));
    return result; // Return the result for use in components
  } catch (error) {
    dispatch(setError(error.message));
    throw error; // Throw error so component can catch it
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserHistory = (limit) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const history = await analysisService.getUserHistory(limit);
    dispatch(setHistory(history));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAnalysisById = (analysisId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const analysis = await analysisService.getAnalysisById(analysisId);
    dispatch(setCurrentAnalysis(analysis));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchPublicResult = (analysisId, shareToken) => async (dispatch) => {
  dispatch(setIsPublicLoading(true));
  try {
    const result = await analysisService.getPublicResult(analysisId, shareToken);
    dispatch(setPublicResult(result));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIsPublicLoading(false));
  }
};

export const deleteAnalysisItem = (analysisId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await analysisService.deleteAnalysis(analysisId);
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setCurrentAnalysis(state, action) {
      state.currentAnalysis = action.payload;
    },
    setHistory(state, action) {
      state.history = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsPublicLoading(state, action) {
      state.isPublicLoading = action.payload;
    },
    setPublicResult(state, action) {
      state.publicResult = action.payload;
    },
    clearCurrentAnalysis(state) {
      state.currentAnalysis = null;
    },
  },
});

export const {
  setCurrentAnalysis,
  setHistory,
  setLoading,
  setError,
  setIsPublicLoading,
  setPublicResult,
  clearCurrentAnalysis,
} = analysisSlice.actions;

export default analysisSlice.reducer;
