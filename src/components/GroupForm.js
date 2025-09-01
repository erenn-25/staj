import React, { useState } from "react";
import { Modal, Button, Select, Input, message } from "antd";
import axios from "axios";

const { Option } = Select;

const GroupForm = ({ visible, onClose, onGroupCreated, users }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = () => {
    if (!groupName || selectedUsers.length === 0) {
      message.error("Grup adı ve kullanıcı seçimi gerekli!");
      return;
    }

    axios.post("http://localhost:5213/api/groups", {
      name: groupName,
      userIds: selectedUsers
    })
      .then(res => {
        message.success("Grup oluşturuldu!");
        onGroupCreated(); // grup listesi güncellensin
        onClose();
        setGroupName("");
        setSelectedUsers([]);
      })
      .catch(err => console.log(err));
  };

  return (
    <Modal
      title={<span style={{ color: 'red' }}>Grup Oluştur</span>}
      open={visible}
      onCancel={onClose}
      onOk={handleCreateGroup}
      okText="Oluştur"
      okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
      cancelText="İptal"
      cancelButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red', color: 'white' } }}
    >
      <Input
        placeholder="Grup Adı"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Select
        mode="multiple"
        placeholder="Kullanıcıları seç"
        style={{ width: "100%" }}
        value={selectedUsers}
        onChange={setSelectedUsers}
      >
        {users.map(u => (
          <Option key={u.id} value={u.id}>{u.email}</Option>
        ))}
      </Select>
    </Modal>
  );
};

export default GroupForm;
