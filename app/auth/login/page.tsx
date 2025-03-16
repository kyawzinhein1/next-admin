"use client";

import { useState } from "react";
import { Button, Flex, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setAdmin } = useAdminStore();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      // Debugging: Log the response data to verify it's correct
      console.log("Login Response Data:", data);

      if (res.status === 200) {
        // Show the success message with a slight delay to ensure render
        setTimeout(() => {
          message.success(data.message);
        }, 100); // Delay for a smoother experience
        localStorage.setItem("token", data.token);
        setAdmin(data.admin);
        router.push("/dashboard");
      } else {
        message.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, width: "100%" }}
      >
        <h1 className="text-xl font-bold text-center">Welcome</h1>
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
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
          or <a href="/auth/register">Register now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
