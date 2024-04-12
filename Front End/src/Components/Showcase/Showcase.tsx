import { Carousel } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BookTile from "../BookTile/BookTile";
import { useStyles } from "./Styles/Styles";
import { BookActionContext, ITopTwelveResponse } from "@/Providers/ManageBooks/context";
export const Showcase: React.FC = () => {

    const [topFive, setTopFive] = useState<ITopTwelveResponse>();
    const { getTopTwelve } = useContext(BookActionContext)

    const [firstSlide, setFirstSlide] = useState([]);
    const [secondSlide, setSecondSlide] = useState([]);
    const [thirdSlide, setThirdSlide] = useState([]);

    useEffect(() => {
        getTopTwelve()
            .then((response) => {
                console.log('res',response)
                setTopFive(response);
                setFirstSlide(response?.result.slice(0, 3));
                setSecondSlide(response?.result.slice(3, 6));
                setThirdSlide(response?.result.slice(6, 9));
            })
            .catch((e) => {
                console.log(e.message);
            })
    }, [])
    console.log(topFive)


    const contentStyle: React.CSSProperties = {
        height: '45px',
        color: 'green',
        lineHeight: '20px',
        textAlign: 'center',
        background: 'transparent',
    };
    const { styles, cx } = useStyles();
    return (

        <main className={styles.main}>
            <h1 className={styles.header}>Showcase</h1>
            <Carousel>
                <Carousel autoplay>
                    <div>
                        <div className={styles.bookContainer}>
                            {firstSlide?.map((book) => (
                                <BookTile
                                    bookTitle={book.title}
                                    bookAuthor={book.author}
                                    genres={[book.genreIds]}
                                    isbn={book.isbn}
                                    key={book.id} 
                                    rating={book.rating}
                                    description={book.description}/>
                            ))}

                        </div>
                    </div>
                    <div>
                    <div className={styles.bookContainer}>
                            {secondSlide?.map((book) => (
                                <BookTile
                                    bookTitle={book.title}
                                    bookAuthor={book.author}
                                    genres={[book.genreIds]}
                                    isbn={book.isbn}
                                    key={book.id} 
                                    rating={book.rating}
                                    description={book.description}/>
                            ))}

                        </div>
                    </div>
                    <div>
                    <div className={styles.bookContainer}>
                            {thirdSlide?.map((book) => (
                                <BookTile
                                    bookTitle={book.title}
                                    bookAuthor={book.author}
                                    genres={[book.genreIds]}
                                    isbn={book.isbn}
                                    key={book.id} 
                                    rating={book.rating}
                                    description={book.description}/>
                            ))}

                        </div>
                    </div>
                </Carousel>
            </Carousel>
        </main>
    );
} 