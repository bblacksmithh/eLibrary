"use client"
import { ExploreNavbar } from "@/Components/ExploreNavbar/ExploreNavbar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../../../public/logo.png";
import styles from "./Styles/search.module.scss";
import {Input} from "antd";
import { SearchProps } from "antd/es/input/Search";
import BookTile from "@/Components/BookTile/BookTile";
import { BookActionContext, ISearchResponse } from "@/Providers/ManageBooks/context";
import { WidthFull } from "@mui/icons-material";

const Search: React.FC = () => {
    const [current, setCurrent] = useState('search');
    const {Search} = Input;
    const {searchBookByTitle} = useContext(BookActionContext);
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        searchBookByTitle(value)
            .then((response) => {
                const searchResponse = response.result;
                setSearchResults(searchResponse); 
            })
            .catch(e => {
                console.error('Error searching for book', e)
            })
            setHasSearched(true);
    }
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
                    {searchResults.length? searchResults.map((book) => (
                            <BookTile 
                            bookTitle={book.title}
                            bookAuthor={book.author}
                            description={book.description}
                            genres={[book.genreIds]}
                            isbn={book.isbn}
                            key={book.id}
                            rating={book.rating}/>
                        )):!hasSearched?<p style={{border:'green 1px solid', padding:'20px', margin:'auto', fontSize:'20px', width:'100%', textAlign:'center', color:'white'}}>Search for a book</p>:<p style={{border:'green 1px solid', padding:'20px', margin:'auto', fontSize:'20px', width:'100%', textAlign:'center', color:'white'}}>No Book found for your search criteria</p>}
                    </div>
                </Content>
                <Footer className={styles.footer}>

                </Footer>
            </Layout>
        </main>
    );
}

export default Search;