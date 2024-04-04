import React, { useState } from "react";
import { useStyles } from "./Styles/Style";
import { Menu } from "antd";
import Link from "next/link";

const SideMenu = ({current}:{current:string}) => {
    const [currentTab, setCurrentTab] = useState(current);
    const {styles, cx} = useStyles();

    const handleClick = (e:any) => {
        console.log('click ', e);
        setCurrentTab(e.key);
    }
    return (
        <main className={styles.main}>
            <Menu
            selectedKeys={[currentTab]} className={styles.menuStyle} mode="vertical" >
                <Menu.Item onClick={handleClick} key='transactions' className={styles.menuItem}><Link href='/transactions'>Transactions</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='books' className={styles.menuItem}><Link href='books'>Books</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='genres' className={styles.menuItem}><Link href='/genres'>Genres</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='members' className={styles.menuItem}><Link href='/members'>Members</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='librarians' className={styles.menuItem}><Link href='/librarians'>Librarians</Link></Menu.Item>
            </Menu>
        </main>
    );
}

export default SideMenu;