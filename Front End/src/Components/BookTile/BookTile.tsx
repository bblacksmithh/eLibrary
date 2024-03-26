import { Card } from "antd";
import Image from "next/image";
import React from "react";
import {useStyles} from './Styles/Style';
import bookCover from '../../../public/bookCover.png';

const BookTile: React.FC = () =>  {
    const {styles, cx} = useStyles();
    return (
        <main className={styles.main}>
            <Card className={styles.bookCard} style={{}}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={bookCover} alt="book"/>
                </div>
                <h1 style={{}}>
                    Book
                </h1>
                <p>
                    This is a Book
                </p>
            </Card>
        </main>
    );
}

export default BookTile;