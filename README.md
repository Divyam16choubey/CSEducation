# CSEducation — Theory Documentation

## 1. Project Overview

**CSEducation** is a full-stack academic portal built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides a centralized platform for Computer Science & Engineering students to access semester-wise notes, previous year question papers (PYQs), books, and curated reference materials.

The platform replaces the scattered, disorganized nature of academic resource sharing (via WhatsApp groups, Google Drive links, and personal folders) with a single, well-structured, and always-accessible web application.

---

## 2. Problem Statement

CSE students face a recurring problem: study materials are scattered across multiple platforms. Notes are shared in class WhatsApp groups that get buried under messages, PYQs exist in random Google Drive folders with restricted access, and useful reference links are lost in browser bookmarks. There is no single, reliable, and organized source for all academic resources.

**CSEducation** addresses this by providing:
- A centralized, semester-wise organized portal
- Admin-managed content for quality control
- Accessible from any device with a web browser

---

## 3. Objectives

1. Provide centralized access to semester-wise study materials for CSE students
2. Organize PYQs, notes, books, and reference links in a structured manner
3. Enable admin-managed content upload and management
4. Create a responsive, accessible, and modern user experience
5. Build a scalable full-stack MERN application following industry best practices
6. Implement secure JWT-based authentication for administrative operations

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                     │
│              React + Tailwind CSS + Vite                │
├─────────────────────────────────────────────────────────┤
│                  Axios HTTP Client                      │
│            (JWT Token in Authorization Header)          │
├─────────────────┬───────────────────────────────────────┤
│                 │  REST API (HTTP)                      │
│                 ▼                                       │
│         EXPRESS.JS SERVER (Node.js)                     │
│    ┌────────────────────────────────┐                   │
│    │  Routes → Controllers          │                   │
│    │  Middleware (Auth, CORS)       │                   │
│    └────────────┬───────────────────┘                   │
│                 │  Mongoose ODM                         │
│                 ▼                                       │
│           MONGODB DATABASE                              │
│    ┌────────────────────────────────┐                   │
│    │  Collections:                  │                   │
│    │  - admins                      │                   │
│    │  - semesters                   │                   │
│    │  - subjects                    │                   │
│    │  - resources                   │                   │
│    │  - contacts                    │                   │
│    └────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Frontend Architecture

### Technology Stack
- **React 18** — Component-based UI library
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **Framer Motion** — Animation library for React
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API communication
- **React Hot Toast** — Toast notification system

### Folder Structure

```text
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── animations/
│   │   └── motion.js
│   ├── api/
│   │   ├── api.js
│   │   ├── adminService.js
│   │   ├── contentService.js
│   │   ├── contactService.js
│   │   └── subjectApi.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── SubjectCard.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── ProtectedRoute.jsx
│   ├── data/
│   │   └── semesterSubjects.js
│   ├── hooks/
│   │   └── useApi.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── SemesterLanding.jsx
│   │   ├── SemesterPage.jsx
│   │   ├── SubjectPage.jsx
│   │   ├── PYQLanding.jsx
│   │   ├── PYQPage.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── vite.config.js
```

### Design System

The application uses a custom CSS design system built on top of Tailwind CSS:

- **Premium Card System** — Glassmorphism-inspired cards with hover effects
- **Gradient Accents** — Blue-to-indigo-to-purple gradient palette
- **Animated Backgrounds** — Subtle gradient shift animations
- **Dark/Light Mode** — Full theme support with localStorage persistence
- **Custom Scrollbar** — Styled scrollbar matching the brand colors

### Routing

React Router DOM handles client-side navigation:

- `/` — Home page
- `/semester` — Semester selection
- `/semester/:id` — Subjects for a semester
- `/subject/:id` — Resources for a subject
- `/pyqs` — PYQ year selection
- `/pyqs/:year` — PYQs for a specific year
- `/about` — About page
- `/contact` — Contact form
- `/admin/login` — Admin authentication
- `/admin/dashboard` — Protected admin panel
- `*` — 404 Not Found page

---

## 6. Backend Architecture

### Technology Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **MongoDB** — NoSQL document database
- **Mongoose** — MongoDB ODM (Object Data Modeling)
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcryptjs** — Password hashing

### Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── contentController.js
│   │   ├── contactController.js
│   │   └── subjectController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Semester.js
│   │   ├── Subject.js
│   │   ├── Resource.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── contentRoutes.js
│   │   ├── contactRoutes.js
│   │   └── subjectRoutes.js
│   ├── scripts/
│   │   └── createAdmin.js
│   └── server.js
├── package.json
└── package-lock.json
```

### API Endpoints

| Method |           Endpoint                | Auth |     Description           |
|--------|-----------------------------------|------|---------------------------|
| POST   | `/api/admin/register`             |  —   | Register admin            |
| POST   | `/api/admin/login`                |  —   | Admin login (returns JWT) |
| GET    | `/api/content/semesters`          |  —   | List all semesters        |
| POST   | `/api/content/semesters`          | JWT  | Add semester              |
| GET    | `/api/content/subjects/:semester` |  —   | List subjects by semester |
| POST   | `/api/content/subjects`           | JWT  | Add subject               |
| GET    | `/api/content/resources/:subject` |  —   | List resources by subject |
| POST   | `/api/content/resources`          | JWT  | Add resource              |
| GET    | `/api/content/pyqs/:year`         |  —   | List PYQs by year         |
| GET    | `/api/content/pyqs/years`         |  —   | List available PYQ years  |
| POST   | `/api/content/pyqs`               | JWT  | Add PYQ                   |
| POST   | `/api/contact`                    |  —   | Submit contact message    |
| GET    | `/api/contact`                    | JWT  | List contact messages     |

---

## 7. MongoDB Database Design

### Collections & Schemas

**admins**
- `username` (String, unique, required)
- `password` (String, hashed with bcryptjs)
- `timestamps` (createdAt, updatedAt)

**semesters**
- `number` (Number, 1-8, unique)
- `name` (String, e.g., "Sem IV")
- `timestamps`

**subjects**
- `name` (String, required)
- `type` (String, enum: "Theory" | "Lab")
- `semester` (Number, 1-8)
- `timestamps`

**resources**
- `title` (String, required)
- `type` (String, enum: "notes" | "books" | "pyqs" | "reference")
- `url` (String, required — Google Drive or external link)
- `subject` (String — subject slug)
- `semester` (Number)
- `year` (Number — for PYQs)
- `timestamps`

**contacts**
- `name` (String, required)
- `email` (String, required)
- `message` (String, required)
- `timestamps`

---

## 8. JWT Authentication Flow

```
1. Admin submits username + password → POST /api/admin/login
2. Server validates credentials using bcryptjs.compare()
3. On success: Server generates JWT token with admin ID as payload
   Token signed with JWT_SECRET, expires in 30 days
4. Token returned to client → Stored in localStorage as "adminToken"
5. Protected requests: Axios interceptor attaches token as
   Authorization: Bearer <token> header
