"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Card, Divider, Button, Layout, Form, Input, Checkbox } from "antd";
import logo from '../../../public/logo.png'
import Link from "next/link";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import router from "next/router";


export default function Home() {


    // Define the type for the form field values
    type FieldType = {
        username: string;
        password: string;
        remember: boolean;
    };

    // State to store form values
    const [formValues, setFormValues] = useState<FieldType>({
        username: '',
        password: '',
        remember: false,
    });


    // Form validation rules
    const rules = {
        username: [{ required: true, message: 'Please input your username!' }],
        password: [{ required: true, message: 'Please input your password!' }],
    };

    // Event handler for form submission
    const onFinish = (values: FieldType) => {
        // Handle form submission logic, e.g., send data to the server
        console.log('Form submitted:', values);
        // Redirect to another page after successful submission
        router.push('/dashboard');
    };


    return (
        <main className={styles.main}>
            <Layout className={styles.layout}>
                <Header className={styles.layoutheader}>
                    <Image className={styles.logo} src={logo} alt="~~logo~~" />
                    <h1>Log In to your Library Portal Account</h1>
                </Header>
                <Content>
                    <Form
                        className={styles.form}
                        name="basic"
                        initialValues={formValues}
                        onFinish={onFinish}
                    >
                        <h1>Enter Your Details...</h1>
                        {/* Username */}
                        <Form.Item
                            className={styles.formitem}
                            label="Username"
                            name="username"
                            rules={rules.username}
                        >
                            <Input
                                value={formValues.username}
                                onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            className={styles.formitem}
                            label="Password"
                            name="password"
                            rules={rules.password}
                        >
                            <Input.Password
                                className={styles.passwordinput}
                                value={formValues.password}
                                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                            />
                        </Form.Item>

                        {/* Remember me */}
                        <Form.Item
                            className={styles.formitem}
                            name="remember"
                            valuePropName="checked"
                        // wrapperCol={{ offset: 4, span: 16 }}
                        >
                            <Checkbox
                                checked={formValues.remember}
                                onChange={(e) => setFormValues({ ...formValues, remember: e.target.checked })}
                            >
                                Remember me
                            </Checkbox>
                        </Form.Item>

                        {/* Submit button */}
                        <Form.Item
                        // wrapperCol={{ offset: 4, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout >
        </main >
    );
}