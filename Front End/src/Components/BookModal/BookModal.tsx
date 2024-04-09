import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { GenreActionContext, IGenreResponse } from "@/Providers/ManageGenres/context";
import { BookActionContext, IBookCreate } from "@/Providers/ManageBooks/context";

const BookModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allGenres, setAllGenres] = useState<IGenreResponse>();
  const [allGenreData, setAllGenreData] = useState<any>([]);
  const { getAllGenres, deleteGenre } = useContext(GenreActionContext);
  const [options, setOptions] = useState([]);

  const {createBook} = useContext(BookActionContext)

  useEffect(() => {
    getAllGenres()
      .then((response) => {
        setAllGenres(response);
        console.log(response);

        if (response && response.result && response.result.items) {
          setAllGenreData(
            response.result.items.map((genre) => ({
              key: genre.id,
              genre: genre.genreName,
            }))
          );
          const optionData = response.result.items.map((genre: any) => ({
            value: genre.id,
            label: genre.genreName
          }))
          setOptions(optionData);
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching genres:', error);
      });
  }, []);

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
    const input: IBookCreate = { title: values.title, author: values.author, isbn: values.isbn, genreIds: [values.genre] }
    console.log('create', input);
    createBook(input).then((response) => {
      handleOk();
      console.log(response);
      // window.location.reload();
    });
  }

  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Add Book
      </Button>
      <Modal
        title="Add Book"
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
          <Form.Item label="Title" name='title'>
            <Input placeholder="Book Title"></Input>
          </Form.Item>
          <Form.Item label="Author" name='author'>
            <Input placeholder="Author"></Input>
          </Form.Item>
          <Form.Item label="ISBN" name='isbn'>
            <Input placeholder="ISBN"></Input>
          </Form.Item>
          <Form.Item label='Genre'
            name='genre'>
            <Select placeholder='Genre'>
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Condition"
            name='condition'>
            <Select placeholder='Condition'>
              <Select.Option key='Excellent' value='Excellent'>Excellent</Select.Option>
              <Select.Option key='Good' value='Good'>Good</Select.Option>
              <Select.Option key='Fair' value='Fair'>Fair</Select.Option>
              <Select.Option key='Poor' value='Poor'>Poor</Select.Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
            Submit
          </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default BookModal;
