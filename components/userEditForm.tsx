"use client";

import React, { useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
};

interface UserEditFormProps {
  editingUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  onClose: () => void; // Close the form
}

const UserEditForm: React.FC<UserEditFormProps> = ({ editingUser, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
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
        toast.success("User updated successfully!");
        onClose(); // Close the form after successful update
      } else {
        toast.error(data.message || "Error updating user");
      }
    } catch (error) {
      toast.error("Error updating user");
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
      initialValues={{
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <h1 className="text-xl font-semibold mb-6 text-center">Edit User Information</h1>
      </Form.Item>
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input the phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={onClose}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEditForm;
