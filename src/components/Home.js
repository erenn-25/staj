import React, { useState } from 'react';
import { Layout, Button, Modal } from 'antd';
import logo from '../assets/logo.png';

// Form bileşenleri
import EmailForm from './EmailForm';
import TemplateForm from './TemplateForm';
import SendMail from './SendMail';

const { Header, Content } = Layout;

const Home = () => {
    // Modal state'leri
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);
    const [isSendOpen, setIsSendOpen] = useState(false);

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

                <Button onClick={() => setIsEmailOpen(true)} style={{ marginRight: '60px' }}>
                    E-mail
                </Button>

                <Button onClick={() => setIsTemplateOpen(true)} style={{ marginRight: '60px' }}>
                    Templates
                </Button>

                <Button type="primary" onClick={() => setIsSendOpen(true)}>
                    Send Mail
                </Button>
            </Header>

            <Content style={{ padding: '24px' }}>
                <h1>Yukarıdaki Butonlardan birini seçiniz</h1>
            </Content>

            {/* Email Modal */}
            <Modal
                title="E-mail Form"
                open={isEmailOpen}
                onCancel={() => setIsEmailOpen(false)}
                footer={null}
                width={600}
            >
                <EmailForm />
            </Modal>

            {/* Template Modal */}
            <Modal
                title="Template Oluştur"
                open={isTemplateOpen}
                onCancel={() => setIsTemplateOpen(false)}
                footer={null}
                width={700}
            >
                <TemplateForm />
            </Modal>

            {/* Send Mail Modal */}
            <Modal
                title="Send Mail"
                open={isSendOpen}
                onCancel={() => setIsSendOpen(false)}
                footer={null}
                width={700}
            >
                <SendMail />
            </Modal>
        </>
    );
};

export default Home;
