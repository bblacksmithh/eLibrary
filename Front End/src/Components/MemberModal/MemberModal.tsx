import React, { useContext, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { IMemberCreate, MemberActionContext } from "@/Providers/ManageMembers/context";

const MemberModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {createMember} = useContext(MemberActionContext);



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values:any) => {
    const input: IMemberCreate = {firstName: values.firstName, lastName: values.lastName, email: values.email, username: values.username, credits: values.credits, password: values.password}
    console.log('create',input);
    createMember(input).then((response)=> {
      handleOk();
      window.location.reload();
    });
  
  }

  const { styles, cx } = useStyles();

  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Create Member
      </Button>
      <Modal
        title="Add Member"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="First Name"
          name='firstName'>
            <Input placeholder="First Name"></Input>
          </Form.Item>
        <Form.Item label="Last Name"
        name='lastName'>
            <Input placeholder="Last Name"></Input>
        </Form.Item>
          <Form.Item label="Email"
          name='email'>
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label="Credits"
          name='credits'>
            <InputNumber placeholder="Credits"></InputNumber>
          </Form.Item>
          <Form.Item label="Username"
          name='username'>
            <Input placeholder="Password"></Input>
            </Form.Item>
          <Form.Item label="Password"
          name='password'>
            <Input placeholder="Password" type='password'></Input>
            </Form.Item>
            <Button htmlType="submit" style={{margin:'auto', display:'block'}}>
              Submit
            </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default MemberModal;
