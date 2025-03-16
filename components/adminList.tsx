"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import type { TableColumnsType } from "antd";
import AdminEditForm from "./adminEditForm";
import { useAdminStore } from "@/store/adminStore";

interface AdminType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
  isBan: boolean;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminType | null>(null);

  const { admin } = useAdminStore();

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
      isBan: admin.isBan,
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

  const handleToggleBan = async (adminId: string, currentStatus: boolean) => {
    const response = await fetch(`/api/auth/admins/${adminId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBan: !currentStatus }),
    });

    if (response.ok) {
      fetchAdmins();
    }
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
      title: "Status",
      dataIndex: "banned",
      render: (banned) => (banned ? "Banned" : "Active"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {!editingAdmin && (
            <Flex gap="middle">
              <Button
                type="primary"
                onClick={() => handleEdit(record)}
                disabled={admin?.role !== "admin"}
              >
                Edit
              </Button>
              <Button
                danger={record.isBan}
                onClick={() => handleToggleBan(record.id, record.isBan)}
                disabled={admin?.role !== "admin"}
              >
                {record.isBan ? "Unban" : "Ban"}
              </Button>
            </Flex>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="mt-4">
      {!editingAdmin && (
        <h2 className="text-xl font-semibold mb-6">Admin Management</h2>
      )}{" "}
      <Flex gap="middle" vertical>
        {!editingAdmin && (
          <Table<AdminType>
            columns={columns}
            dataSource={admins}
            loading={loading}
            pagination={{
              pageSize: 5,
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
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
    </div>
  );
};

export default AdminList;
