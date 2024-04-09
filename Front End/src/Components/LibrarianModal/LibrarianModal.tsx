import React, { useContext, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { ILibrarianCreate, LibrarianAuthActionContext } from "@/Providers/AuthLibrarian/context";
import { LibrarianAuthActions } from "@/Providers/AuthLibrarian/action";
import { ok } from "assert";

const LibrarianModal: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

const {create} = useContext(LibrarianAuthActionContext);



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

  const onFinish = (values:any) => {
    const input: ILibrarianCreate = {firstName: values.firstName, lastName: values.lastName, email: values.email, username: values.username, password: values.password}
    console.log('create',input);
    create(input).then((response)=> {
      handleOk();
      window.location.reload();
    });
  
  }

  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Create Librarian
      </Button>
      <Modal
        title="Add Librarian"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          autoComplete="off"
        >
          <Form.Item 
          name='firstName'
          label="First Name">
            <Input 
            placeholder="First Name"></Input>
          </Form.Item>
        <Form.Item 
        name='lastName'
        label="Last Name">
            <Input placeholder="Last Name"></Input>
        </Form.Item>
          <Form.Item 
          name='email'
          label="Email">
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item 
          name='username'
          label="Username">
            <Input placeholder="Username"></Input>
          </Form.Item>
          <Form.Item 
          name='password'
          label="Password">
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

export default LibrarianModal;
