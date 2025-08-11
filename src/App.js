import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailForm from './components/EmailForm';
import TemplateForm from './components/TemplateForm';
import SendMail from './components/SendMail';
import Home from './components/Home'; // <-- yeni ekledik

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email" element={<EmailForm />} />
        <Route path="/templates" element={<TemplateForm />} />
        <Route path="/send" element={<SendMail />} />
      </Routes>
    </Router>
  );
}

export default App;
