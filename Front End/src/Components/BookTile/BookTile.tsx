import { Button, Card, ConfigProvider, Divider, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useStyles } from './Styles/Style';
import bookCover from '../../../public/bookCover.png';
import logbookCover from '../../../public/bookCover.png';

const BookTile = ({bookTitle, bookAuthor, genres, isbn, key, rating, description}: {bookTitle:any, bookAuthor:any, genres:any, isbn:any, key:any, rating:any, description:any}) => {
    const { styles, cx } = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <main className={styles.main}>
            <Card className={styles.bookCard} style={{}}>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src={bookCover} alt="book" />
                </div>
                <h1>
                    {bookTitle}
                </h1>
                <p>
                    {bookAuthor}
                </p>
                <Button type='default' className={styles.button} onClick={showModal}>View</Button>
            </Card>
            
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            /* here is your component tokens */
                            contentBg:'black',
                            headerBg: 'black',
                            titleColor: 'white',
                        },
                    },
                }}
            >
                <Modal className={styles.modalStyle} width={700} okButtonProps={{ style: { background: 'green' } }} cancelButtonProps={{ style: { visibility: 'hidden' }, disabled: true }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className={styles.bookModal}>
                        <div className={styles.bookModalContent}>
                            <h1>{bookTitle}</h1>
                            <p>{description}</p>
                            <Divider/>
                            <p>Location: A3</p>
                            <p>Genres: {genres.map((genre: any)=> {
                                <p>{genre}</p>
                            })}</p>
                            <p>Rating: {rating}/5</p>
                        </div>
                        <div className={styles.bookCoverContainer}>
                            <Image className={styles.bookCover} src={bookCover} alt="book"></Image>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </main>
    );
}

export default BookTile;