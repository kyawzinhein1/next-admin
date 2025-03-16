"use client";

import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminStore } from "@/store/adminStore";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { admin } = useAdminStore();

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
    <div className="mt-4">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        {admin && (
          <div className="space-y-4">
            <p className="text-md">Name: <span className="font-medium">{admin.name}</span></p>
            <p className="text-md">Email: <span className="font-medium">{admin.email}</span></p>
            <p className="text-md">Role: <span className="font-medium">{admin.role}</span></p>
          </div>
        )}
        <Button
          type="primary"
          danger
          loading={loading}
          className=" mt-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
    </div>
  );
};

export default Profile;
