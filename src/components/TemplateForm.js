import React, { useState } from 'react';
import { Input, Button } from 'antd';

const TemplateForm = ({ onSave }) => {
  const [template, setTemplate] = useState({ title: '', html: '' });

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

      if (onSave) onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: 12 };
  const labelStyle = { width: '140px', textAlign: 'right', marginRight: '8px', color: 'red', lineHeight: '32px' };
  const inputStyle = { flex: 1 };

  return (
    <div style={{ padding: '10px', maxWidth: '600px' }}>
      {/* Template Başlığı */}
      <div style={rowStyle}>
        <div style={labelStyle}>Template Başlığı:</div>
        <Input
          placeholder="Template Başlığı"
          name="title"
          value={template.title}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Template HTML Metni */}
      <div style={rowStyle}>
        <div style={{ ...labelStyle, paddingTop: '6px', lineHeight: 'normal' }}>Template HTML:</div>
        <Input.TextArea
          placeholder="Template HTML Metni"
          rows={6}
          name="html"
          value={template.html}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Kaydet Butonu sağ alt */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="red" variant='solid' onClick={handleSave}>Kaydet</Button>
      </div>
    </div>
  );
};

export default TemplateForm;
