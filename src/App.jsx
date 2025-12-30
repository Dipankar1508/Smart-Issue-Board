import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import CreateIssue from "./components/CreateIssue";
import IssueList from "./components/IssueList";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (!user) return <Auth onAuthSuccess={() => { }} />;

  return (
    <main className="app-main">
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-left">
            <div className="logo-badge">SIB</div>

            <div className="nav-text">
              <h2 className="nav-title">Smart Issue Board</h2>
              <span className="nav-user">
                {user.email}
              </span>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </nav>

        <CreateIssue user={user} />
        <IssueList />
      </div>
    </main>

  );

}
