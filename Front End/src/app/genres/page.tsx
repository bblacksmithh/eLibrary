"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Layout, Flex, TableProps, Tag, Space } from 'antd'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import SideMenu from '@/Components/SideMenu/SideMenu'
import {Table} from 'antd'
import { Span } from 'next/dist/trace'
import { DeleteOutlined } from '@ant-design/icons'
import { GenreActionContext, IGenreResponse } from '@/Providers/ManageGenres/context'
import GenreModal from '@/Components/GenreModal/GenreModal'
const Dashboard: React.FC = () => {
  const {Header, Footer, Content} = Layout;
  const [allGenres, setAllGenres] = useState<IGenreResponse>();
  const [allGenreData, setAllGenreData] = useState<any>([]);
  const {getAllGenres, deleteGenre} = useContext(GenreActionContext);
  
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
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleDeleteGenre = (genreId: string) => {
    // Call deleteGenre function with the genreId
    deleteGenre({id: genreId})
      .then(() => {
        // Handle deletion success
        console.log(`Genre with ID ${genreId} deleted successfully.`);
        window.location.reload();
      })
      .catch((error) => {
        // Handle deletion error
        console.error(`Error deleting genre with ID ${genreId}:`, error);
      });
  };

  interface DataType {
    key: string;
    genre: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleDeleteGenre(record.key); // Pass the genre ID to the handleDeleteGenre function
            }} 
            style={{color:'red'}}
          >
            <DeleteOutlined />
          </a>
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
            <Image className={styles.logo} src={logo} alt=''/>
            <h1 className={styles.heading}>eLibrary</h1>
          </div>
        </div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.mainContainer}>
          <SideMenu current='genres'/>
          <div className={styles.dashboardContent}>
            <h1>Genres</h1>
            <div className={styles.buttonSection}>
              <GenreModal/>
            </div>
            <div className={styles.tableSection}>
              <Table style={{width:'100%'}} pagination={{
              position: ["bottomCenter"],
              defaultCurrent: 1,
              defaultPageSize: 8,
            }} columns={columns} dataSource={allGenreData}/>
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