import { createStyles } from "antd-style";

export const useStyles = createStyles(({css, cx}) =>  {
    const main = cx("main", css`

    `);
    return main;
})