import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";

const MemberModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { styles, cx } = useStyles();

  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Add Member"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
        >
          <Form.Item label="First Name">
            <Input placeholder="First Name"></Input>
          </Form.Item>
        <Form.Item label="Last Name">
            <Input placeholder="Last Name"></Input>
        </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label="National ID">
            <Input placeholder="National ID"></Input>
          </Form.Item>
          <Form.Item label="Credits">
            <InputNumber placeholder="Credits"></InputNumber>
          </Form.Item>
          <Form.Item label="Password">
            <Input placeholder="Password" type='password'></Input>
            </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default MemberModal;
