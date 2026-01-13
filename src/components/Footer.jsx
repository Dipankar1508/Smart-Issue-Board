import "../styles/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="brand-text">
                        <h3>Smart Issue Board</h3>
                        <p>Simple. Smart. Efficient.</p>
                    </div>
                </div>

                <div className="footer-links">
                    <a href="#" className="footer-link">About</a>
                    <a href="#" className="footer-link">Privacy</a>
                    <a href="#" className="footer-link">Terms</a>
                    <a href="#" className="footer-link">Support</a>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Smart Issue Board. Made with ❤️ for developers.</p>
                </div>
            </div>
        </footer>
    );
}
