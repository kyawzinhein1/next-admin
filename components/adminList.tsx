"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import type { TableColumnsType } from "antd";
import AdminEditForm from "./adminEditForm";

interface AdminType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminType | null>(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAdmins = async () => {
    setLoading(true);
    const response = await fetch("/api/auth/admins");
    const data = await response.json();

    const formattedData = data.data.map((admin: any) => ({
      key: admin.id,
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    }));

    setAdmins(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, [editingAdmin?.id]);

  const handleEdit = (record: AdminType) => {
    setEditingAdmin(record);
  };

  const handleCloseEditForm = () => {
    setEditingAdmin(null);
  };

  const columns: TableColumnsType<AdminType> = [
    {
      title: "No",
      dataIndex: "key",
      render: (_text, _record, index) => (currentPage - 1) * 5 + index + 1,
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap="middle" vertical>
      {!editingAdmin && (
        <Table<AdminType>
          columns={columns}
          dataSource={admins}
          loading={loading}
          pagination={{
            pageSize: 5,
            current: currentPage,
            onChange: (page) => setCurrentPage(page), // Track current page
          }}
        />
      )}

      {editingAdmin && (
        <AdminEditForm
          editingAdmin={editingAdmin}
          onClose={handleCloseEditForm}
        />
      )}
    </Flex>
  );
};

export default AdminList;
