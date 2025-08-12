import React, { useState, useEffect } from 'react';
import { Select, Button, List, Typography, message } from 'antd';

const { Option } = Select;

const SendMail = () => {
  const [templates, setTemplates] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5213/api/Templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(() => message.error('Template verisi alınamadı'));

    fetch('http://localhost:5213/api/EmailUsers')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => message.error('Kullanıcı verisi alınamadı'));
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
      const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
      if (!selectedTemplate) {
        message.error("Template bulunamadı.");
        return;
      }

      const recipientEmails = selectedUsers.map(u => u.email);

      const response = await fetch('http://localhost:5213/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: recipientEmails,
          templateSubject: selectedTemplate.title,
          templateBody: selectedTemplate.html
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
    <div style={{ padding: 10 }}>
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
    </div>
  );
};

export default SendMail;
