import React, { useState } from 'react';
import { Input, Button } from 'antd';

const EmailForm = ({ onSave }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

                                                                                                                               // Ad ve Soyad için sadece harfleri ve boşluğu kabul et
    if ((name === 'firstName' || name === 'lastName') && /[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/.test(value)) { 
      return;                                                                                                                 // sayı veya özel karakter varsa ekleme
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Tüm alanlar doldurulmalıdır!');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Geçerli bir email giriniz!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5213/api/EmailUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Kayıt başarısız');

      alert('Başarıyla kaydedildi!');
      setFormData({ firstName: '', lastName: '', email: '' });

      if (onSave) onSave(); // Home.js’deki kullanıcı listesini anında güncelle
    } catch (err) {
      alert(err.message);
    }
  };

  const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: '12px' };
  const labelStyle = { width: '70px', textAlign: 'right', marginRight: '8px' };
  const inputStyle = { flex: 1, height: '32px' };
  const buttonContainerStyle = { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' };

  return (
    <div style={{ padding: '10px', maxWidth: '400px' }}>
      <div style={rowStyle}>
        <div style={{ ...labelStyle, color: 'red' }}>Ad:</div>
        <Input
          name="firstName"
          placeholder="Adı"
          value={formData.firstName}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <div style={{ ...labelStyle, color: 'red' }}>Soyad:</div>
        <Input
          name="lastName"
          placeholder="Soyadı"
          value={formData.lastName}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
       <div style={{ ...labelStyle, color: 'red' }}>E-mail:</div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={buttonContainerStyle}>
        <Button color='red' variant='solid' onClick={handleSave}>Kaydet</Button>
      </div>
    </div>
  );
};

export default EmailForm;
