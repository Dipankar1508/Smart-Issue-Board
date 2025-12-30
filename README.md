# 🧠 Smart Issue Board

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
│   │
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── CreateIssue.css
│   │   └── IssueList.css
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
<img width="1894" height="852" alt="image" src="https://github.com/user-attachments/assets/3ac0fb00-8fcd-44c9-a8e4-51ec29443be6" />

<img width="1896" height="860" alt="image" src="https://github.com/user-attachments/assets/a94fe293-5a7c-4c6f-b685-5d97d131dd5a" />

<img width="1897" height="775" alt="image" src="https://github.com/user-attachments/assets/a76faa0b-f013-422e-ad5f-716cfcaca0a3" />

<img width="1897" height="763" alt="image" src="https://github.com/user-attachments/assets/9948189e-ac74-4d49-aec6-754760058b27" />

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
