import React, { useState } from 'react';
import '../css/Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is logged in
        console.log('User logged in:', userCredential.user);
        navigate('/survey'); // Redirect to the Hello World page after successful login
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Error signing in:', errorMessage);

        // Provide user feedback based on the error code
        switch (errorCode) {
          case 'auth/user-not-found':
            alert("No user found with this email. Please register.");
            navigate('/register');
            break;
          case 'auth/wrong-password':
            alert("Wrong password. Please try again.");
            break;
          case 'auth/invalid-email':
            alert("Invalid email. Please check and try again.");
            break;
          case 'auth/invalid-credential':
            alert("Invalid credential. If you're sure about your email and password, please try registering.");
            navigate('/register'); // Optionally, you can navigate them to register page
            break;
          default:
            // For other errors
            alert(errorMessage);
            break;
        }
      });
  };




  return (
    <div className="login-container">
      <div className="login-content">
        <h1>LEXIMAGIC</h1>
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-options">
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="submit-btn">Sign in</button>
        </form>
        <p className="register-link">Not a member? <a href="/register">Register now!</a></p>
      </div>
    </div>
  );
}

export default Login;
