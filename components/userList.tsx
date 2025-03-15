"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, message, Table } from "antd";
import type { TableColumnsType } from "antd";
import UserEditForm from "./userEditForm";
import UserCreateForm from "./userCreateForm";

interface UserType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch("/api/users");
    const data = await response.json();

    const formattedData = data.map((user: any) => ({
      key: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: new Date(user.createdAt).toLocaleString(),
    }));

    setUsers(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [editingUser, creatingUser]);

  const handleEdit = (record: UserType) => {
    setEditingUser(record);
  };

  const handleCloseEditForm = () => {
    setEditingUser(null);
  };

  const handleCreateFormOpen = () => {
    setCreatingUser(true); // Open the create form
  };

  const handleCloseCreateForm = () => {
    setCreatingUser(false); // Close the create form
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || "User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove the user from the state
      } else {
        message.error(data.message || "Error deleting user");
      }
    } catch (error) {
      message.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumnsType<UserType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap="middle" vertical>
      {!editingUser && !creatingUser && (
        <>
          <Flex align="center" gap="middle">
            <Button type="primary" onClick={handleCreateFormOpen}>
              Create
            </Button>
          </Flex>
          <Table<UserType>
            columns={columns}
            dataSource={users}
            loading={loading}
          />
        </>
      )}

      {editingUser && (
        <UserEditForm editingUser={editingUser} onClose={handleCloseEditForm} />
      )}

      {creatingUser && <UserCreateForm onClose={handleCloseCreateForm} />}
    </Flex>
  );
};

export default UserList;
