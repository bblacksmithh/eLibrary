"use client"
import React from 'react'
import styles from './styles.module.scss'
import { Layout, Flex, TableProps, Tag, Space } from 'antd'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import SideMenu from '@/Components/SideMenu/SideMenu'
import {Table} from 'antd'
const Dashboard: React.FC = () => {
  const {Header, Footer, Content} = Layout;
  
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <main className={styles.main}>
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headingContainer}>
          <div className={styles.logoContainer}>
            <Image className={styles.logo} src={logo} alt=''/>
            <h1 className={styles.heading}>eLibrary</h1>
          </div>
        </div>
      </Header>
      <Content className={styles.content}>
        <h1 className={styles.mainHeader}>Dashboard</h1>
        <div className={styles.mainContainer}>
          <SideMenu current=''/>
          <div className={styles.dashboardContent}>
            <div className={styles.tableSection}>
              <Image width={100} style={{marginBottom:'20px', border:'green 1px dashed', padding:'20px'}} src={logo} alt='logo'/>
              <h1>Welcome to eLibrary Dashboard! <br />This is where all admin functionalities are performed <br />The menu located on the left side of the screen contains <br />all the necessary admin controls for your library <br /><br />Reach out to any of the contact details provided below for any support enquiries. <br /><br /><span ><h1>Cell no: 0649095192 <br />Email: jacques.blaauw@boxfusion.io</h1></span></h1>
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