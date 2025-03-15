"use client";

import { Button, Form, Input } from "antd";
import message from "antd/es/message";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        message.success(data.message);
        router.push("/auth/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, width: "100%" }}
      >
        <p className="text-xl font-bold text-center">Welcome</p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
          or <a href="/auth/login">Login now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Register;
