import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useStyles } from "./Styles/Style";
import { IAddCredits, MemberActionContext } from "@/Providers/ManageMembers/context";

const AddCreditsModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allMemberData, setAllMemberData] = useState<any>([]);
  const { addCredits } = useContext(MemberActionContext);
  const { getAllMembers } = useContext(MemberActionContext);

  useEffect(() => {
    getAllMembers()
      .then((response) => {

        if (response?.result) {
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

  const onFinish = (values: any) => {
    var input: IAddCredits = { memberId: values.member, credits: values.credits }
    console.log(values)
    addCredits(input).then((response) => {
      handleOk();
      window.location.reload();
    })
  }
  console.log('allmember', allMemberData);
  return (
    <main className="main">
      <Button type="primary" onClick={showModal}>
        Add Credits
      </Button>
      <Modal
        title="Add Librarian"
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
                <Select.Option key={member.key} value={member.key}>
                  {member.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Credits"
            name='credits'>
            <InputNumber placeholder="Credits"></InputNumber>
          </Form.Item>
          <Button htmlType="submit" style={{ margin: 'auto', display: 'block' }}>
            Submit
          </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default AddCreditsModal;
