import { createStyles } from "antd-style";

export const useStyles = createStyles(({css,cx}) => {
    const bookCard = "bookCard";
    const image = "image";
    const imageContainer = "imageContainer";
    const button = "button";
    const bookModal = "bookModal";
    const bookCover = 'bookCover';
    const bookCoverContainer = 'bookCoverContainer';
    const bookModalContent = 'bookModalContent';
    
   
    const modalStyle=cx('modalStyle',css`
        .${bookModal} {
            margin: 0 auto;
            height: 550px;
            display: flex;
        }
        .${bookCoverContainer} {
            width: 350px;
            height: 500px;
        }
        .${bookCover} {
            width: 90%;
            height: 100%;
        }
        .${bookModalContent} {
            width: 350px;
            height: 500px;
            overflow-y: scroll;
            & h1 {
                color: white;
            }
            & p {
                width: 250px;
                margin: 10px;
                color: green;
            }
        }
    `)
    
    const main = cx('main', css`
        width: fit-content;
        height: fit-content;
        .${bookCard} {
            width: 300px;
            height: 450px;
            border: green 1px solid;
            background-color: black;
            margin: 10px;
            & h1 {
                color: orange;
                font-size: 22px;
            }
            & p {
                color: white;
            }
        }
        .${imageContainer} {
            width: 90%;
            margin: auto;
            height: 300px;
        }
        .${image} {
            border: 1px solid black;
            width: 90%;
            height: 100%;
            margin: auto;
        }
        .${button} {
            width: 100px;
            margin: 20px auto;
            background-color: green;
            border: 1px solid green;
            color: white;
            display: block;
            &:hover {
                background-color: rgb(8, 85, 8);
            }
        }
      
    `);
    return {
        bookCard,
        image,
        main,
        imageContainer,
        button,
        bookModal,
        modalStyle,
        bookCover,
        bookCoverContainer,
        bookModalContent
    }
})