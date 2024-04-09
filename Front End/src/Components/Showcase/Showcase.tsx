import { Carousel } from "antd";
import React from "react";
import BookTile from "../BookTile/BookTile";
import { useStyles } from "./Styles/Styles";
export const Showcase: React.FC = () => {

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
                            {/* <BookTile />
                            <BookTile />
                            <BookTile /> */}
                        </div>
                    </div>
                    <div>
                        <div className={styles.bookContainer}>
                            {/* <BookTile />
                            <BookTile />
                            <BookTile /> */}
                        </div>
                    </div>
                    <div>
                        <div className={styles.bookContainer}>
                            {/* <BookTile />
                            <BookTile />
                            <BookTile /> */}
                        </div>
                    </div>
                    <div>
                        <div className={styles.bookContainer}>
                            {/* <BookTile />
                            <BookTile />
                            <BookTile /> */}
                        </div>
                    </div>
                </Carousel>
            </Carousel>
        </main>
    );
} 