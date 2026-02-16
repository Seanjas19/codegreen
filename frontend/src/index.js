import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

// Initialize dark mode before rendering to avoid flash
const initializeDarkMode = () => {
  const saved = localStorage.getItem('darkMode');
  const isDarkMode = saved !== null ? JSON.parse(saved) : true; // Default to dark mode
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
  }
};

initializeDarkMode();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
