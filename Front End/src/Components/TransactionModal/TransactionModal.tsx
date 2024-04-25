import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { MemberActionContext } from "@/Providers/ManageMembers/context";
import { LibrarianAuthActionContext } from "@/Providers/AuthLibrarian/context";
import { BookActionContext } from "@/Providers/ManageBooks/context";
import { ITransactionCreate, TransactionActionContext } from "@/Providers/ManageTransactions/context";

const TransactionModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allMemberData, setAllMemberData] = useState<any>([]);
  const [allBookData, setAllBookData] = useState<any>([]);
  const [duration, setDuration] = useState<any>();
  const [cost, setCost] = useState<number>(0);
  const [amountOfBooks, setAmountOfBooks] = useState<number>(0)
  const { getAllMembers } = useContext(MemberActionContext);
  const { getAllBooks } = useContext(BookActionContext);
  const { createTransaction } = useContext(TransactionActionContext);

  useEffect(() => {
    getAllMembers()
      .then((response) => {
        console.log(response);

        if (response && response.result) {
          setAllMemberData(
            response.result.map((member) => ({
              key: member.id,
              name: member.firstName,
              surname: member.lastName,
              email: member.email,
              username: member.username,
              credits: member.credits,
            }))
          );
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching Members:', error);
      });
    getAllBooks()
      .then((response) => {
        console.log(response);

        if (response?.result) {
          setAllBookData(
            response.result.map((book) => ({
              key: book.book.id,
              name: book.book.title
            }))
          );
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching Books:', error);
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

  const { styles, cx } = useStyles();

  function addWeeksToDate(date: Date, weeks: number): Date {
    const newDate = new Date(date); // Create a new Date object to avoid mutating the original date
    newDate.setDate(newDate.getDate() + weeks * 7); // Add the specified number of days (weeks * 7) to the date
    return newDate;
  }

  var userId = Number.parseInt(localStorage.getItem('userId'));
  var currentDate = new Date();

  const onFinish = (values: any) => {
    const returnDate = addWeeksToDate(currentDate, values.duration);
    const input: ITransactionCreate = { cost: cost, userId: userId, memberId: values.member, returnDate: returnDate, bookIds: values.book}
    console.log('values', values);
    createTransaction(input).then((response) => {
      handleOk();
      window.location.reload();
    });

  }

  const handleBookSelectionChange = (selectedBooks: any) => {
    setAmountOfBooks(selectedBooks.length); // Update amountOfBooks when book selection changes
    setCost(49.99 * selectedBooks.length * duration)
  };

  const handleWeeksChange = (value: any) => {
    setDuration(value); // Update state variable when the value changes
    setCost(49.99 * amountOfBooks * value);
  };

  useEffect(()=>{

  },[cost])


  // console.log('member', allMemberData)
  // console.log('cost', cost);
  
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
        footer={null}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Member"
            name='member'>
            <Select
              showSearch
            >
              {allMemberData.map((member: any) => (
                <Select.Option key={member.key} value={member.key} label={member.name}>
                  {member.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Book"
            name='book'>
            <Select
              showSearch
              mode="multiple"
              onChange={handleBookSelectionChange}
            >
              {console.log('allBooks', allBookData)}
              {allBookData.map((book: any) => (
                <Select.Option key={book.key} value={book.key}>
                  {book.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Duration"
            name='duration'>
            <InputNumber
              onChange={handleWeeksChange} // Call handleWeeksChange function when the value changes
              min={0}
              placeholder="Weeks"
              value={duration} // Set the value of InputNumber to the state variable 
              > 
            </InputNumber>
          </Form.Item>
          <Form.Item
            label='Cost'
            name='cost'
            >
            <input value={cost} style={{display: 'none'}}/>
            <Input 
            defaultValue={`R${cost.toFixed(2)}`}
            value={`R${cost.toFixed(2)}`}
            disabled={true}
            ></Input>
          </Form.Item>
          <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
            Submit
          </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default TransactionModal;
