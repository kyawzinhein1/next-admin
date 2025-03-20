"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Table, Input } from "antd";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { admin } = useAdminStore();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // check component mounted state
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);
    fetchAdmins();

    return () => {
      setIsMounted(false);
    };
  }, [editingAdmin]);

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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Filter admins based on search query
  const filteredAdmins = admins.filter((admin) => {
    return (
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.isBan ? "banned" : "active")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

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
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Status",
      dataIndex: "isBan",
      sorter: (a, b) => Number(a.isBan) - Number(b.isBan),
      render: (isBan) => (
        <span style={{ color: isBan ? "red" : "green", fontWeight: "bold" }}>
          {isBan ? "Banned" : "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {!editingAdmin && (
            <Flex gap="middle">
              <Button
                style={{ borderColor: 'blue', color: 'blue' }}
                onClick={() => handleEdit(record)}
                hidden={admin?.role === "viewer"}
              >
                Edit
              </Button>
              <Button
                danger={record.isBan}
                onClick={() => handleToggleBan(record.id, record.isBan)}
                hidden={admin?.role === "editor" || admin?.role === "viewer"}
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
      <div className="flex justify-between mb-6">
        {!editingAdmin && (
          <h2 className="text-xl font-semibold mb-6">Admin Management</h2>
        )}
        {!editingAdmin && (
          <div>
            <Input
              placeholder="Search ..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        )}
      </div>
      <Flex gap="middle" vertical>
        {!editingAdmin && (
          <Table<AdminType>
            columns={columns}
            dataSource={filteredAdmins}
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
