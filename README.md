# 🏢 Leave Management System

💼 Say goodbye to messy spreadsheets and email trails! This full-stack Leave Management System helps employees apply for time off and lets managers review and track requests in a smooth, organized way — all with a clean UI and powerful backend.

---

## 📁 Project Structure

```
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── node_modules/
│ ├── index.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── public/
│ │ └── assets/img/illustration/
│ ├── src/
│ │ ├── components/
│ │ ├── layouts/
│ │ ├── context/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ ├── api.js
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .gitignore
│ ├── vite.config.js
│ ├── index.html
│ └── package.json
```

---

## 💡 Features

- 🔐 **Login & Role-based Authentication**
- 🙋‍♂️ Employees:
  - Apply for leave
  - View history and balance
- 🧑‍💼 Managers:
  - Approve/reject leave requests
  - View employees on leave
  - Monitor full request history
- 📆 Leave Calendar View

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite), Context API, React Router
- **Backend:** Node.js, Express.js, MySQL
- **Authentication:** JWT
- **UI:** Basic CSS with component-based layout

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gaurav-Patil-02/LEAVE-MANAGEMENT-SYSTEM.git
cd LEAVE-MANAGEMENT-SYSTEM
```

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Create `.env` in backend root:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=employee_leave
JWT_SECRET=your_jwt_secret
```

#### Run backend:

```bash
node index.js
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Test Registration (Testing Only)

> ⚠️ The `/auth/register` route is **only for development/testing purposes**. In production, all users (managers/employees) should be added via the database or admin interface.

### 🔗 API Endpoint

```
POST http://localhost:5000/api/auth/register
```

### ✅ Register as Employee (via Postman)

```json
{
  "name": "Rob Stark",
  "email": "rob@example.com",
  "password": "123456",
  "role": "employee",
  "manager_id": 1
}
```

### ✅ Register as Manager (via Postman)

```json
{
  "name": "John Snow",
  "email": "johna@example.com",
  "password": "admin123",
  "role": "manager"
}
```

- Ensure the `manager_id` exists in the database when registering an employee.
- You can test this by first registering a manager and using their returned `id`.

---

## 🔐 Authentication

- JWT stored in localStorage
- Role-based dashboard: `/employee` or `/manager`
- Protected routes with middleware

---

## 📷 Screenshots

<table border="0" cellspacing="0" cellpadding="10">
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/72f3237d-9aac-4fb2-8a86-1f151dc30bd0" width="100%" />
      <div><strong>Landing Page</strong></div>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/4576ec68-4566-41ad-add1-00e1b9f3953b" width="100%" />
      <div><strong>Employee Dashboard</strong></div>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/68e83e72-4954-4fdd-b66d-183447188573" width="100%" />
      <div><strong>Calendar View</strong></div>
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/f2e7c0ca-8b24-4c9f-90be-c2e33099be87" width="100%" />
      <div><strong>Manager Dashboard</strong></div>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/1e0e3856-f689-4ce9-a9ad-4d8338948bb7" width="100%" />
      <div><strong>Leave Application Form</strong></div>
    </td>
    <td align="center" valign="top">
      <img width="1766" height="802" alt="image" src="https://github.com/user-attachments/assets/af0329ac-5941-45d9-9b32-3b3f44d6d5c1" />
      <div><strong>Login Page</strong></div>
    </td>
    <td></td>
  </tr>
</table>






---

> Developed by Gaurav Patil 💼
