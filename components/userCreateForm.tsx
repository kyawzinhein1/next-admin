import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SaveFilled, CloseCircleOutlined } from "@ant-design/icons";

type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
};

interface UserCreateFormProps {
  onClose: () => void; // Close the form after creation
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User created successfully!");
        onClose(); // Close the form after successful creation
      } else {
        toast.error(data.message || "Error creating user");
      }
    } catch (error) {
      toast.error("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <h1 className="text-2xl font-bold text-center">Create New User</h1>
      </Form.Item>
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input placeholder="Enter your name"/>
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input placeholder="Enter your email"/>
      </Form.Item>

      <Form.Item<FieldType>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input the phone!" }]}
      >
        <Input placeholder="Enter your phone"/>
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<SaveFilled />}
        >
          Create User
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={onClose}
          icon={<CloseCircleOutlined />}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserCreateForm;
