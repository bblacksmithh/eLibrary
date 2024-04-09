import { HeaderLeftNavbarComponent } from './../../../../../Back End/6.5.0/angular/src/app/layout/header-left-navbar.component';
import { createStyles } from "antd-style";

export const useStyles = createStyles(({css,cx}) => {
    const menuStyle = 'menuStyle';
    const menuItem = 'menuItem';

    const main = cx('main', css`
        width: 200px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content:start;
        border-right: 1px green solid;
        .${menuStyle} {
            background-color: transparent;
            .${menuItem} {
                color: green;
                font-size: large;
                height: fit-content;
                align-items: center;
                text-align: left;
                margin: 10px auto;
                vertical-align: middle;
                &:hover {
                    color: brown !important;
                }
                &:active {
                    background-color: yellow !important;
                }
                &::after {
                    background-color: yellow !important;
                }
            }
        }
    `);
    return {
        main,
        menuStyle,
        menuItem
    }
})