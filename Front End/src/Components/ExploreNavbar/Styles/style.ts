import { ExploreNavbar } from '@/Components/ExploreNavbar/ExploreNavbar';
import { createStyles } from "antd-style";

export const useStyles = createStyles(({css, cx}) => {
    const exploreNavbar = "exploreNavbar";
    const menuItem = "menuItem";
    const main = cx('main', css`
    .${exploreNavbar} {
        width: 1000px;
        background-color: orange !important;
        color: orange !important;
        
    }
    .${menuItem} {
        background-color: orange !important;
        color: orange !important;
    }
    `);
    return {
        exploreNavbar,
        main,
        menuItem
    };
})