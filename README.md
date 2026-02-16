<<<<<<< HEAD
# codegreen
An open-source web app to help optimize your code reduce carbon footprint
=======
# CodeGreen - Carbon-Efficient Code Optimizer

An AI-powered web application that uses Google's Gemini API to analyze and optimize code for reduced carbon footprint and energy efficiency.

**Built with**: React.js + Redux (Frontend) | Node.js + Express (Backend) | Firebase (Database & Auth) | Gemini API (Code Optimization)

---

## 🎯 Project Overview

CodeGreen helps developers write more sustainable code by:
- **Analyzing** code for energy inefficiency patterns
- **Using Gemini AI** to suggest carbon-efficient optimizations
- **Tracking** optimization history with energy scores (0-10)
- **Sharing** results with team members
- **Learning** best practices for sustainable coding

---

## 📋 MVC Architecture

### **Frontend (React + Redux)**
```
Model:    Redux Store (authSlice, analysisSlice)
View:     React Components (Pages, Presentational Components)
Control:  Redux Actions & Services (API calls, Auth flow)
```

**Folder Structure**:
```
frontend/
├── src/
│   ├── components/        # Presentational components
│   ├── pages/            # Page containers (routes)
│   ├── redux/            # Redux slices & store
│   ├── services/         # API & Firebase integrations
│   ├── styles/           # CSS files
│   └── App.js            # Main component with routing
```

**Key Features**:
- Redux state management for auth & analysis
- React Router for client-side navigation
- Firebase Authentication (Google OAuth)
- Axios for API calls with token handling
- Responsive design (mobile-first)

---

### **Backend (Node.js + Express)**
```
Model:    Mongoose/Firestore (User, Analysis)
View:     JSON API responses
Control:  Controllers (analysisController, authController)
```

**Folder Structure**:
```
backend/
├── controllers/          # Business logic
├── models/              # Data models
├── routes/              # API endpoints
├── middleware/          # Auth, error handling
├── utils/               # Gemini API, validators
└── server.js            # Express app
```

**Key Features**:
- Express REST API
- Firebase Admin SDK (database & auth)
- Google Gemini API for code optimization
- Input validation & sanitization
- Centralized error handling
- Protected routes with JWT token verification

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 14+ & npm
- Firebase project with Firestore & Authentication enabled
- Google API key for Gemini API
- Git (optional)

### **1. Clone/Setup Repository**
```bash
cd c:\Users\User\OneDrive\Documents\codegreen_hackathon
```

### **2. Setup Backend**
```bash
cd backend
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env with:
# - FIREBASE_PROJECT_ID
# - FIREBASE_PRIVATE_KEY
# - FIREBASE_CLIENT_EMAIL
# - GEMINI_API_KEY
# - FRONTEND_URL=http://localhost:3000

# Start backend server
npm run dev  # Development with hot reload
# Server runs on http://localhost:5000
```

### **3. Setup Frontend (in new terminal)**
```bash
cd frontend
npm install

# Create .env.local file with your credentials
cp .env.example .env.local
# Edit .env.local with:
# - REACT_APP_FIREBASE_API_KEY
# - REACT_APP_FIREBASE_AUTH_DOMAIN
# - REACT_APP_FIREBASE_PROJECT_ID
# - REACT_APP_FIREBASE_STORAGE_BUCKET
# - REACT_APP_FIREBASE_MESSAGING_SENDER_ID
# - REACT_APP_FIREBASE_APP_ID
# - REACT_APP_API_URL=http://localhost:5000

# Start frontend dev server
npm start
# App opens at http://localhost:3000
```

---

## 📚 Project Structure

```
codegreen_hackathon/
├── backend/                    # Node.js + Express backend
│   ├── controllers/            # Business logic
│   ├── models/                 # Data models (User, Analysis)
│   ├── routes/                 # API routes
│   ├── middleware/             # Auth, error handling
│   ├── utils/                  # Gemini, Firebase, validators
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   └── README.md
│
├── frontend/                   # React + Redux frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page containers
│   │   ├── redux/              # Redux store
│   │   ├── services/           # API & Firebase
│   │   ├── styles/             # CSS
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── dashboard.html, login.html, ...  # Original UI templates
└── README.md                         # This file
```

---

## 🔄 Data Flow

### **User Authentication Flow**
```
1. User visits homepage
2. Clicks "Sign in with Google"
3. Firebase handles OAuth popup
4. User grants permission
5. Firebase returns ID token
6. Token stored in localStorage
7. Backend verifies token on API calls
8. User redirected to /scanner
```

### **Code Analysis Flow**
```
1. User submits code on Scanner page
2. Redux action dispatches API call
3. Backend receives code + auth token
4. Validates code length (10KB max)
5. Calls Gemini API with optimization prompt
6. Gemini returns optimized code + improvements
7. Backend calculates energy score
8. Saves analysis to Firestore
9. Returns result to frontend
10. Redux updates state
11. Frontend navigates to Results page
12. Displays side-by-side code comparison
```

---

## 🌐 API Endpoints

### **Authentication**
- `POST /auth/register` - Register new user
- `GET /auth/user` - Get current user (requires auth)
- `PUT /auth/user` - Update user profile (requires auth)

### **Code Analysis**
- `POST /api/analyze` - Submit code for optimization (requires auth)
- `GET /api/history` - Get user's analysis history (requires auth)
- `GET /api/results/:id` - Get specific analysis (requires auth)
- `GET /api/results/:id/share?token=SHARE_TOKEN` - Public shared result
- `POST /api/results/:id/delete` - Delete analysis (requires auth)

