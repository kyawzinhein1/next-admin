import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogoutOutlined } from "@ant-design/icons";

export default function Navigation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-slate-300">
      <a href="#" className="mt-2">
        <p className="font-2xl font-bold uppercase">My Admin</p>
      </a>
      <Button
        type="primary"
        danger
        onClick={handleLogout}
        loading={loading}
      >
        <LogoutOutlined />Logout
      </Button>
    </div>
  );
}
