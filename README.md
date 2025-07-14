```markdown
# 🚀 NoteMark – Personal Notes & Bookmark Manager

A full-stack web application to manage personal **notes** and **bookmarks** with features like tags, search, favorite marking, and user authentication.

> 🔐 Built with **MERN Stack** (MongoDB, Express, React, Node.js) + Tailwind CSS

---

## ✨ Features

### 📝 Notes
- Create, edit, delete notes
- Search notes by text
- Filter notes by tags
- Mark notes as favorite

### 🔖 Bookmarks
- Create, edit, delete bookmarks
- Save URLs with auto-title fetching
- Tag and search bookmarks
- Mark bookmarks as favorite

### 👤 User Auth
- Register/Login with JWT authentication
- Logout securely
- User-specific notes & bookmarks
- Profile page with editable name/email
- Cookie Storage for logged in

### 👤 Enhancements
- Express Rate Limiter
- express-mongo-sanitize To prevent mongodb injections
- cors , helmet , morgan , cookie-parser, xss 
---

## 📁 Folder Structure

```

project-root/
├── backend/        # Express + MongoDB (API)
├── frontend/       # React + Tailwind (UI)
└── README.md       # You're here!

````

---

## 🔧 Backend Setup (`/backend`)

### 📦 Requirements

- Node.js v14+
- MongoDB (local or Atlas)

### ⚙️ Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
````

### ▶️ Run Server

```bash
cd backend
npm install
npm run dev
```

Backend will run at: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

### 🛂 Auth

| Method | Route                | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login user           |
| POST   | `/api/auth/logout`   | Logout + clear token |
| GET    | `/api/auth/me`       | Get current user     |
| PUT    | `/api/auth/update`   | Update name/email 🔧 |

---

### ✒️ Notes

| Method | Route            | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/notes`     | Get all notes |
| POST   | `/api/notes`     | Create a note |
| PUT    | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

### 🔗 Bookmarks

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/bookmarks`     | Get all bookmarks |
| POST   | `/api/bookmarks`     | Create a bookmark |
| PUT    | `/api/bookmarks/:id` | Update a bookmark |
| DELETE | `/api/bookmarks/:id` | Delete a bookmark |

> 🎁 Bookmark creation auto-fetches title if not provided.

---

## 🎨 Frontend Setup (`/frontend`)

### 🧰 Tech Stack

* React.js
* React Router
* Tailwind CSS
* Axios

### ⚙️ Environment Variables

Create `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### ▶️ Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Pages & Components

### 🔐 Public Pages

* `/login` – Login user
* `/register` – Register new user
* `/` – Landing Page

### ✅ Protected Pages

* `/dashboard` – Welcome, quick links
* `/notes` – List + Manage notes
* `/bookmarks` – List + Manage bookmarks
* `/profile` – View and Update name/email

### 🔧 Components

* Navbar
* Footer
* ProtectedLayout
* SearchBar
* NotesCard / BookmarkCard
* Pagination
* Toast Notifications

---

## ✅ Features Completed

* [x] JWT Auth (login, register, logout)
* [x] Notes CRUD with favorites and tags
* [x] Bookmarks CRUD with auto-title + favorites
* [x] Profile update (name, email) + view
* [x] Fully responsive UI
* [x] Protected routes
* [x] Clean dashboard and landing page
* [x] Dark mode toggle
* [x] Contact + About Sections

---

## 🧪 Testing

Use tools like:

* [Postman](https://www.postman.com/)
* [Thunder Client VSCode extension](https://www.thunderclient.com/)

For routes like:

```http
GET /api/notes
Authorization: Bearer <JWT token>
```

---

## 📦 Deployment Notes

* ✅ Deploy backend to **Render** or **Railway**
* ✅ Deploy frontend to **Vercel** or **Netlify**
* ✅ Use environment variables in both

---

## 🙋 Contact

Made with ❤️ by \[Mahak Gupta]
[LinkedIn](https://www.linkedin.com/in/mahak-gupta-158a712a0/) • [GitHub](https://github.com/thismahak)

---

## 📌 License

MIT License – free to use, modify, and share.

```

---

```
