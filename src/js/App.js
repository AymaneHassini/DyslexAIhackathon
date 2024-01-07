import React, { useEffect } from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 
import ImageButtons from './ImageButtons';
import SurveyComponent from './SurveyComponent';
function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('User is signed out');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<SurveyComponent />} />
          <Route path="/imagebuttons" element={<Navigate to="/game/html.html" />} replace={true}/> {/* Added ImageButton route */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
