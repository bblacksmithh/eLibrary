"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Layout, Flex, TableProps, Tag, Space } from 'antd'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import SideMenu from '@/Components/SideMenu/SideMenu'
import { Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import LibrarianModal from '@/Components/LibrarianModal/LibrarianModal'
import { IAllLibrarianResponse, ILibrarianAuthResponse, LibrarianAuthActionContext } from '@/Providers/AuthLibrarian/context'
const Dashboard: React.FC = () => {
  const [current, setCurrent] = useState('librarians')
  const { Header, Footer, Content } = Layout;
  const [allLibrarians, setAllLibrarians] = useState<IAllLibrarianResponse>();
  const [allLibrarianData, setAllLibrarianData] = useState<any>([]);
  const { getAllLibrarians, deleteLibrarian } = useContext(LibrarianAuthActionContext);

  useEffect(() => {
    getAllLibrarians()
      .then((response) => {
        setAllLibrarians(response);
        console.log(response);

        if (response) {
          setAllLibrarianData(
            response.result.map((librarian) => ({
              key: librarian.id,
              username: librarian.username,
              name: librarian.firstName,
              surname: librarian.lastName,
              email: librarian.email,
            }))
          );
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleDeleteLibrarian = (librarianId: string) => {
    // Call deleteGenre function with the genreId
    deleteLibrarian({id: librarianId})
      .then(() => {
        // Handle deletion success
        console.log(`Librarian with ID ${librarianId} deleted successfully.`);
        window.location.reload();
      })
      .catch((error) => {
        // Handle deletion error
        console.error(`Error deleting librarian with ID ${librarianId}:`, error);
      });
  };

  interface DataType {
    key: string;
    username: string,
    name: string;
    surname: string;
    email: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'Name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: 'red' }}
          onClick={() => {
            handleDeleteLibrarian(record.key); // Pass the genre ID to the handleDeleteGenre function
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
            <SideMenu current='librarians' />
            <div className={styles.dashboardContent}>
              <h1>Librarians</h1>
              <div className={styles.buttonSection}>
                <LibrarianModal />
              </div>
              <div className={styles.tableSection}>
                <Table pagination={{
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  defaultPageSize: 8,
                }} columns={columns} dataSource={allLibrarianData} />
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