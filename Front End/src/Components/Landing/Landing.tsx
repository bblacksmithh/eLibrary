"use client"

import Image from "next/image";
import React from "react";
import logo from '../../../public/logo.png';
import { Button, Card, Divider } from "antd";
import Link from "next/link";
import { useStyles } from "./styles/Style";

const Landing: React.FC = () => {
    const {styles, cx} = useStyles();
    return (
        <main className={styles.landPage}>
      <div className={cx(styles.header)}>
        <Image src={logo} alt="~~logo~~"/>
        <h1>Welcome to eLib Portal for Admins</h1>
      </div>
        <div className={styles.container}>
          <h2 className={styles.paragraph}>The #1 portal to manage your library and perform administrative tasks.<br/> Make use of our modern app using the latest technology <br/>With just a couple clicks and keystrokes you can manage your library with ease and avoid unnecessary</h2>
          <div>
            <Card className={styles.buttoncard}>
              <Link href='login'>
                <Button className={styles.button}>
                  Login
                </Button>
              </Link>
              <Divider className={styles.divider}/>
              <Link href='register'>
                <Button className={styles.button}>
                  Create Account
                </Button>
              </Link>
              <Divider className={styles.divider}/>
              <Link href='explore'>
                <Button className={styles.button}>
                  Explore
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      
    </main>
    );
}

export default Landing;