6. Server middleware (authMiddleware.js) verifies token on protected routes
7. On logout: Token removed from localStorage
```

---

## 9. UI/UX Design Principles

1. **Glassmorphism** — Semi-transparent backgrounds with blur effects for depth
2. **Gradient Accents** — Blue-indigo-purple gradient palette for brand consistency
3. **Micro-Animations** — Subtle Framer Motion animations for engagement:
   - Page entrance (fade-up)
   - Card hover (scale + shadow)
   - Staggered list reveals
   - Dropdown slide animations
4. **Responsive Design** — Mobile-first approach with Tailwind breakpoints
5. **Dark/Light Mode** — Full theme support across all components
6. **Skeleton Loaders** — Loading placeholders instead of text spinners
7. **Scroll Progress** — Visual indicator of page scroll position
8. **Consistent Spacing** — 4px/8px rhythm using Tailwind's spacing scale

---

## 10. Feature Explanation


|     Feature         |                 Description                                | 
|---------------------|------------------------------------------------------------|
| Semester Browser    | Browse 8 semesters with API-backed + fallback data         |
| Subject Viewer      | View theory and lab subjects per semester                  |
| Resource Browser    | Access notes, books, references grouped by type            |
| PYQ Archive         | Browse previous year papers organized by year and semester |
| Admin Dashboard     | Sidebar-based panel for managing all resources             |
| Contact Form        | Functional form with API submission and toast feedback     |
| Dark/Light Mode     | Theme toggle with localStorage persistence                 |
| 404 Page            | Animated catch-all for invalid routes                      |
| Scroll Progress     | Gradient bar showing reading progress                      | 
| Toast Notifications | Styled feedback for all user actions                       |

---

## 11. Future Scope

1. **Multi-Department Support** — Expand beyond CSE to other engineering departments
2. **Student Accounts** — User registration with personalized dashboards and bookmarks
3. **Discussion Forums** — Peer-to-peer Q&A and collaboration tools
4. **AI Recommendations** — ML-based resource suggestions based on study patterns
5. **Mobile Application** — React Native app for iOS and Android
6. **File Upload** — Direct file upload to cloud storage (AWS S3 / Cloudinary)
7. **Analytics Dashboard** — Admin insights on popular resources, traffic patterns
8. **Search System** — Full-text search across all resources
9. **Email Notifications** — Automated alerts for new resource uploads
10. **PWA Support** — Progressive Web App for offline access

---

## 12. Conclusion

CSEducation demonstrates a production-grade implementation of the MERN stack, solving a genuine academic problem. The project showcases:

- **Full-stack development** with React frontend and Express/MongoDB backend
- **JWT-based authentication** for secure admin operations
- **Modern UI/UX** with glassmorphism, animations, and responsive design
- **Clean architecture** with separation of concerns across layers
- **Scalable design** ready for feature expansion and deployment

The platform is designed to be immediately useful for students while remaining maintainable and extensible for future development.

---

## 13. Developer & Deployment Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas** account (or local MongoDB v6+)

---

### Project Structure
```
CSEducation/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers with input validation
│   │   ├── middleware/       # Auth, Rate limiting, and Error handling
│   │   ├── models/           # Mongoose schemas (Admin, Subject, Resource, etc.)
│   │   ├── routes/           # Express route definitions
│   │   ├── scripts/          # CLI scripts (createAdmin.js)
│   │   └── server.js         # Server entry point with Helmet and CORS
│   ├── .env.example          # Environment variable template
│   └── package.json
│
├── frontend/                 # React 18 + Vite SPA
│   ├── src/
│   │   ├── api/              # Axios instance and API service modules
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page views (Home, Semester, Subject, PYQs, Admin)
│   │   ├── hooks/            # Custom hooks (useApi, useDocTitle)
│   │   └── index.css         # Token-based CSS design system
│   ├── .env.example          # Frontend environment template
│   ├── vercel.json           # SPA routing rewrite configuration
│   └── package.json
│
├── render.yaml               # Backend Render deployment specification
└── README.md
```

---

### Local Environment Setup

#### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Fill in the environment variables in `.env`:
   - `PORT=5000`
   - `MONGO_URI=<your-mongodb-atlas-connection-string>`
   - `JWT_SECRET=<cryptographically-secure-random-string>`
   - `CORS_ORIGIN=http://localhost:5173`

5. Create your initial administrator account via CLI:
   ```bash
   npm run create-admin <username> <password>
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

---

#### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Configure `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
5. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:5173`.*

---

### Production Build & Verification

#### Build Frontend:
```bash
cd frontend
npm run build
```
*Outputs production bundle to `frontend/dist`.*

#### Run Backend in Production Mode:
```bash
cd backend
npm start
```

---

### Production Deployment

#### 1. Backend Deployment (Render)
1. Push the repository to GitHub.
2. Log into [Render Dashboard](https://render.com) and create a **New Web Service**.
3. Connect your repository.
4. Set root directory to `backend`.
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`
7. Add Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGO_URI`: *Your production MongoDB Atlas connection string*
   - `JWT_SECRET`: *A secure 32+ character random string*
   - `CORS_ORIGIN`: `https://your-frontend.vercel.app`

*(Alternatively, use the included `render.yaml` blueprint).*

#### 2. Frontend Deployment (Vercel)
1. Log into [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
2. Select your repository.
3. Set **Root Directory** to `frontend`.
4. Framework Preset: **Vite**.
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-name.onrender.com/api`
6. Deploy. The included `frontend/vercel.json` ensures that direct navigation and page reloads on all SPA routes (`/semester/3`, `/pyqs`, `/admin`, etc.) work without 404 errors.

---

### Security Checklist for Production
- [x] **Admin Registration Gated**: `POST /api/admin/register` requires existing admin JWT authentication. Initial admin creation uses offline CLI script.
- [x] **Rate Limiting Active**: Login and contact endpoints are protected from automated brute force attacks via `express-rate-limit`.
- [x] **Security Headers**: `helmet` is enabled on all backend responses.
- [x] **CORS Restricted**: Backend only accepts requests from explicitly configured `CORS_ORIGIN` domains.
- [x] **Input Sanitization**: All controller endpoints enforce length boundaries, regex validation, and type checking.
- [x] **Credential Rotation Required**: Rotate MongoDB Atlas database user passwords and JWT secret in production hosting dashboard prior to public release.
