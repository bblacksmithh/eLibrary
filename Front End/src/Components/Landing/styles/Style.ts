import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, cx }) => {


    const header = "header";

    const paragraph = "paragraph";

    const container = "container";

    const buttoncard = "buttoncard";

    const button = "button";

    const divider = "divider";


    const landPage = cx('main', css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
   .${header}{
    align-items: center;
    text-align: center;
    & h1 {
        margin-top: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        font-style: oblique;
    }
   }
   .${paragraph}{
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    font-size: 20px;
    max-width: 400px;
    width: 100%;
    z-index: 2;
    text-align:center;
    line-height: 25px;
    font-family: var(--font-mono);
    margin: 35px;
    color: #5CF64A;
   }
   .${container}{
    align-items: center;
   }
   .${buttoncard}{
    background-color: rgba(49, 54, 63, 0.3);
    text-align: center;
    border: 0.1px solid #5CF64A;
   }
   .${button}{
    background-color: white;
    border: black 2px solid;
    color: black;
    font-weight: bold;
    &:hover{
        background-color: #5CF64A !important;
        color: black !important;
        border: black 2px solid !important;
    }
   }
   .${divider}{
    border-top: #5CF64A 0.5px solid;
   }`

    );
    return {
        header,
        paragraph,
        button,
        buttoncard,
        container,
        divider,
        landPage

    }
})


