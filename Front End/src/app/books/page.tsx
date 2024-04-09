  "use client"
  import React, { useContext, useEffect, useState } from 'react'
  import styles from './styles.module.scss'
  import { Layout, Flex, TableProps, Tag, Space } from 'antd'
  import Image from 'next/image'
  import logo from '../../../public/logo.png'
  import SideMenu from '@/Components/SideMenu/SideMenu'
  import { Table } from 'antd'
  import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
  import { BookActionContext, IBookResponse } from '@/Providers/ManageBooks/context'
import BookModal from '@/Components/BookModal/BookModal'
  const Dashboard: React.FC = () => {
    const { Header, Footer, Content } = Layout;
    const [allBooks, setAllBooks] = useState<IBookResponse>();
    const [allBookData, setAllBookData] = useState<any>([]);
    const {getAllBooks, deleteBook} = useContext(BookActionContext);

    useEffect(() => {
      getAllBooks()
        .then((response) => {
          setAllBooks(response);
          if (response && response.result && response.result.items) {
            setAllBookData(
              response.result.items.map((book) => ({
                key: book.id,
                title: book.title,
                author: book.author,
                condition: book.condition,
                genres: book.genreIds
              }))
            );
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching books:', error);
        });
    }, []);
    const handleDeleteBook = (bookId: string) => {
      // Call deleteGenre function with the genreId
      deleteBook({id: bookId})
        .then(() => {
          // Handle deletion success
          console.log(`Book with ID ${bookId} deleted successfully.`);
          window.location.reload();
        })
        .catch((error) => {
          // Handle deletion error
          console.error(`Error deleting book with ID ${bookId}:`, error);
        });
    };

    interface DataType {
      key: string;
      title: string;
      author: string;
      isbn: string;
      condition: string,
      genres: string[]
    }

    const columns: TableProps<DataType>['columns'] = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <a>{text}</a>
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: 'Condition',
        dataIndex: 'condition',
        key: 'condition',
      },
      {
        title: 'Genres',
        key: 'genres',
        dataIndex: 'genres',
        render: (_, { genres }) => (
          <>
            {genres?.map((genre) => {
              let color = 'green';
              return (
                <Tag color={color} key={genre}>
                  {genre.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => {
          return (
            <Space size="middle">
              <a style={{ color: 'red' }}
              onClick={() => {
                handleDeleteBook(record.key); // Pass the book ID to the handleDeleteGenre function
              }} 
              ><DeleteOutlined /></a>
            </Space>
          )
        },
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
              <SideMenu current='books' />
              <div className={styles.dashboardContent}>
                <h1>Books</h1>
                <div className={styles.buttonSection}>
                  <BookModal/>
                </div>
                <div className={styles.tableSection}>
                  <Table pagination={{
                    position: ["bottomCenter"],
                    defaultCurrent: 1,
                    defaultPageSize: 8,
                  }}
                    scroll={{ y: '100%' }} columns={columns} dataSource={allBookData} />
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