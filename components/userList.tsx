"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import type { TableColumnsType } from "antd";

interface UserType {
  key: React.Key;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch("/api/users");
    const data = await response.json();

    const formattedData = data.map((user: any) => ({
      key: user.id,
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
  }, []);

  const columns: TableColumnsType<UserType> = [
    {
      title: "Id",
      dataIndex: "key",
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
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary">Create</Button>
      </Flex>
      <Table<UserType> columns={columns} dataSource={users} loading={loading} />
    </Flex>
  );
};

export default UserList;
