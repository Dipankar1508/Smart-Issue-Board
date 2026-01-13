## 🧠 Smart Issue Board

A modern, responsive **Issue Tracking Web Application** built using **React** and **Firebase**, designed to help teams create, manage, and track issues efficiently.

---

## 🚀 Features

### 🔐 Authentication

- Email & Password authentication using Firebase Auth
- Secure login and signup flow
- User session handling with auto login/logout

### 📝 Issue Management

- Create new issues with:

  - Title
  - Description
  - Priority (Low / Medium / High)
  - Status (Open / In Progress / Done)
  - Assigned user

- Duplicate issue detection using **smart title similarity check**
- Real-time issue updates using Firestore listeners

### 📋 Issue List

- View all issues in real time
- Sort issues by **newest first**
- Filter issues by:

  - Status
  - Priority

- Update issue status with rule enforcement:

  - ❌ Cannot move directly from **Open → Done**
  - ✅ Must go through **In Progress**

### 🎨 UI & UX

- Clean, card-based modern UI
- Fully responsive (Desktop / Tablet / Mobile)
- Separate CSS files for maintainability
- Smooth hover effects and transitions

---

## 🛠 Tech Stack

| Technology           | Usage                    |
| -------------------- | ------------------------ |
| **React (Vite)**     | Frontend framework       |
| **Firebase Auth**    | User authentication      |
| **Cloud Firestore**  | Real-time database       |
| **CSS**              | Styling & responsiveness |
| **JavaScript (ES6)** | Application logic        |

---

## 📁 Project Structure

```
smart-issue-board/
│
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── CreateIssue.jsx
│   │   └── IssueList.jsx
│   │   └── Footer.jsx
│   │
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── CreateIssue.css
│   │   └── IssueList.css
│   │   └── Footer.css
│   │
│   ├── firebase.js
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── .env
├── package.json
└── README.md
```

---

## 📸 Screenshots

<img width="1919" height="858" alt="image" src="https://github.com/user-attachments/assets/486344bf-8b71-4b33-9e64-56fb0ef71a05" />

<img width="1898" height="858" alt="image" src="https://github.com/user-attachments/assets/baa5c91f-96e4-4e44-a3e6-85262252357f" />

<img width="1897" height="861" alt="image" src="https://github.com/user-attachments/assets/23eb1120-4e5d-4e11-9a33-8d8a66c7c300" />

<img width="1900" height="868" alt="image" src="https://github.com/user-attachments/assets/98343135-02b5-4947-b3fa-d43b2c1d7c8f" />

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dipankar1508/Smart-Issue-Board.git
cd smart-issue-board
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Firebase

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit `.env` files to GitHub.

---

### 4️⃣ Run the App

```bash
npm run dev
```

Open:
👉 `http://localhost:5173`

---

## 🔒 Firestore Security Rules (Basic)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /issues/{issueId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🧪 Key Validations & Rules

- Title & Description are mandatory
- Smart duplicate detection before issue creation
- Status transition rule:

  - Open → In Progress → Done

- Real-time UI updates via Firestore listeners

---

## 📌 Future Improvements (Optional)

- User-based issue visibility
- Role-based access (Admin / User)
- Comments on issues
- Dark mode
- Search by title
- Pagination

---

## 👨‍💻 Author

**Dipankar Sarkar**
Built as a learning + demonstration project using modern frontend and cloud technologies.

---

## 📄 License

This project is for **educational and demonstration purposes**.
