"use client";

import Button from "@/components/button";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  redirect("/auth/login");
  // const fetchUser = async () => {
  //   try {
  //     const res = await fetch("/api/users");
  //     if (!res.ok) throw new Error(`Failed to fetch users: ${res.statusText}`);

  //     const data = await res.json();
  //     console.log("Fetched users:", data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // return (
  //   <main>
  //     <div className="bg-red-500 text-xl text-white">Welcome Admin</div>
  //     <Button />
  //   </main>
  // );
};

export default Page;
