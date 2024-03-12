"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Card, Divider, Button } from "antd";
import logo from '../../public/logo.png'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image src={logo} alt="~~logo~~"/>
        <h1>Welcome to eLib Portal for Admins</h1>
      </div>
        <div className={styles.container}>
          <h2 className={styles.paragraph}>The #1 portal to manage your library and perform administrative tasks.<br/> Make use of our modern app using the latest technology <br/>With just a couple clicks and keystrokes you can manage your library with ease and avoid unnecessary</h2>
          <div className={styles.loginorregistercontainer}>
            <Card className={styles.buttoncard}>
              <Link href='login'>
                <Button className={styles.button}>
                  Login
                </Button>
              </Link>
              <Divider className={styles.divider}/>
              <Button className={styles.button}>
                Create Account
              </Button>
              <Divider className={styles.divider}/>
              <Button className={styles.button}>
                Guest Access
              </Button>
            </Card>
          </div>
        </div>
      
    </main>
  );
}
