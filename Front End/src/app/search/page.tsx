"use client"
import { ExploreNavbar } from "@/Components/ExploreNavbar/ExploreNavbar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/logo.png";
import styles from "./Styles/search.module.scss";
import {Input} from "antd";
import { SearchProps } from "antd/es/input/Search";
import BookTile from "@/Components/BookTile/BookTile";

const Search: React.FC = () => {
    const [current, setCurrent] = useState('search');
    const {Search} = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <main className={styles.main}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div className={styles.headingContainer}>
                        <div className={styles.logoContainer}>
                            <Image className={styles.logo} src={logo} alt='' />
                            <h1 className={styles.heading}>eLibrary</h1>
                        </div>
                        <div className={styles.menuContainer}>
                            <ExploreNavbar current={current} />
                        </div>
                    </div>
                </Header>
                <Content className={styles.content}>
                    <h1 className={styles.contentheading}>Search</h1>
                    <div className={styles.searchContainer}>

                    <Search className={styles.search} placeholder="input search text" onSearch={onSearch} enterButton />
                    </div>
                    <div className={styles.searchContent}>
{/* books here */}
                    </div>
                </Content>
                <Footer className={styles.footer}>

                </Footer>
            </Layout>
        </main>
    );
}

export default Search;