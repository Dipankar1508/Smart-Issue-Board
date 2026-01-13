import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Auth.css";

export default function Auth({ onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onAuthSuccess();
        } catch (err) {
            const friendlyError = err.code === 'auth/user-not-found'
                ? "No account found with this email."
                : err.message;
            setError(friendlyError);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-visual-side">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                    <div className="brand-badge">Smart Issue Board v1.0</div>
                    <h1>Organize issues <br /><span>with intelligence.</span></h1>
                    <ul className="feature-list">
                        {/* <li>✦ AI-Powered Duplicate Detection</li> */}
                        <li>✦ Smart Workflow Enforcement</li>
                        <li>✦ Priority-Based Sorting</li>
                    </ul>
                </div>
            </div>

            <div className="auth-form-side">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
                        <p>{isLogin ? "Welcome back! Please enter your details." : "Join us to start managing issues smarter."}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="actual-form">
                        <div className="input-block">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={60}
                                required
                            />
                        </div>

                        <div className="input-block">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Set a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={100}
                                required
                            />
                        </div>

                        {error && <div className="error-pill">{error}</div>}

                        <button type="submit" className="main-submit-btn">
                            {isLogin ? "Login to Dashboard" : "Get Started"}
                        </button>
                    </form>

                    <p className="toggle-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Sign up" : "Log in"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}