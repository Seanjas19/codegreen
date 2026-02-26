# CodeGreen Frontend

React-based frontend for the CodeGreen carbon-efficient code optimizer, built with Redux, React Router, and Firebase.

## Prerequisites

- Node.js 14+ and npm
- React 18+
- Firebase account with authentication enabled

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     REACT_APP_API_URL=http://localhost:5000  # override to point at deployed backend or /api rewrite
     ```

3. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server with hot reload
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Project Structure

```
src/
├── components/           # Reusable presentational components
│   ├── Navbar.js
│   ├── CodeEditor.js
│   ├── ScoreTag.js
│   ├── ResultCard.js
│   └── AnalysisForm.js
│
├── pages/               # Page components (routes)
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ScannerPage.js
│   ├── ResultsPage.js
│   └── DashboardPage.js
│
├── redux/              # Redux store and slices
│   ├── store.js
│   ├── authSlice.js
│   └── analysisSlice.js
│
├── services/           # API and external service integrations
│   ├── firebaseConfig.js
│   ├── apiClient.js
│   ├── authService.js
│   ├── analysisService.js
│   └── userService.js
│
├── styles/             # CSS files for components and pages
│   ├── App.css
│   ├── Navbar.css
│   ├── HomePage.css
│   ├── LoginPage.css
│   ├── ScannerPage.css
│   ├── ResultsPage.css
│   ├── DashboardPage.css
│   ├── CodeEditor.css
│   ├── AnalysisForm.css
│   ├── ResultCard.css
│   └── ScoreTag.css
│
├── assets/             # Images, icons, etc.
├── App.js             # Main app component with routing
├── index.js           # React entry point
└── index.css          # Global styles

public/
└── index.html         # HTML template
```

## Key Features

### Components
- **Navbar**: Navigation with user authentication status
- **CodeEditor**: Syntax-highlighted code textarea
- **ScoreTag**: Visual energy efficiency score badge
- **AnalysisForm**: Code submission form with language selection
- **ResultCard**: Compact analysis results display

### Pages
- **HomePage**: Landing page with features and CTAs
- **LoginPage**: Google OAuth authentication
- **ScannerPage**: Code submission interface
- **ResultsPage**: Side-by-side code comparison with results
- **DashboardPage**: Analysis history and statistics

### Redux Store
- **Auth Slice**: User authentication & profile management
- **Analysis Slice**: Code analysis results & history

### Services
- **Firebase Config**: Firebase initialization
- **API Client**: Axios instance with auth token handling
- **Auth Service**: Google OAuth login/logout
- **Analysis Service**: Code analysis API calls
- **User Service**: User profile management

## Styling

- **Color Scheme**:
  - Primary Green: `#27ae60`
  - Dark Green: `#1e8449`
  - Light Green: `#2ecc71`
  - Warning Orange: `#ef6c00`
  - Error Red: `#e74c3c`

- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px

## Authentication Flow

1. User lands on homepage
2. Clicks "Sign In with Google"
3. Firebase handles OAuth flow
4. Gets ID token and stores in localStorage
5. Backend verifies token on each API request
6. Redirects to `/scanner` on successful login

## API Integration

All API calls go through `/api` prefix to the backend (default: `http://localhost:5000` when developing locally, or the same origin in production):

- `POST /api/analyze` - Submit code for optimization
- `GET /api/history` - Fetch user's analysis history
- `GET /api/results/:id` - Get specific analysis
- `POST /api/results/:id/delete` - Delete analysis
- `GET /auth/user` - Get current user profile

## Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to hosting service** (Vercel, Netlify, etc.)
   - Connect your repository
   - Set environment variables
   - Deploy!

## Environment Variables

```
REACT_APP_FIREBASE_API_KEY      # Firebase API key
REACT_APP_FIREBASE_AUTH_DOMAIN  # Firebase auth domain
REACT_APP_FIREBASE_PROJECT_ID   # Firebase project ID
REACT_APP_FIREBASE_STORAGE_BUCKET # Firebase storage bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID # FCM sender ID
REACT_APP_FIREBASE_APP_ID       # Firebase app ID
REACT_APP_API_URL               # Backend API URL (default: http://localhost:5000)
```

## Troubleshooting

### Firebase Configuration Errors
- Ensure all environment variables are set correctly
- Check Firebase project credentials
- Verify OAuth settings in Firebase Console

### API Connection Issues
- Check if backend server is running on the configured port
- Verify CORS settings on backend
- Check network tab in browser DevTools

### Redux DevTools
Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) for debugging state

## Dependencies

- **react**: UI library
- **react-dom**: DOM rendering
- **react-router-dom**: Client-side routing
- **redux**: State management
- **react-redux**: Redux bindings for React
- **redux-thunk**: Async action handling
- **axios**: HTTP client
- **firebase**: Firebase SDK

## License

ISC
