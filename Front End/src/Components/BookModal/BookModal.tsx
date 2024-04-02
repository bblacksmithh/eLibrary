import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";

const BookModal = () => {
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


  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Add Book"
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
          <Form.Item label="Title">
            <Input placeholder="Book Title"></Input>
          </Form.Item>
        <Form.Item label="Author">
            <Input placeholder="Author"></Input>
        </Form.Item>
          <Form.Item label="ISBN">
            <Input placeholder="ISBN"></Input>
          </Form.Item>
          <Form.Item label="Condition">
            <Select placeholder='Condition'></Select>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BookModal;
