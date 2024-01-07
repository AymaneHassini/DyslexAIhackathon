import React, { useState } from 'react';
import '../css/Register.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import the auth from your firebase config
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User created:', userCredential.user);
        navigate('/hello-world'); // Redirect to the Hello World page after successful registration
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      });
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1>SIGN UP</h1>
        <form onSubmit={handleRegister}>
        
          <div className="form-field">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>
          <button type="submit" className="submit-btn">Sign up</button>
        </form>
        <p className="login-link">Already a member? <a href="/login">Login here!</a></p>
      </div>
    </div>
  );
}

export default Register;
