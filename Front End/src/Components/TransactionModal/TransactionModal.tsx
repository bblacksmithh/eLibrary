import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { MemberActionContext } from "@/Providers/ManageMembers/context";

const TransactionModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allMemberData, setAllMemberData] = useState<any>([]);
  const [memberOptionData, setMemberOptionData] = useState([]);
  const { getAllMembers } = useContext(MemberActionContext);

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

          console.log('resp', response.result);
          const memberOptions = allMemberData.map((member: any) => ({
            value: member.Id,
            label: member.username
          }));
          setMemberOptionData(memberOptions);
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

  const { styles, cx } = useStyles();


  console.log('member',allMemberData)
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
                showSearch
            >
              {allMemberData.map((member: any) => (
                <Select.Option key={member.key} value={member.username}>
                  {member.username}
                </Select.Option>
              ))}
            </Select>
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
            <InputNumber min={0} placeholder="Weeks"></InputNumber>
          </Form.Item>
          <Form.Item
            label='Cost'
            name='cost'>
            <Input disabled={true}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default TransactionModal;
