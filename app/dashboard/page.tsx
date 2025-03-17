"use client";

import React, { useState } from "react";
import { SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import UserList from "@/components/userList";
import Profile from "@/components/profile";
import AdminList from "@/components/adminList";
import Navigation from "@/components/navigation";

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
      <div>
        <Navigation />
        <Layout
          style={{
            padding: "16px 0",
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
