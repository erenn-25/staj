// src/components/EmailForm.js
import React, { useState } from 'react';
import { Layout, Button, Input } from 'antd';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const EmailForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5213/api/EmailUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Kayıt başarısız');

      alert('Başarıyla kaydedildi!');
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100px',
        padding: '0 24px'
      }}>
        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '60px' }} />
        <Button onClick={() => navigate('/email')} style={{ marginRight: '60px' }}>
          E-mail
        </Button>
        <Button style={{ marginRight: '60px' }}>Templates</Button>
        <Button type="primary">Send Mail</Button>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '400px' }}>
        <h2>E-mail Form</h2>
        <Input
          name="firstName"
          placeholder="Adı"
          value={formData.firstName}
          onChange={handleChange}
          style={{ marginBottom: '12px' }}
        />
        <Input
          name="lastName"
          placeholder="Soyadı"
          value={formData.lastName}
          onChange={handleChange}
          style={{ marginBottom: '12px' }}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: '12px' }}
        />
        <Button type="primary" onClick={handleSave}>Save</Button>
      </Content>
    </>
  );
};

export default EmailForm;