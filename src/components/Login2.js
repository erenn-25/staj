import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login2.css";                                                                                                      // Login2.css dosyan doğru yerde olmalı
import logo from "../assets/ziratech_logo.png";                                                                               // logo gerçekten bu klasörde olmalı

const Login2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      setError("");
      navigate("/home");                                                                                                                           // Home sayfasına yönlendirme
    } else {
      setError("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div className="login2-container">
      <div className="login2-box">
        <img src={logo} alt="Logo" style={{ width: "180px", marginBottom: "20px" }} />
        <h2>Yönetici Girişi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
        {error && <div className="message">{error}</div>}
      </div>
    </div>
  );
};

export default Login2;
