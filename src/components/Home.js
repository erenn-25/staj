import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Modal,
  Table,
  Card,
  Typography,
  Space,
  Progress,
  Row,
  Col,
} from "antd";
import { BarChartOutlined, LinkOutlined } from "@ant-design/icons";
import axios from "axios";
import logo from "../assets/logo.png";

import EmailForm from "./EmailForm";
import TemplateForm from "./TemplateForm";
import SendMail from "./SendMail";
import GroupForm from "./GroupForm";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const [clickData, setClickData] = useState([]);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchClickData = async () => {
    try {
      const res = await axios.get("http://localhost:5213/api/Phishing/all");
      setClickData(res.data);
    } catch (err) {
      console.error("Click verisi çekme hatası:", err);
    }
  };

  const fetchUsers = () => {
    fetch("http://localhost:5213/api/EmailUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  const fetchTemplates = () => {
    fetch("http://localhost:5213/api/Templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error(err));
  };

  const fetchGroups = () => {
    fetch("http://localhost:5213/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchClickData();
    fetchUsers();
    fetchTemplates();
    fetchGroups();
  }, []);

  const columns = [
    {
      title: "🔗 Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <Space>
          <LinkOutlined style={{ color: "#1890ff" }} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "📊 Tıklama Sayısı",
      dataIndex: "clickcount",
      key: "clickCount",
      sorter: (a, b) => a.clickcount - b.clickcount,
      render: (count) => {
        const max = Math.max(...clickData.map((item) => item.clickcount), 1);
        const percent = Math.round((count / max) * 100);

        let color = "#4caf50";
        if (percent > 66) color = "#d32f2f";
        else if (percent > 33) color = "#ff9800";

        return (
          <div style={{ width: 200 }}>
            <span
              style={{
                fontWeight: "bold",
                color: color,
                display: "block",
                marginBottom: 4,
              }}
            >
              {count}
            </span>
            <Progress
              percent={percent}
              size="small"
              strokeColor={color}
              strokeWidth={12}
              showInfo={false}
            />
          </div>
        );
      },
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B455B6"];

  return (
    <>
      {/* Header */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          height: "90px",
          padding: "0 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "93px", marginRight: "50px" }}
        />
        <Space>
          <Button
            type="primary"
            danger
            style={{ borderRadius: 8 }}
            onClick={() => setIsEmailOpen(true)}
          >
            @️ E-mail
          </Button>
          <Button
            type="primary"
            danger
            style={{ borderRadius: 8 }}
            onClick={() => setIsTemplateOpen(true)}
          >
            📝 Templates
          </Button>
          <Button
            type="primary"
            danger
            style={{ borderRadius: 8 }}
            onClick={() => setIsSendOpen(true)}
          >
            📩 Send Mail
          </Button>
          <Button
            type="primary"
            danger
            style={{ borderRadius: 8 }}
            onClick={() => setIsGroupModalOpen(true)}
          >
            👥 Grup Oluştur
          </Button>
        </Space>
      </Header>

      {/* Content */}
      <Content
        style={{
          padding: "40px",
          backgroundColor: "#f5f5f5",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <Card
          style={{
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", color: "#d32f2f", marginBottom: 20 }}
          >
            <BarChartOutlined style={{ marginRight: 8 }} />
            Link Tıklama İstatistikleri
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <Table
                columns={columns}
                dataSource={clickData}
                rowKey="id"
                pagination={false}
                bordered
                style={{ borderRadius: 12, overflow: "hidden" }}
              />
            </Col>
            <Col span={12}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={clickData}
                    dataKey="clickcount"
                    nameKey="link"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                  >
                    {clickData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Card>
      </Content>

      {/* Email Modal */}
      <Modal
        title={
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
            E-mail Form
          </span>
        }
        open={isEmailOpen}
        onCancel={() => setIsEmailOpen(false)}
        footer={null}
        width={600}
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        bodyStyle={{ borderRadius: 12, padding: 24 }}
      >
        <EmailForm onSave={fetchUsers} />
      </Modal>

      {/* Template Modal */}
      <Modal
        title={
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
            Template Oluştur
          </span>
        }
        open={isTemplateOpen}
        onCancel={() => setIsTemplateOpen(false)}
        footer={null}
        width={700}
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        bodyStyle={{ borderRadius: 12, padding: 24 }}
      >
        <TemplateForm onSave={fetchTemplates} />
      </Modal>

      {/* Send Mail Modal */}
      <Modal
        title={
          <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
            Mail Gönder
          </span>
        }
        open={isSendOpen}
        onCancel={() => setIsSendOpen(false)}
        footer={null}
        width={700}
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        bodyStyle={{ borderRadius: 12, padding: 24 }}
      >
        <SendMail users={users} templates={templates} groups={groups} />
      </Modal>

      {/* Grup Oluştur Modalı */}
      <GroupForm
        visible={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onGroupCreated={fetchGroups}
        users={users}
      />
    </>
  );
};

export default Home;
