"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FieldType = {
  name?: string;
  email?: string;
  role?: string;
};

interface AdminEditFormProps {
  editingAdmin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onClose: () => void; // Close the form
}

const AdminEditForm: React.FC<AdminEditFormProps> = ({
  editingAdmin,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/admins/${editingAdmin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          role: values.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Admin updated successfully!");
        onClose(); // Close the form after successful update
      } else {
        toast.error(data.message || "Error updating admin");
      }
    } catch (error) {
      toast.error("Error updating admin");
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
        name: editingAdmin.name,
        email: editingAdmin.email,
        role: editingAdmin.role,
      }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Form.Item>
        <h1 className="text-xl font-semibold mb-6 text-center">
          Edit Admin Information
        </h1>
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
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select the role!" }]}
      >
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="editor">Editor</Select.Option>
          <Select.Option value="viewer">Viewer</Select.Option>
        </Select>
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

export default AdminEditForm;
