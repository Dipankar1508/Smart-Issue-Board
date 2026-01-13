import { useState } from "react";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/CreateIssue.css";

export default function CreateIssue({ user }) {
    if (!user) return null;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("Open");
    const [assignedTo, setAssignedTo] = useState("");

    const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    const isSimilarTitle = (newTitle, existingTitle) => {
        const newWords = normalize(newTitle).split(" ");
        const existing = normalize(existingTitle);
        return newWords.some((word) => word.length > 3 && existing.includes(word));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Title and Description are required");
            return;
        }
        try {
            const snapshot = await getDocs(collection(db, "issues"));
            const similarIssues = snapshot.docs.filter((doc) =>
                isSimilarTitle(title, doc.data().title)
            );
            if (similarIssues.length > 0) {
                const confirmCreate = window.confirm(
                    `Similar issue(s) found (${similarIssues.length}). Do you want to continue?`
                );
                if (!confirmCreate) return;
            }
            await addDoc(collection(db, "issues"), {
                title,
                description,
                priority,
                status,
                assignedTo,
                createdBy: user.email,
                createdAt: serverTimestamp(),
            });
            setTitle(""); setDescription(""); setPriority("Low"); setStatus("Open"); setAssignedTo("");
            alert("Issue created successfully ✅");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="dashboard-container-full">

            <form onSubmit={handleCreate} className="issue-form-grid-full">
                <section className="section-main-full">
                    <div className="form-card-full">
                        <div className="form-row">
                            <label>Issue Title</label>
                            <input
                                className="issue-input"
                                placeholder="Summary of the problem..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={60}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label>Description</label>
                            <textarea
                                className="issue-textarea-full"
                                placeholder="Steps to reproduce, expected behavior, etc."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={250}
                                required
                            />
                        </div>
                    </div>
                </section>

                <aside className="section-sidebar-full">
                    <div className="sidebar-card-full">
                        <div className="form-row">
                            <label>Priority</label>
                            <select className="issue-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Status</label>
                            <select className="issue-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Done</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <label>Assigned To</label>
                            <input
                                className="issue-input"
                                placeholder="User email or name"
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                                maxLength={60}
                                required
                            />
                        </div>

                        <button type="submit" className="issue-submit-btn">
                            Publish Issue
                        </button>
                    </div>
                </aside>
            </form>
        </div>
    );
}