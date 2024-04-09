import React, { useState } from "react";
import { Button, DatePicker, Form, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";

const TransactionModal = () => {
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
        Create Transaction
      </Button>
      <Modal
        title="Add Transaction"
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
            <Select
                fieldNames={{ label: "name", value: "id" }}
                showSearch
                options={[
                    { label: 'Member1', value: 'member1' },
                    { label: 'Member2', value: 'member2' }
                ]}
            />
          </Form.Item>
        <Form.Item label="Book">
            <Select
                fieldNames={{ label: "name", value: "id" }}
                mode="multiple"
                showSearch
                options={[
                    { label: 'Book1', value: 'book1' },
                    { label: 'Book2', value: 'book2' }
                ]}
            />
        </Form.Item>
          <Form.Item label="Date">
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item label="Duration">
            <InputNumber min={0}></InputNumber>
            <text> (Weeks)</text>
          </Form.Item>
          <Form.Item label="Librarian">
            <Select
                fieldNames={{ label: "name", value: "id" }}
                showSearch
                options={[
                    { label: 'Librarian1', value: 'Librarian1' },
                    { label: 'Librarian2', value: 'Librarian2' }]}
            />
            </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default TransactionModal;
