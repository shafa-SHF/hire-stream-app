import React, { useState } from 'react';
import { Mail, Twitter, Facebook, Instagram, Youtube, ChevronUp } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import logo1 from './assets/ebay-logo.png'; 
import logo2 from './assets/amazon-logo.png';
import logo3 from './assets/georgia-tech logo.png';
import logo4 from './assets/microsoft-logo.png';
import logo5 from './assets/tesla-logo-png_seeklogo-365010.png';

// --- 1. NEW HOME COMPONENT ---
// Move all your main page content here
const Home = ({ searchTerm, setSearchTerm, locationTerm, setLocationTerm, handleSearch, isSearched, filteredJobs }) => (
  <>
    <header className="hero">
      <h1>FIND THE JOB THAT FITS YOUR LIFE</h1>
      <div className="search-wrapper">
        <input 
          className="search-input" 
          placeholder="Job title, keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input 
          className="search-input" 
          placeholder="Location"
          value={locationTerm}
          onChange={(e) => setLocationTerm(e.target.value)}
        />
        <button className="btn-search" onClick={handleSearch}>SEARCH</button>
      </div>
      <p className="browse-hint">
        Browse job offers by <span className="highlight">Category</span> or <span className="highlight">Location</span>
      </p>
    </header>

    <section className="opportunities">
      <h2 className="results-count">
        {isSearched ? (
          <>Found <span>{filteredJobs.length}</span> positions based on your search</>
        ) : (
          "Featured Opportunities"
        )}
      </h2>
      <div className="job-grid">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3 className="job-title">{job.title}</h3>
            <p className="company">{job.company}</p>
            <div className="job-tags">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
            </div>
            <a href="#" className="explore">Explore Job →</a>
          </div>
        ))}
      </div>
    </section>

    <section className="recruiters">
      <p className="section-subtitle">COMPANIES</p>
      <h2 className="section-title">Our Top Recruiters</h2>
      <div className="logo-grid">
        <div className="logo-card"><img src={logo1} alt="eBay" /></div>
        <div className="logo-card"><img src={logo2} alt="Amazon" /></div>
        <div className="logo-card"><img src={logo3} alt="Georgia-tech" /></div>
        <div className="logo-card"><img src={logo4} alt="Microsoft" /></div>
        <div className="logo-card"><img src={logo5} alt="Tesla" /></div>
      </div>
    </section>
  </>
);

// --- 2. SIMPLE JOBS COMPONENT ---
const JobsPage = () => <div style={{padding: '100px', textAlign: 'center'}}><h2>Jobs Listing Page Coming Soon!</h2></div>;

function App() {
  const allJobs = [
    { id: 1, title: "Senior Software Engineer", company: "HireStream Tech", location: "Remote", salary: "Rp 15.000.000 - Rp 25.000.000" },
    { id: 2, title: "IT Staff / IT Officer", company: "PT. FM Global Logistics", location: "Jakarta", salary: "Rp 6.000.000 - Rp 8.000.000" },
    { id: 3, title: "UI/UX Designer", company: "Creative Stream", location: "Bandung", salary: "Rp 10.000.000 - Rp 14.000.000" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = () => {
    const filtered = allJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
    setIsSearched(true);
  };

  return (
    <Router>
      <div className="app-container">
        {/* THE NAVBAR (Only one!) */}
        <nav className="navbar">
          <div className="logo">HIRESTREAM</div>
          <div className="nav-menu">
            <div className="nav-links">
              <Link to="/" className="nav-item">Home</Link>
              <Link to="/jobs" className="nav-item">Jobs</Link>
              <Link to="/career-advice" className="nav-item">Career Advice</Link>
            </div>
            <div className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <span className="divider">/</span>
              <Link to="/signup" className="signup-link">Sign Up</Link>
              <button className="btn-post-job">+ Post A Job</button>
            </div>
          </div>
        </nav>

        {/* THE WINDOW THAT CHANGES */}
        <Routes>
          <Route path="/" element={
            <Home 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              locationTerm={locationTerm}
              setLocationTerm={setLocationTerm}
              handleSearch={handleSearch}
              isSearched={isSearched}
              filteredJobs={filteredJobs}
            />
          } />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/login" element={<div style={{padding: '100px', textAlign: 'center'}}><h2>Login Page</h2></div>} />
        </Routes>

        <footer className="footer">
  <div className="footer-content">
    {/* Section 1: Contact */}
    <div className="footer-section">
      <h3>Contact Info</h3>
      <div className="contact-item">
        <Mail size={20} />
        <div>
          <p className="subtitle">DO YOU HAVE A QUESTION?</p>
          <p className="info-text">info@hirestream.com</p>
        </div>
      </div>
      <div className="social-links">
        <p className="subtitle">SOCIALS NETWORK</p>
        <div className="icons">
          <Twitter size={20} /> <Facebook size={20} /> <Instagram size={20} /> <Youtube size={20} />
        </div>
      </div>
    </div>

    {/* Section 2: Links */}
    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li>Home</li>
        <li>Jobs</li>
        <li>Sectors</li>
      </ul>
    </div>

    {/* Section 3: Company */}
    <div className="footer-section">
      <h3>Our Company</h3>
      <ul>
        <li>About Us</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© Copyright 2026 HireStream. All rights reserved</p>
  </div>
</footer>
        

        <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <ChevronUp size={24} />
        </button>
      </div>
    </Router>
  );
}

export default App;