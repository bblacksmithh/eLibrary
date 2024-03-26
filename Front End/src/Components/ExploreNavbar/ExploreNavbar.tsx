import { Menu } from "antd";
import React, { useState } from "react";
import {useStyles} from './Styles/style';

export const ExploreNavbar = () => {
    const [current, setCurrent] = useState('explore');

    const handleClick = (e:any) => {
        console.log('click ', e);
        setCurrent(e.key);
    }

    const {styles, cx} = useStyles();
    return (
        <main>
            <Menu 
            className={styles.exploreNavbar}
            selectedKeys={[current]} mode='horizontal'
            style={{backgroundColor:'rgba(0,0,0,0)', color:'green'}}
            >
                <Menu.Item className={styles.menuItem} onClick={handleClick} key='explore' style={{color:'green', width:100, textAlign:'center'}}>Explore</Menu.Item>
                <Menu.Item onClick={handleClick} key='trending' style={{color:'green', width:100, textAlign:'center'}}>Trending</Menu.Item>
                <Menu.Item onClick={handleClick} key='search' style={{color:'green', width:100, textAlign:'center'}}>Search</Menu.Item>               
            </Menu>
        </main>
    );
}