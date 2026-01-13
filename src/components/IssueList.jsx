import { useEffect, useState } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "../styles/IssueList.css";

export default function IssueList() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    useEffect(() => {
        const q = query(
            collection(db, "issues"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setIssues(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Apply filters
    const filteredIssues = issues.filter((issue) => {
        const statusMatch =
            statusFilter === "All" || issue.status === statusFilter;

        const priorityMatch =
            priorityFilter === "All" || issue.priority === priorityFilter;

        return statusMatch && priorityMatch;
    });

    const updateStatus = async (issue, newStatus) => {
        // Rule enforcement
        if (issue.status === "Open" && newStatus === "Done") {
            alert("Please move the issue to 'In Progress' before marking it as Done.");
            return;
        }

        try {
            await updateDoc(doc(db, "issues", issue.id), {
                status: newStatus,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <p>Loading issues...</p>;

    return (
        <div className="issue-list">
            <h3>All Issues</h3>

            {/* Filters */}
            <div className="issue-filters">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="All">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>


            {loading && <p className="loading">Loading issues...</p>}
            {filteredIssues.length === 0 && <p className="no-issues">No issues found.</p>}

            <div className="issue-grid">
                {filteredIssues.map((issue) => (
                    <div key={issue.id} className="issue-card">
                        <h4 className="issue-title">{issue.title}</h4>
                        <p className="issue-description">{issue.description}</p>

                        <div className="issue-meta">
                            <div className="issue-meta-row">
                                <span className={`priority-badge priority-${issue.priority.toLowerCase()}`}>
                                    {issue.priority}
                                </span>
                                <span className={`status-badge status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                                    {issue.status}
                                </span>
                            </div>
                            <div className="assigned-meta">
                                <b>Assigned To:</b> {issue.assignedTo || "Not assigned"}
                            </div>
                        </div>

                        <p className="issue-footer">
                            Created by {issue.createdBy}
                        </p>

                        <div className="issue-actions">
                            <button
                                className="status-btn btn-progress"
                                onClick={() => updateStatus(issue, "In Progress")}
                                disabled={issue.status === "In Progress"}
                            >
                                In Progress
                            </button>

                            <button
                                className="status-btn btn-done"
                                onClick={() => updateStatus(issue, "Done")}
                                disabled={issue.status === "Done"}
                            >
                                Done
                            </button>

                            <button
                                className="status-btn btn-open"
                                onClick={() => updateStatus(issue, "Open")}
                                disabled={issue.status === "Open"}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>


    );
}
