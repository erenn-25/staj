import React, { useState } from 'react';
import { Select, Button, List, Typography, message } from 'antd';

const { Option } = Select;

const SendMail = ({ users, templates, groups }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [msgApi, contextHolder] = message.useMessage();

  const handleAddUserOrGroup = () => {
    if (!selectedTemplateId) {
      msgApi.warning("Önce template seçmelisin!");
      return;
    }

    const template = templates.find(t => t.id === selectedTemplateId);

    if (selectedGroupId) {
      const group = groups.find(g => g.id === selectedGroupId);
      if (group && !selectedUsers.find(u => u.id === `group-${group.id}` && u.templateId === selectedTemplateId)) {
        setSelectedUsers(prev => [
          ...prev,
          {
            id: `group-${group.id}`,
            name: group.name,
            isGroup: true,
            users: group.users,
            templateId: selectedTemplateId,
            templateTitle: template.title
          }
        ]);
      }
    } else if (selectedUserId) {
      const user = users.find(u => u.id === selectedUserId);
      if (user && !selectedUsers.find(u => u.id === user.id && u.templateId === selectedTemplateId)) {
        setSelectedUsers(prev => [
          ...prev,
          {
            ...user,
            isGroup: false,
            templateId: selectedTemplateId,
            templateTitle: template.title
          }
        ]);
      }
    }
  };

  const handleSend = async () => {
    if (selectedUsers.length === 0) {
      msgApi.warning("En az bir kullanıcı veya grup eklemelisin.");
      return;
    }

    try {
      for (let item of selectedUsers) {
        const recipients = item.isGroup ? item.users.map(u => u.email) : [item.email];

        const response = await fetch('http://localhost:5213/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipients: recipients,
            templateSubject: item.templateTitle,
            templateBody: templates.find(t => t.id === item.templateId).html
          }),
        });

        if (!response.ok) throw new Error("Gönderim hatası");
      }

      msgApi.success("📧 Mailler başarıyla gönderildi :)");
      setSelectedUsers([]);
      setSelectedTemplateId(null);
      setSelectedUserId(null);
      setSelectedGroupId(null);
    } catch (err) {
      msgApi.error(err.message);
    }
  };

  const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: 16 };

  return (
    <div style={{ padding: 10 }}>
      {contextHolder}

      {/* Grup Seç */}
      <div style={rowStyle}>
        <Typography.Text strong style={{ color: 'red', width: 120 }}>Grup Seç:</Typography.Text>
        <Select
          placeholder="Grup Seç"
          style={{ width: 300 }}
          value={selectedGroupId}
          onChange={setSelectedGroupId}
          allowClear
        >
          {groups.map(g => (
            <Option key={g.id} value={g.id}>{g.name}</Option>
          ))}
        </Select>
      </div>

      {/* Template Seç */}
      <div style={rowStyle}>
        <Typography.Text strong style={{ color: 'red', width: 120 }}>Template Seç:</Typography.Text>
        <Select
          placeholder="Template Seç"
          style={{ width: 300 }}
          value={selectedTemplateId}
          onChange={setSelectedTemplateId}
        >
          {templates.map(t => (<Option key={t.id} value={t.id}>{t.title}</Option>))}
        </Select>
      </div>

      {/* Kullanıcı Seç + Listeye Ekle */}
      <div style={rowStyle}>
        <Typography.Text strong style={{ color: 'red', width: 120 }}>Kullanıcı Seç:</Typography.Text>
        <Select
          placeholder="Kullanıcı Seç"
          style={{ width: 300 }}
          value={selectedUserId}
          onChange={setSelectedUserId}
        >
          {users.map(u => (<Option key={u.id} value={u.id}>{u.firstName} {u.lastName}</Option>))}
        </Select>
        <Button color="red" variant='solid' style={{ marginLeft: 20 }} onClick={handleAddUserOrGroup}>
          Listeye ekle
        </Button>
      </div>

      {/* Seçilen kullanıcılar / gruplar */}
      <div style={{ marginBottom: 16 }}>
        <Typography.Text strong style={{ color: 'red' }}>Seçilen Kullanıcılar / Gruplar</Typography.Text>
        <List
          bordered
          dataSource={selectedUsers}
          renderItem={item => (
            <List.Item>
              {item.isGroup ? `Grup: ${item.name}` : `${item.firstName} ${item.lastName} (${item.email})`}
              {item.templateTitle && ` - Template: ${item.templateTitle}`}
            </List.Item>
          )}
          style={{ width: 500, marginTop: 8 }}
        />
      </div>

      {/* Gönder butonu sağ alt */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        <Button color="red" variant='solid' onClick={handleSend}>Gönder</Button>
      </div>
    </div>
  );
};

export default SendMail;
