'use client'

import { Layout, Menu, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react'
import styles from './styles/styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import ExploreIcon from '@mui/icons-material/Explore';
import { ExploreNavbar } from '@/Components/ExploreNavbar/ExploreNavbar';
import BookTile from '@/Components/BookTile/BookTile';
import { Showcase } from '@/Components/Showcase/Showcase';

const Explore: React.FC = () => {
  const [current, setCurrent] = useState('explore');

  const items: MenuProps['items'] = [
    {
      label: 'Explore',
      key: 'explore',
      icon: <ExploreIcon/>,
    },
    {
      label: 'Trending',
      key: 'trending',
      icon: <ExploreIcon/>
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
  <main className={styles.main}>
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headingContainer}>
          <div className={styles.logoContainer}>
            <Image className={styles.logo} src={logo} alt=''/>
            <h1 className={styles.heading}>eLibrary</h1>
          </div>
          <div className={styles.menuContainer}>
            <ExploreNavbar current={current}/>
          </div>
        </div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.showcase}>
          <Showcase/>
        </div>
        <h1 className={styles.contentheading}>Explore</h1>
        <div className={styles.exploreContent}>
        <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
            <BookTile/>
        </div>
      </Content>
      <Footer className={styles.footer}>

      </Footer>
    </Layout>
  </main>
  );
}

export default Explore