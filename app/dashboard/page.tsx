"use client";

import React, { useEffect, useState } from "react";
import { SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, message } from "antd";
import UserList from "@/components/userList";
import Profile from "@/components/profile";
import AdminList from "@/components/adminList";

const { Content, Sider } = Layout;
const menuItems: MenuProps["items"] = [
  {
    key: "1",
    icon: <TeamOutlined />,
    label: "User Management",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Admin",
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Profile",
  },
];

const Dashboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("");

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    if (selectedKey === "1") {
      return <UserList />;
    } else if (selectedKey === "2") {
      return <AdminList />;
    } else if (selectedKey === "3") {
      return <Profile />;
    }
    return <UserList />;
  };

  return (
    <Layout>
      <div style={{ padding: "0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Sider style={{ background: "white" }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%" }}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {renderContent()}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default Dashboard;
