"use client"

import Image from "next/image";
import { useStyles } from "./styles/Style";
import { Card, Divider, Button, Layout, Form, Input, Checkbox, Alert } from "antd";
import logo from '../../../public/logo.png';
import Link from "next/link";
import { Content, Header } from "antd/es/layout/layout";
import { useContext, useEffect, useState } from "react";
import { ILibrarianAuthLogin, ILibrarianAuthResponse, LibrarianAuthActionContext, LibrarianAuthStateContext } from "@/Providers/AuthLibrarian/context";
import { useRouter } from "next/navigation";


const LoginContent = () => {
   
    const {login} = useContext(LibrarianAuthActionContext);
    const {error} = useContext(LibrarianAuthStateContext);
    const router = useRouter()

    const ErrorLogin: React.FC = () => <Alert message='Invalid username or password' type="error" showIcon/>

    // Form validation rules
    const rules = {
        username: [{ required: true, message: 'Please input your username!' }],
        password: [{ required: true, message: 'Please input your password!' }],
    };

    // Event handler for form submission
    
        const onFinish = (values: any) => {
            console.log('val', values)
            const input: ILibrarianAuthLogin = {password:values.password, userNameOrEmailAddress:values.username}
            console.log('inp', input);
            login(input).then((response) => {
               
                localStorage.setItem('token', response.result.accessToken);
                localStorage.setItem('userId', response.result.userId.toString());
                router.push('/dashboard'), {scroll: false};
            })
        };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed', errorInfo);
    }

    const {styles, cx} = useStyles();
    return (
        <main className={styles.logPage}>
            <Layout className={styles.layout}>
                <Header className={styles.layoutHeader}>
                    <Image className={styles.logo} src={logo} alt="~~logo~~" />
                    <h1>Log In to your Library Portal Account</h1>
                </Header>
                <Content>
                    <Form
                        layout={"vertical"}
                        className={styles.form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h1>Enter Your Details...</h1>
                        {/* Username */}
                        <Form.Item
                            className={styles.formItem}
                            label="Username"
                            name="username"
                            rules={rules.username}
                        >
                            <Input
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            className={styles.formItem}
                            label="Password"
                            name="password"
                            rules={rules.password}
                        >
                            <Input.Password
                                className={styles.passwordInput}
                            />
                        </Form.Item>

                        {/* Submit button */}
                        <Form.Item
                        // wrapperCol={{ offset: 4, span: 16 }}
                        >
                            <Button className="button" htmlType="submit">
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout >
        </main >
    );
}

export default LoginContent;