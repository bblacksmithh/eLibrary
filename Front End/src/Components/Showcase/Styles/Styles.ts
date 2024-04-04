import { createStyles } from "antd-style";
export const useStyles = createStyles(({css,cx}) => {
    const bookContainer = "bookContainer";
    const header = "header";
    const main = cx("main", css`
    .${header} {
        color: white;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }
    .${bookContainer} {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 90vw;
        justify-content: center;
        margin-bottom: 30px;
    }
    `);
    return {
        bookContainer,
        header,
        main
    };
});