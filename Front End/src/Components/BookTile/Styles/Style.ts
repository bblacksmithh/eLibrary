import { createStyles } from "antd-style";

export const useStyles = createStyles(({css,cx}) => {
    const bookCard = "bookCard";
    const image = "image";
    const imageContainer = "imageContainer";
    
    
    const main = cx('main', css`
        .${bookCard} {
            width: 300px;
            height: 450px;
            border: green 1px solid;
            background-color: black;
            margin: 0 0 10px 0;
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
    `);
    return {
        bookCard,
        image,
        main,
        imageContainer
    }
})