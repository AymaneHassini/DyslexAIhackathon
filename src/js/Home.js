import React from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import the auth from your firebase config

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to LexiMagic</h1>
        <div className="navigation">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
