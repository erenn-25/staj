import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import logo from '../assets/logo.png';

const { Header, Content } = Layout;

const Home = () => {
    const navigate = useNavigate();

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
                <Button onClick={() => navigate('/templates')} style={{ marginRight: '60px' }}>
                    Templates
                </Button>
                <Button type="primary" onClick={() => navigate('/send')}>Send Mail</Button>
            </Header>

            <Content style={{ padding: '24px' }}>
                <h1>Buton seçiniz</h1>
            </Content>
        </>
    );
};

export default Home;
