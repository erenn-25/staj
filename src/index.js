// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'; // antd stil sıfırlama
import './index.css'; // kendi stil dosyan (boş olabilir)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
