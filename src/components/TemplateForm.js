import React, { useState } from 'react';
import { Layout, Input, Button } from 'antd';

const { Content } = Layout;

const TemplateForm = () => {
  const [template, setTemplate] = useState({
    title: '',
    html: ''
  });

  const handleChange = (e) => {
    setTemplate(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5213/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      });

      if (!res.ok) throw new Error('Kayıt başarısız oldu.');

      alert('Template başarıyla kaydedildi!');
      setTemplate({ title: '', html: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Content style={{ padding: 24, maxWidth: 600 }}>
      <h2>Template Oluştur</h2>

      <Input
        placeholder="Template Başlığı"
        name="title"
        value={template.title}
        onChange={handleChange}
        style={{ marginBottom: 12 }}
      />

      <Input.TextArea
        placeholder="Template HTML Metni"
        rows={8}
        name="html"
        value={template.html}
        onChange={handleChange}
        style={{ marginBottom: 12 }}
      />

      <Button type="primary" onClick={handleSave}>Save</Button>
    </Content>
  );
};

export default TemplateForm;
