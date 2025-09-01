import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";                                              // Ant Design'dan ikon
import "./LandingPage.css";

import logo from "../assets/ziratech_logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="Logo" className="landing-logo" />
      </header>

      <section className="landing-hero">
        <h1>Ziraat Teknoloji Oltalama Maili Gönderme Sistemi</h1>
        <p></p>

        <button
          className="admin-btn"
          onClick={() => navigate("/login2")}
        >
          <LockOutlined style={{ marginRight: "8px" }} />
          Yönetici Girişi Yap
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
