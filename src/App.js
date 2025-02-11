import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Search from "./pages/Search"; // Replace with actual Search component
import StudentHome from "./pages/StudentHome"; // Replace with your student home component
import './App.css';

// Header Component
const Header = () => {
  return (
    <header className="header">
      <h1>QuickLib</h1>
      <nav role="navigation">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 QuickLib. All rights reserved.</p>
      <p>Contact: support@quicklib.com</p>
    </footer>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Wrap everything in app-container */}
        <Header />
        <div className="content"> {/* This div will take up the remaining space */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/search" element={<Search />} />
            <Route path="/student-home" element={<StudentHome />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
