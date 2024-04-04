"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Card, Divider, Button, Layout, Form, Input, Checkbox } from "antd";
import logo from '../../../public/logo.png'
import Link from "next/link";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import router from "next/router";
import RegisterContent from "@/Components/Register/Register";


const Register: React.FC = () => {
    return (
        <>
            <RegisterContent/>
        </>
    );
}

export default Register;