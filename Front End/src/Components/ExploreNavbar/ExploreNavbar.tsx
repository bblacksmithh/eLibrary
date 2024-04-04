import { Menu } from "antd";
import React, { useState } from "react";
import {useStyles} from './Styles/style';
import Link from "next/link";

export const ExploreNavbar = ({current}:{current:string}) => {
    const [currentTab, setCurrentTab] = useState(current);

    const handleClick = (e:any) => {
        console.log('click ', e);
        setCurrentTab(e.key);
    }

    const {styles, cx} = useStyles();
    return (
        <main>
            <Menu 
            className={styles.exploreNavbar}
            selectedKeys={[currentTab]} mode='horizontal'
            style={{backgroundColor:'rgba(0,0,0,0)', color:'green'}}
            >
                <Menu.Item className={styles.menuItem} onClick={handleClick} key='explore' style={{color:'green', width:100, textAlign:'center'}}><Link href='/explore'>Explore</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='trending' style={{color:'green', width:100, textAlign:'center'}}><Link href='/trending'>Trending</Link></Menu.Item>
                <Menu.Item onClick={handleClick} key='search' style={{color:'green', width:100, textAlign:'center'}}><Link href='/search'>Search</Link></Menu.Item>               
            </Menu>
        </main>
    );
}