### **Health**
- `GET /api/health` - Server health check

---

## 📦 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI library |
| | Redux | State management |
| | React Router | Client-side routing |
| | Axios | HTTP client |
| | Firebase SDK | Auth & realtime features |
| | CSS3 | Styling (responsive design) |
| **Backend** | Node.js | JavaScript runtime |
| | Express | REST API framework |
| | Firebase Admin SDK | Database & auth verification |
| | @google/generative-ai | Gemini API integration |
| | Axios | HTTP requests |
| **Database** | Firestore | NoSQL cloud database |
| **Auth** | Firebase Auth | User authentication |
| **AI** | Gemini API | Code optimization |

---

## 🎨 UI Components

### **Presentational Components**
- `Navbar` - Navigation bar with auth links
- `CodeEditor` - Textarea for code input/display
- `ScoreTag` - Energy efficiency score badge
- `AnalysisForm` - Code submission form
- `ResultCard` - Compact result preview card

### **Page Containers**
- `HomePage` - Landing page with features
- `LoginPage` - Google OAuth authentication
- `ScannerPage` - Code submission interface
- `ResultsPage` - Detailed results with comparison
- `DashboardPage` - Analysis history & stats

---

## 🔐 Security Features

- **Firebase Authentication**: OAuth 2.0 with Google
- **ID Token Verification**: Backend validates JWT tokens
- **Input Validation**: Code length checks & sanitization
- **CORS**: Configured for frontend-backend communication
- **Protected Routes**: Client-side route guards
- **Error Handling**: Centralized, user-friendly error messages

---

## 📊 Firebase Firestore Structure

```
firestore/
├── users/{userId}
│   ├── email: string
│   ├── name: string
│   ├── analysisCount: number
│   └── averageScore: number
│
└── analyses/{userId}/history/{analysisId}
    ├── originalCode: string
    ├── optimizedCode: string
    ├── language: string
    ├── energyScore: number
    ├── improvements: [string]
    ├── estimatedReduction: number
    ├── timestamp: Date
    └── shareToken: string
```

---

## 🎯 Workflow

1. **User Registration**: First-time users auto-register on login
2. **Code Submission**: Submit code with language selection
3. **Gemini Optimization**: AI analyzes for energy inefficiency
4. **Result Display**: Shows side-by-side comparison
5. **History Tracking**: All analyses saved to user profile
6. **Sharing**: Generate unique tokens for public sharing
7. **Dashboard**: View stats and past optimizations

---

## 🐛 Troubleshooting

### **Frontend Issues**

**Port 3000 already in use**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

**Firebase authentication errors**
- Check `.env.local` credentials
- Verify Firebase project settings
- Ensure Google OAuth is enabled

### **Backend Issues**

**Port 5000 already in use**
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or set different port
PORT=5001 npm run dev
```

**Gemini API errors**
- Verify `GEMINI_API_KEY` is valid
- Check API quota limits
- Test API directly in backend logs

**Firebase connection errors**
- Verify `.env` credentials
- Check Firestore is enabled
- Verify service account has permissions

---

## 📖 Code Examples

### **Redux Action (Frontend)**
```javascript
// Submit code for analysis
dispatch(submitCodeForAnalysis(code, language));

// Dispatches async thunk that:
// 1. Sets loading state
// 2. Calls analysisService.submitCodeForAnalysis()
// 3. Updates Redux store with results
// 4. Handles errors gracefully
```

### **API Call (Frontend)**
```javascript
// analysisService.js
async submitCodeForAnalysis(code, language) {
  const response = await apiClient.post('/api/analyze', {
    code,
    language,
  });
  return response.data.data;
}
```

### **Controller (Backend)**
```javascript
// analysisController.js
async analyzeCode(req, res, next) {
  const { code, language } = req.body;
  
  // Validate
  validateCode(code);
  
  // Optimize with Gemini
  const result = await optimizeCodeWithGemini(code, language);
  
  // Calculate score
  const score = calculateEnergyScore(result.reduction, result.improvements.length);
  
  // Save to Firestore
  const analysis = new Analysis({ userId, code, optimizedCode, score });
  await analysis.save();
  
  // Return response
  res.json({ success: true, data: analysis });
}
```

---

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy build/ folder to Vercel or connect GitHub repo
```

### **Backend Deployment (Heroku/Railway)**
```bash
cd backend
npm install -g heroku
heroku create codegreen-backend
git push heroku main
# Or use Railway for easier setup
```

---

## 📝 Environment Variables Checklist

### **Backend (.env)**
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_PRIVATE_KEY
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] GEMINI_API_KEY
- [ ] FRONTEND_URL
- [ ] NODE_ENV (development/production)

### **Frontend (.env.local)**
- [ ] REACT_APP_FIREBASE_API_KEY
- [ ] REACT_APP_FIREBASE_AUTH_DOMAIN
- [ ] REACT_APP_FIREBASE_PROJECT_ID
- [ ] REACT_APP_FIREBASE_STORAGE_BUCKET
- [ ] REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- [ ] REACT_APP_FIREBASE_APP_ID
- [ ] REACT_APP_API_URL

---

## 📞 Support & Contributing

- Backend docs: See [backend/README.md](backend/README.md)
- Frontend docs: See [frontend/README.md](frontend/README.md)
- Issues: Create GitHub issues for bugs or feature requests

---

## 📄 License

ISC

---

**Ready to optimize your code for a greener planet? 🌱**

Start the development servers and visit `http://localhost:3000` to begin!
>>>>>>> master
