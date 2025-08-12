import React, { useState } from 'react';
import { Input, Button } from 'antd';

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
    <div style={{ padding: '10px', maxWidth: '600px' }}>
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
    </div>
    //kaydet butonuna basınca handlesave çağırılıyor ve veri kaydediliyor
  );
};

export default TemplateForm;
