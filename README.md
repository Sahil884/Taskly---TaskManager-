# Taskly – Team Task Manager

Taskly is a full‑stack task management application built with **React (Vite)** on the frontend and **Express + MongoDB** on the backend. It helps teams organize work, track progress, and collaborate effectively.

---

## ✨ Key Features

- **Authentication**
  - Secure login/logout with JWT and HttpOnly cookies
  - Refresh token flow for seamless sessions

- **Task Management**
  - Create, edit, update, and delete tasks
  - Track task status (`pending`, `in‑progress`, `completed`)
  - Set priorities (`low`, `medium`, `high`)
  - Add due dates with calendar input

- **Assign Task (Highlighted Feature)**
  - Assign tasks to specific team members
  - Dropdown list of all registered users
  - Shows the currently assigned user even if not in the fetched list
  - Makes collaboration transparent and ensures accountability

- **User Management**
  - View all registered users
  - Update account details (name, email)

- **Responsive UI**
  - Built with TailwindCSS
  - Modal‑based task editing for smooth UX

---

## 🛠 Tech Stack

**Frontend**
- React 19 (Vite)
- Redux Toolkit + Redux Persist
- React Router DOM
- TailwindCSS

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer for file handling

**Deployment**
- Vercel (Frontend + Backend)


---

## ⚡ Getting Started

### Clone the repo
```bash
git clone https://github.com/your-username/taskly.git
cd taskly

Frontend setup
cd frontend
npm install
npm run dev

Backend setup
cd backend
npm install
npm start

Environment variables
Create .env files in both frontend and backend:
Frontend (frontend/.env)

VITE_Backend_URL=https://your-backend.vercel.app


Backend (backend/.env)

PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret


🎯 Usage
- Register or log in as a user.
- Create a new task with title, description, status, priority, and due date.
- Assign the task to a team member using the dropdown list.
- Save changes — the task will now appear with the assigned user.
- Update or delete tasks as needed.



📸 Screenshots
<img width="1560" height="1389" alt="taskly-task-manager-icrv vercel app_" src="https://github.com/user-attachments/assets/e8355c36-8155-4fd8-bbd7-0195067fd5a0" />

<img width="1536" height="1632" alt="taskly-task-manager-icrv vercel app_dashboard" src="https://github.com/user-attachments/assets/26bd3912-1e3f-41c6-9a78-6933c9b838f7" />

<img width="1536" height="1824" alt="taskly-task-manager-icrv vercel app_create_task" src="https://github.com/user-attachments/assets/9483fbe7-ef75-42a0-8be3-e8f75622fe6d" />








