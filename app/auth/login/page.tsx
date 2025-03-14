"use client";

import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";

const Login: React.FC = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className="h-screen w-full bg-gray-100"
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 500 }}
      >
        <Form.Item>
          <p className="text-2xl font-bold ">Welcome Administrator</p>
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
          <Flex justify="space-between" align="end">
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="/auth/register">Register now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
