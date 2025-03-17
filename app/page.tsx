"use client";

import { redirect } from "next/navigation";

const Page = () => {
  redirect("/auth/login");
};

export default Page;
