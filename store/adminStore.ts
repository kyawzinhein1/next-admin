import { create } from "zustand";
import { persist } from "zustand/middleware";

type Admin = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const useAdminStore = create(
  persist<{
    admin: Admin | null;
    setAdmin: (adminData: Admin) => void;
  }>(
    (set) => ({
      admin: null,
      setAdmin: (adminData) => set({ admin: adminData }),
    }),
    {
      name: "admin-storage", // Store name in localStorage
    }
  )
);
