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

const Dashboard: React.FC = () => {
  const { Header, Footer, Content } = Layout;
  const [allMember, setAllMembers] = useState<IMemberResponse>();
  const [allMemberData, setAllMemberData] = useState<any>([]);
  const { getAllMembers } = useContext(MemberActionContext);

  useEffect(() => {
    getAllMembers()
      .then((response) => {
        setAllMembers(response);
        console.log(response);

        if (response && response.result && response.result.items) {
          setAllMemberData(
            response.result.items.map((member) => ({
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
          <text>R {value}</text>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: 'red' }}><DeleteOutlined /></a>
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