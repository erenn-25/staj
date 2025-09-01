import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';   
import Login2 from './components/Login2'; 
import LandingPage from './components/LandingPage'; // yeni eklenen

function App() {
  return (
    <Router>
      <Routes>
        {/* Açılışta Landing Page gelsin */}
        <Route path="/" element={<LandingPage />} />  

        <Route path="/login2" element={<Login2 />} /> 
        <Route path="/home" element={<Home />} />     
        <Route path="/login" element={<Login />} />   
      </Routes>
    </Router>
  );
}

export default App;
