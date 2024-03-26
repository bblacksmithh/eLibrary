"use client";

import Image from "next/image";
import styles from './styles/register.module.scss';
import { Card, Divider, Button, Layout, Form, Input, Checkbox } from "antd";
import logo from '../../../public/logo.png'
import Link from "next/link";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import router from "next/router";
import { useStyles } from "./styles/Style";


const RegisterContent: React.FC = () => {


    // Define the type for the form field values
    type FieldType = {
        username: string;
        password: string;
        email: string;
    };

    // State to store form values
    const [formValues, setFormValues] = useState<FieldType>({
        username: '',
        password: '',
        email: '',
    });


    // Form validation rules
    const rules = {
        username: [{ required: true, message: 'Input your username!' }],
        password: [{ required: true, message: 'Input your password!' }],
        email: [{required: true, message: 'Input your email'}]
    };

    // Event handler for form submission
    const onFinish = (values: FieldType) => {
        // Handle form submission logic, e.g., send data to the server
        console.log('Form submitted:', values);
        // Redirect to another page after successful submission
        router.push('/dashboard');
    };

    const {styles, cx} = useStyles();
    return (
        <main className={styles.regPage}>
            <Layout className={styles.layout}>
                <Header className={styles.layoutHeader}>
                    <Image className={styles.logo} src={logo} alt="~~logo~~" />
                    <h1>Create a Library Portal Account</h1>
                </Header>
                <Content>
                    <Form
                    layout={"vertical"}
                        className={styles.form}
                        name="basic"
                        initialValues={formValues}
                        onFinish={onFinish}
                    >
                        <h1>Complete Form...</h1>
                        {/* Username */}
                        <Form.Item
                            className={styles.formItem}
                            label="Username"
                            name="username"
                            rules={rules.username}
                        >
                            <Input
                                value={formValues.username}
                                onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                            />
                        </Form.Item>

                        {/* {Email address} */}
                        <Form.Item
                            className={styles.formItem}
                            label="Email"
                            name="email"
                            rules={rules.email}
                        >
                            <Input
                                value={formValues.email}
                                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
                                value={formValues.password}
                                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                            />
                        </Form.Item>
                        
                        {/* Submit button */}
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Create Account
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout >
        </main >
    );
}

export default RegisterContent;