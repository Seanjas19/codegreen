# CodeGreen Backend

Carbon-efficient code optimizer backend built with Node.js + Express + Firebase + Gemini API.

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Add your Firebase credentials and Gemini API key

3. **Start server**
   ```
   npm run dev  # Development with hot reload
   npm start    # Production
   ```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `GET /auth/user` - Get current user profile (requires auth)
- `PUT /auth/user` - Update user profile (requires auth)

### Code Analysis
- `POST /api/analyze` - Submit code for optimization (requires auth)
- `GET /api/history` - Get user's analysis history (requires auth)
- `GET /api/results/:id` - Get specific analysis result (requires auth)
- `GET /api/results/:id/share?token=SHARE_TOKEN` - Get public shared result
- `POST /api/results/:id/delete` - Delete analysis (requires auth)

### Health
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── controllers/      # Business logic
├── models/          # Data models
├── routes/          # API routes
├── middleware/      # Express middleware
├── utils/           # Helper utilities
│   ├── firebaseInit.js    # Firebase setup
│   ├── geminiOptimizer.js # Gemini API integration
│   └── codeValidator.js   # Input validation
├── .env.example     # Environment template
├── package.json     # Dependencies
└── server.js        # Main entry point
```

## Key Features

- **Gemini API Integration**: AI-powered code optimization for carbon efficiency
- **Firebase Authentication**: Secure user authentication with ID tokens
- **Firestore Database**: Cloud database for user and analysis data
- **Error Handling**: Centralized error handling with meaningful messages
- **Input Validation**: Code validation and sanitization
- **Shareable Results**: Generate unique share tokens for results

## Environment Variables

```
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
GEMINI_API_KEY=your_api_key
FRONTEND_URL=http://localhost:3000
```
