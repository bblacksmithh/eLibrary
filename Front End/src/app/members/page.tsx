"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Layout, Flex, TableProps, Tag, Space } from 'antd'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import SideMenu from '@/Components/SideMenu/SideMenu'
import { Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IMemberResponse, MemberActionContext } from '@/Providers/ManageMembers/context'
import MemberModal from '@/Components/MemberModal/MemberModal'
import AddCreditsModal from '@/Components/AddCredits/AddCreditsModal'

const Dashboard: React.FC = () => {
  const { Header, Footer, Content } = Layout;
  const [allMember, setAllMembers] = useState<IMemberResponse>();
  const [allMemberData, setAllMemberData] = useState<any>([]);
  const { getAllMembers, deleteMember } = useContext(MemberActionContext);

  useEffect(() => {
    getAllMembers()
      .then((response) => {
        setAllMembers(response);
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
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleDeleteMember = (memberId: string) => {
    // Call deleteGenre function with the genreId
    deleteMember({id: memberId})
      .then(() => {
        // Handle deletion success
        console.log(`Member with ID ${memberId} deleted successfully.`);
        window.location.reload();
      })
      .catch((error:any) => {
        // Handle deletion error
        console.error(`Error deleting member with ID ${memberId}:`, error);
      });
  };

  interface DataType {
    key: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    credits: number;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
      render: (value) => {
        return (
          <p>R {value}</p>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: 'red' }}
          onClick={() => {
            handleDeleteMember(record.key); // Pass the member ID to the handleDeleteGenre function
          }} 
          ><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.headingContainer}>
            <div className={styles.logoContainer}>
              <Image className={styles.logo} src={logo} alt='' />
              <h1 className={styles.heading}>eLibrary</h1>
            </div>
          </div>
        </Header>
        <Content className={styles.content}>
          <div className={styles.mainContainer}>
            <SideMenu current='members' />
            <div className={styles.dashboardContent}>
              <h1>Members</h1>
              <div className={styles.buttonSection}>
                <MemberModal/>
                <AddCreditsModal/>
              </div>
              <div className={styles.tableSection}>
                <Table pagination={{
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  defaultPageSize: 8,
                }} columns={columns} dataSource={allMemberData} />
              </div>
            </div>
          </div>
        </Content>
        <Footer className={styles.footer}>

        </Footer>
      </Layout>
    </main>
  )
}

export default Dashboard