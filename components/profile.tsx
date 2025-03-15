"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <div>
      <h2>Profile Page</h2>
      <p>This is the profile page</p>
      <Button type="primary" onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </div>
  );
};
export default Profile;
