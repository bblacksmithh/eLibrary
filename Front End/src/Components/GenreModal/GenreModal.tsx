import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";

const GenreModal = () => {
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
        title="Add Genre"
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
          <Form.Item label="Genre">
            <Input placeholder="Enter new genre"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default GenreModal;
