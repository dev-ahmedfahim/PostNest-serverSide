# 🛠️ PostNest Backend (Express API)

This is the backend API for the PostNest forum application. It is a serverless-compatible Express.js app using the native MongoDB driver, designed to work with Firebase Auth and deployed to Vercel.

---

## 📸 Core Features

- 🔐 Firebase token verification + JWT issuing
- 🧍 User roles: user, admin
- 🧾 Post creation, voting, commenting, deletion
- 🔍 Search posts via MongoDB query
- 📊 Popular post sorting via `$addFields` voteDiff
- 📝 Comment reporting and moderation
- 📢 Admin announcements
- 📈 Pie chart summary for posts, comments, users
- 🔒 Middleware: verifyJWT, verifyAdmin

---

## 📁 Folder Structure

api/
├── index.js # Express app entry (for Vercel)
├── config/
│ ├── db.js # MongoDB connection
│ └── firebase.config.js # Firebase Admin SDK
├── routes/
├── controllers/
├── middlewares/

---

## 🔧 Tech Stack

- **Express.js**
- **MongoDB (Native Driver)**
- **Firebase Admin SDK**
- **jsonwebtoken**
- **dotenv**
- **Vercel Serverless Functions**

---

## 📦 API Endpoints Overview

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| POST   | `/api/auth/jwt`        | Issue JWT from Firebase ID token   |
| GET    | `/api/posts`           | Fetch all posts (with search/sort) |
| POST   | `/api/posts`           | Create new post                    |
| GET    | `/api/comments/:id`    | Get comments for a post            |
| PATCH  | `/api/reports/:id`     | Report a comment                   |
| GET    | `/api/announcements`   | Get current announcements          |
| POST   | `/api/announcements`   | Create announcement (admin)        |
| GET    | `/api/users`           | Fetch users with pagination        |
| PATCH  | `/api/users/:id/admin` | Promote user to admin              |

---

## 🔐 Security Notes

- Firebase tokens are verified using `firebase-admin`
- JWTs are signed server-side and expire in 7 days
- `.env` is fully secured via Vercel environment settings

---

## ⚠️ Important Admin Functions

In `/reported-comments`:

- Admin sees all reports
- Can take actions like delete comment, warn user, or mark as resolved

---

## 🔑 Deployment Notes (Vercel Serverless)

- `app.listen()` is removed; Express is exported as default from `api/index.js`
- MongoDB connection is reused for performance
- `vercel.json` used for build + routing

---

## 📄 Environment Variables Required

PORT=5000
MONGODB_URI=your-mongodb-uri
DB_NAME=PostNest
JWT_SECRET=secure-jwt-secret

FIREBASE_PRIVATE_KEY_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_CLIENT_ID=...
FIREBASE_CLIENT_CERT_URL=...

✅ All variables are secured and injected via Vercel dashboard

---

## 📝 Author

**Mejbah Ahmed Fahim**  
Junior MERN developer | Firebase + MongoDB enthusiast

---

## ✅ Status

✅ All backend features completed  
🧪 Fully tested with Postman + frontend integration
