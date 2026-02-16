require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const analysisRoutes = require('./routes/analysisRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', analysisRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║     CodeGreen Backend Server Started               ║
║     Environment: ${process.env.NODE_ENV || 'development'}                       ║
║     Port: ${PORT}                                       ║
║     Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}            ║
╚════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
