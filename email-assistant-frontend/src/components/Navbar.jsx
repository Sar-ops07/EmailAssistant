import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="glass-nav">
      <h2 className="nav-logo">Email AI Assistant</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/generate">Generate</Link>
        <Link to="/history">History</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
