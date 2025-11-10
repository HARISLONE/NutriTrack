# 🏥 NutriTrack - Your Complete Smart Health Companion

A full-stack **MERN Stack** application designed to help users manage and track diet, nutrition, exercise, appointments, and health goals. It features intelligent data processing using MongoDB and a clean, fast frontend powered by **React + Vite**.

> Built using **React + Vite**, **Node.js (Express)** for backend API, and **MongoDB** as the database engine with **Mongoose** ODM.

---

## 📌 Table of Contents

- [🎯 Project Objectives](#-project-objectives)
- [💡 Features](#-features)
- [🧱 Database Schema](#-database-schema)
- [📐 Architecture Overview](#-architecture-overview)
- [🔐 Security & Constraints](#-security--constraints)
- [⚙️ Tech Stack](#️-tech-stack)
- [🚀 Installation & Setup](#-installation--setup)
- [🧪 Testing & Validation](#-testing--validation)
- [📄 Future Enhancements](#-future-enhancements)
- [👥 Authors](#-authors)

---

## 🎯 Project Objectives

This system aims to:

- Enable real-time updates of health and user profiles.
- Generate personalized diet plans based on BMI, goals, and medical history.
- Track meals, calories, exercise, and provide recommendations.
- Schedule and manage appointments with dieticians.
- Analyze health progress using comprehensive reports.

---

## 💡 Features

### 🏠 **Landing Page & User Experience**

- 🎨 **Modern Responsive Landing Page** with animated nutrition-themed graphics
- 📱 **Mobile-First Design** with comprehensive responsive breakpoints (1024px, 768px, 480px)
- ⚡ **Performance Optimized** with CSS fallbacks and GPU-accelerated animations
- 🎭 **Interactive Food Orbital Animation** with smooth rotating food emojis
- ♿ **Accessibility Support** including reduced motion preferences
- 🌐 **Cross-Browser Compatibility** with fallback support for older browsers

### 🏥 **Core Health Management**

- 🔁 **Dynamic BMI and Health Profile Calculation**
- 🥗 **Personalized Diet Plan Generation**
- 🧾 **Meal & Calorie Logging**
- 🏃 **Exercise & Activity Tracking**
- 🗓️ **Appointment Scheduling**
- 📈 **Goal Tracking & Progress Reports**
- ⚠️ **Alert Triggers for Unhealthy Logs**
- 💬 **Role-based Access (Admin, Patient)**

### 🎯 **User Interface Enhancements**

- 🏷️ **Consistent Branding** with "NutriTrack Home Portal" across all pages
- 📊 **Intuitive Dashboard** with easy navigation between features
- 🎨 **Modern CSS Design System** with custom properties and utility classes
- 📱 **Responsive Grid Layouts** that adapt to all screen sizes

---

## 🧱 Database Schema

### 📊 MongoDB Collections

The application uses MongoDB with Mongoose schemas. Here are the main collections:

#### 👤 **Users Collection**

- `_id`, `name`, `email`, `password`, `height`, `weight`, `bmi`, `role`, `createdAt`, `updatedAt`

#### 🔐 **Credentials**

- Authentication handled via JWT tokens and bcrypt password hashing
- Role-based access: `admin` or `patient`

#### 🗓️ **Appointments Collection**

- `_id`, `userId`, `dieticianId`, `date`, `time`, `status`, `createdAt`, `updatedAt`

#### 👩‍⚕️ **Dieticians Collection**

- `_id`, `name`, `specialization`, `email`, `phone`, `createdAt`, `updatedAt`

#### 📋 **Diet Plans Collection**

- `_id`, `planName`, `description`, `userId`, `nutritionalGoal`, `meals`, `createdAt`, `updatedAt`

#### 🍱 **Meals Collection**

- `_id`, `mealName`, `calories`, `nutritionalValue`, `type`, `description`, `createdAt`, `updatedAt`

#### 🍽️ **Meal Logs Collection**

- `_id`, `userId`, `mealId`, `mealType`, `date`, `calorieIntake`, `createdAt`, `updatedAt`

#### 🏃 **Exercise Logs Collection**

- `_id`, `userId`, `activityType`, `duration`, `caloriesBurned`, `date`, `createdAt`, `updatedAt`

#### 🎯 **User Goals Collection**

- `_id`, `userId`, `dailyCalorieLimit`, `nutritionalGoal`, `createdAt`, `updatedAt`

---

## 📐 Architecture Overview

- **Frontend**: Built with React + Vite, using hooks and context API for clean state management.
- **Backend**: Node.js with Express to handle RESTful APIs for user management, diet planning, appointments, and logs.
- **Database**: MongoDB with Mongoose ODM for schema validation, data modeling, and database operations.
- **Authentication**: JWT (JSON Web Tokens) for secure authentication and authorization.

---

## 🔐 Security & Constraints

- Role-based access using `enum('admin', 'patient')` in user schema
- JWT token-based authentication for all protected routes
- Password hashing using bcryptjs
- All sensitive actions are gated via token/session logic
- Data validation using Mongoose schemas
- ObjectId validation for all database operations

---

## ⚙️ Tech Stack

| Layer            | Tech                       |
| ---------------- | -------------------------- |
| Frontend         | React + Vite, Tailwind CSS |
| Backend          | Node.js + Express          |
| Database         | MongoDB with Mongoose ODM  |
| Auth             | JWT / bcrypt for hashing   |
| Backend Hosting  | Render                     |
| Frontend Hosting | Netlify                    |
| Database Hosting | MongoDB Atlas (Cloud)      |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v20 LTS recommended)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### 1. **Clone Repository**

```bash
git clone https://github.com/your-username/nutritrack.git
cd nutritrack/nutritrack-app
```

### 2. **Backend Setup**

```bash
cd backend
npm install
```

**Environment Variables** - Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/test
# For MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/test?appName=nutritrack
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note:** The application uses the `test` database by default. The connection code will automatically ensure the correct database name is used.

**Start Backend Server:**

```bash
npm run dev
```

**Seed Database (Optional):**

```bash
npm run seed
```

### 3. **Frontend Setup**

```bash
cd frontend
npm install
```

**Environment Variables** - Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000/api
```

**Important:** Do NOT set `VITE_API_URL=demo` - this will use mock/static data instead of the real backend API.

**Start Frontend Server:**

```bash
npm run dev
```

### 4. **MongoDB Setup**

**Option 1: Local MongoDB**

- Install MongoDB locally
- Start MongoDB service
- Update `MONGODB_URI` in backend `.env` file

**Option 2: MongoDB Atlas (Cloud)**

- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Update `MONGODB_URI` in backend `.env` file with your Atlas connection string

**Database:** The application uses the `test` database by default. The database will be automatically created when you first run the application. Make sure your MongoDB connection string includes `/test` as the database name (e.g., `mongodb://localhost:27017/test` or `mongodb+srv://user:pass@cluster.mongodb.net/test?appName=nutritrack`).

---

## 🧪 Testing & Validation

### API Testing

- Use the `api-tests.http` file in the backend directory with REST Client extension
- Or use Postman to test all API endpoints
- Make sure backend server is running on port 4000

### Manual Testing

Test all features:

- ✅ User authentication and registration
- ✅ BMI calculation and health profile updates
- ✅ Meal and exercise logging
- ✅ Appointment scheduling
- ✅ Report generation
- ✅ Admin dashboard with dynamic statistics
- ✅ User management (add, delete users)

### Common Issues

1. **Static data showing in admin dashboard:**

   - Check that `VITE_API_URL` is NOT set to `demo`
   - Make sure backend is running and accessible
   - Check browser console for API errors

2. **Database connection issues:**
   - Verify MongoDB URI includes `/test` as database name
   - Check MongoDB Atlas IP whitelist
   - Verify credentials are correct

---

## 📄 Future Enhancements

- 🌍 Multilingual frontend
- 📱 Mobile version (React Native)
- 📤 Export reports to PDF, CSV, JSON
- 📊 Charts with Chart.js or Recharts
- 🧠 AI-driven meal recommendations
- 🔔 Real-time notifications
- 📧 Email notifications for appointments

---

## 👥 Authors

- **Haris Hilal**

---

## 🚀 Deployment

### Quick Deployment

1. **MongoDB Atlas Setup** (5 minutes)

   - Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string (make sure it includes `/test` as database name)
   - Add your IP address to the whitelist

2. **Backend Deployment** (Render)

   - Deploy backend to [Render](https://render.com)
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string (with `/test` database)
     - `JWT_SECRET`: Your secret key for JWT tokens
     - `PORT`: 4000
     - `NODE_ENV`: production
     - `FRONTEND_URL`: Your Netlify frontend URL
   - Get backend URL (e.g., `https://nutritrack-2dkn.onrender.com`)

3. **Frontend Deployment** (Netlify)

   - Deploy frontend to [Netlify](https://netlify.com)
   - Set environment variables:
     - `VITE_API_URL`: Your Render backend URL + `/api` (e.g., `https://nutritrack-2dkn.onrender.com/api`)
   - Get frontend URL (e.g., `https://nutri-track-app.netlify.app`)

4. **Update Backend CORS**
   - Add `FRONTEND_URL` to backend environment variables in Render
   - Redeploy backend to apply changes

### Deployment Platforms

- **Backend:** Render (recommended)
- **Frontend:** Netlify (recommended)
- **Database:** MongoDB Atlas (free tier)

### Environment Variables

**Backend (Render):**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/test?appName=nutritrack
JWT_SECRET=your-secret-key-here
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://nutri-track-app.netlify.app
```

**Frontend (Netlify):**

```env
VITE_API_URL=https://nutritrack-2dkn.onrender.com/api
```

**Important Notes:**

- Make sure MongoDB URI includes `/test` as the database name
- Do NOT set `VITE_API_URL=demo` in production - it will use mock data
- Update CORS settings in backend to allow your frontend URL

---

## 📝 Notes

- The application uses MongoDB with Mongoose for database operations
- All database models are defined in the `backend/models/` directory
- Authentication is handled via JWT tokens
- The frontend communicates with the backend via RESTful API
- The application is fully responsive and works on all devices

---

## 🔗 Useful Links

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
