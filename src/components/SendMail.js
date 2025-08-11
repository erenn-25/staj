// src/components/SendMail.js
import React, { useState, useEffect } from 'react';
import { Layout, Select, Button, List, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const { Header, Content } = Layout;
const { Option } = Select;

const SendMail = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Template'leri çek
    fetch('http://localhost:5213/api/Templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(err => message.error('Template verisi alınamadı'));

    // Kullanıcıları çek
    fetch('http://localhost:5213/api/EmailUsers')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => message.error('Kullanıcı verisi alınamadı'));
  }, []);

  const handleAddUser = () => {
    const user = users.find(u => u.id === selectedUserId);
    if (user && !selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(prev => [...prev, user]);
    }
  };

  const handleSend = async () => {
    if (!selectedTemplateId || selectedUsers.length === 0) {
      message.warning("Template ve kullanıcı seçmelisin.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5213/api/SendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          userIds: selectedUsers.map(u => u.id),
        }),
      });

      if (!response.ok) throw new Error("Gönderim hatası");

      message.success("Mail başarıyla gönderildi ve kaydedildi.");
      setSelectedUsers([]);
      setSelectedTemplateId(null);
    } catch (err) {
      message.error(err.message);
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
        <Button onClick={() => navigate('/email')} style={{ marginRight: '60px' }}>E-mail</Button>
        <Button onClick={() => navigate('/templates')} style={{ marginRight: '60px' }}>Templates</Button>
        <Button type="primary">Send Mail</Button>
      </Header>

      <Content style={{ padding: 24 }}>
        <h2>Send Mail</h2>

        <div style={{ marginBottom: 16 }}>
          <Typography.Text strong>Template Seç:</Typography.Text>
          <Select
            placeholder="Template Seç"
            style={{ width: 300 }}
            value={selectedTemplateId}
            onChange={setSelectedTemplateId}
          >
            {templates.map(t => (
              <Option key={t.id} value={t.id}>{t.title}</Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Typography.Text strong>Kullanıcı Seç:</Typography.Text>
          <Select
            placeholder="Kullanıcı Seç"
            style={{ width: 300 }}
            value={selectedUserId}
            onChange={setSelectedUserId}
          >
            {users.map(u => (
              <Option key={u.id} value={u.id}>{u.firstName} {u.lastName}</Option>
            ))}
          </Select>
          <Button onClick={handleAddUser} style={{ marginLeft: 10 }}>Add</Button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Typography.Text strong>Seçilen Kullanıcılar:</Typography.Text>
          <List
            bordered
            dataSource={selectedUsers}
            renderItem={user => (
              <List.Item>{user.firstName} {user.lastName} ({user.email})</List.Item>
            )}
            style={{ width: 400 }}
          />
        </div>

        <Button type="primary" onClick={handleSend}>Send</Button>
      </Content>
    </>
  );
};

export default SendMail;