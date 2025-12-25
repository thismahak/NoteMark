```markdown
# 🚀 NoteMark — Personal Notes & Bookmark Manager

A full-stack productivity web app to manage **notes** and **bookmarks** with support for tags, search, user-specific data, favorites, and authentication.

> 🔐 Built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js) + Tailwind CSS + JWT + Cookies

---

## ✨ Features

### 📝 Notes
- Create, edit, delete notes  
- Tagging and search  
- Mark as favorite  

### 🔖 Bookmarks
- Add bookmarks with auto-title fetching from URL  
- Tag, search, and favorite  
- Edit and delete bookmarks  

### 👤 Authentication
- Register/Login with JWT stored in **HTTP-only cookies**  
- Auth-protected routes  
- Profile management (name/email update)  
- Secure logout  

### 🛡️ Security Enhancements
- Express Rate Limiting  
- `helmet`, `xss-clean`, `express-mongo-sanitize`, `cookie-parser`  
- CORS configured for frontend + credentials  

---

## 📁 Project Structure

```

NoteMark/
├── backend/         # Express.js API + MongoDB
├── frontend/        # React + Tailwind UI
└── README.md

````

---

## 🔧 Backend Setup (`/backend`)

### 📦 Requirements
- Node.js v14+  
- MongoDB (Local or Atlas)  

### ⚙️ `.env` Configuration

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret
NODE_ENV=production
````

### ▶️ Run Locally

```bash
cd backend
npm install
npm run dev
```

Runs on: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description           |
| -----: | -------------------- | --------------------- |
|   POST | `/api/auth/register` | Register user         |
|   POST | `/api/auth/login`    | Login + set cookie    |
|   POST | `/api/auth/logout`   | Logout + clear cookie |
|    GET | `/api/auth/me`       | Auth check (cookie)   |
|    PUT | `/api/auth/update`   | Update profile        |

---

### ✒️ Notes

| Method | Endpoint         | Description   |
| -----: | ---------------- | ------------- |
|    GET | `/api/notes`     | Fetch notes   |
|   POST | `/api/notes`     | Create a note |
|    PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

### 🔗 Bookmarks

| Method | Endpoint             | Description        |
| -----: | -------------------- | ------------------ |
|    GET | `/api/bookmarks`     | Get all bookmarks  |
|   POST | `/api/bookmarks`     | Add a new bookmark |
|    PUT | `/api/bookmarks/:id` | Update a bookmark  |
| DELETE | `/api/bookmarks/:id` | Delete a bookmark  |

> 🧠 Titles are auto-fetched if not provided on creation.

---

## 🎨 Frontend Setup (`/frontend`)

### 🧰 Tech Stack

* React (Create React App)
* React Router
* Tailwind CSS
* Axios
* Toastify

### ⚙️ `.env` File

Create `.env` in `/frontend`:

```env
REACT_APP_API_BASE_URL=https://notemark-backend.onrender.com/api
```

⚠️ **Do not include a trailing slash (`/`)**

### ▶️ Run Frontend Locally

```bash
cd frontend
npm install
npm start
```

Local dev: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Auth Flow

* All requests go to backend API (`REACT_APP_API_BASE_URL`)
* Login sets a secure, HTTP-only cookie
* Axios config: `withCredentials: true`
* Auto-login via `/auth/me` endpoint on app load

---

## 🖥️ App Pages

### Public Routes

* `/` — Landing
* `/login` — Login page
* `/register` — Registration page

### Protected Routes

* `/dashboard` — Welcome user
* `/notes` — Manage notes
* `/bookmarks` — Manage bookmarks
* `/profile` — Edit name/email

---

## ⚙️ Deployment

### 🔹 Backend: Render

* Deploy via GitHub
* Add environment variables under **Environment** tab
* Web Service → build command: `npm install && npm run dev`
* CORS setup includes:

```js
cors({
  origin: ["http://localhost:5173", "https://note-mark-nu.vercel.app"],
  credentials: true
})
```

### 🔹 Frontend: Vercel

* Auto-deploy from GitHub
* Set **REACT_APP_API_BASE_URL** in project settings

```env
REACT_APP_API_BASE_URL=https://notemark-backend.onrender.com/api
```

---

## 🧪 Testing

* Postman
* Thunder Client

---

## ✅ Features Checklist

* [x] Notes + Bookmarks CRUD
* [x] Favorite toggle, search, tags
* [x] JWT + Cookie-based auth
* [x] Rate limiting & sanitization
* [x] Profile update
* [x] Fully responsive UI
* [x] Deployment to Render + Vercel
* [x] CORS with credentials

---

## 🙋 Contact Made with ❤️ by \[**Mahak Gupta**] 🔗 [LinkedIn](https://www.linkedin.com/in/mahak-gupta-158a712a0/) • [GitHub](https://github.com/thismahak)
---

## 📌 License

MIT License — free to use, modify, and distribute.

```
```
