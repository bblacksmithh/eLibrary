import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";

const AddCreditsModal = () => {
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
        title="Add Librarian"
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
          <Form.Item label="Member">
            <Select placeholder='Member'></Select>
            </Form.Item>
            <Form.Item label="Credits">
            <InputNumber placeholder="Credits"></InputNumber>
            </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default AddCreditsModal;
