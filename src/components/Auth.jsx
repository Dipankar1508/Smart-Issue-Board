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

    const handleSubmit = async () => {
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onAuthSuccess();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">
                {isLogin ? "Login" : "Sign Up"}
            </h2>

            <input
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-button" onClick={handleSubmit}>
                {isLogin ? "Login" : "Create Account"}
            </button>

            <p
                className="auth-toggle"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Login"}
            </p>
        </div>
    );
}
