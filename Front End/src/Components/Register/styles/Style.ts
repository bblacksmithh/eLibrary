import { Form } from 'antd';
import { createStyles } from "antd-style";
import FormItem from "antd/es/form/FormItem";

export const useStyles = createStyles(({ css, cx }) => {
    const layout = "layout";
    const layoutHeader = "layoutHeader";
    const logo = "logo";
    const form = "form";
    const formItem = "formItem";
    const passwordInput = "passwordInput";

    const regPage = cx('main', css`
        align-items: center;
        padding: 2rem;
        min-height: 100vh;
        min-width: 100vw;
        .${layout} {
            background-color: rgba(0, 0, 0, 0);
        }
        .${layoutHeader} {
            height: 150px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 30px;
            background-color: rgba(0, 0, 0, 0);
            & h1 {
                color: white;
                font-size: 30px;
                font-style: oblique;
            }
        }
        .${logo} {
            width: 80px;
            height: 80px;
        }
        .${form} {
            background-color: rgba(0, 0, 0, 0);
            width: 700px;
            height: 600px;
            margin: 40px auto;
            border: 1px #5CF64A solid;
            padding: 20px;
            border-radius: 30px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 10px 10px 10px 0px rgba(255,255,255,0.2) inset;
            & h1 {
                color: #5CF64A;
                text-align: center;
                padding: 0 0 20px 0;
            }
            & Input {
                width: 350px;
            }
            & .${passwordInput} {
                width: 350px;
            }
            & Button {
                background-color: rgb(169, 224, 155);
                border: black 2px solid;
                color: black;
                font-weight: bold;
                width: 200px;
                margin: 50px auto 0;
            }
            & Button:Hover {
                background-color: #5CF64A !important;
                color: black !important;
                border: black 2px solid !important;
            }
        }
        .${formItem} {
            & label {
                color: #5CF64A !important;
            }
        }

    `);
    return {
        layout,
        layoutHeader,
        logo,
        form,
        formItem,
        passwordInput,
        regPage
    }

})