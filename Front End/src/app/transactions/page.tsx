"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Layout, Flex, TableProps, Tag, Space } from 'antd'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import SideMenu from '@/Components/SideMenu/SideMenu'
import { Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IAllTransactionResponse, TransactionActionContext } from '@/Providers/ManageTransactions/context'
import TransactionModal from '@/Components/TransactionModal/TransactionModal'
const Dashboard: React.FC = () => {
  const { Header, Footer, Content } = Layout;
  const [allTransactionData, setAllTransactionData] = useState<any>([]);
  const { getAllTransactions } = useContext(TransactionActionContext);

  useEffect(() => {
    getAllTransactions()
      .then((response) => {
        console.log(response);

        if (response) {
          setAllTransactionData(
            response.result.map((transaction) => ({
              key: transaction.id,
              librarian: transaction.librarianName,
              member: transaction.memberUsername,
              book: transaction.bookNames || [],
              date: transaction.borrowDate,
              returnDate: transaction.returnDate,
              cost: transaction.cost,
            }))
          );
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching genres:', error);
      });
  }, []);


  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day} ${month} ${year} `;
  }


  interface DataType {
    key: string;
    member: string;
    book: string[];
    date: string;
    returnDate: string;
    status: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Librarian',
      dataIndex: 'librarian',
      key: 'librarian',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Books',
      key: 'books',
      dataIndex: 'books',
      render: (_, { book }) => (
        <>
          {book.map((book) => {
            let color = 'green';
            return (
              <Tag color={color} key={book}>
                {book.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: ((text) => <p>R {text}</p>)
    },
    {
      title: 'Borrow Date',
      dataIndex: 'date',
      key: 'date',
      render: ((text) => <p>{formatDate(text)}</p>)
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (text) => (
        <p>
          {formatDate(text)}
        </p>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_) => (
        <Space size="middle">
          <a style={{ color: 'green' }}><EditOutlined /></a>
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
            <SideMenu current={'transactions'} />
            <div className={styles.dashboardContent}>
              <h1>Transactions</h1>
              <div className={styles.buttonSection}>
                <TransactionModal />
              </div>
              <div className={styles.tableSection}>
                <Table pagination={{
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  defaultPageSize: 8,
                }} columns={columns} dataSource={allTransactionData} />
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