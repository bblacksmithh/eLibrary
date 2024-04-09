import React, { useContext, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { GenreActionContext, IGenreCreate } from "@/Providers/ManageGenres/context";

const GenreModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {createGenre} = useContext(GenreActionContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    const input: IGenreCreate = {genreName: values.genre}
    console.log('create',input);
    createGenre(input).then((response)=> {
      handleOk();
      console.log(response);
      window.location.reload();
    });
  }

  const { styles, cx } = useStyles();

  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Add Genre
      </Button>
      <Modal
        title="Add Genre"
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
          <Form.Item
            name='genre'
            label="Genre">
            <Input placeholder="Enter new genre"></Input>
          </Form.Item>
          <Button htmlType="submit" style={{margin:'auto', display:'block'}}>
              Submit
            </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default GenreModal;
