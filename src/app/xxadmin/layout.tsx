import './admin.css'
import React from "react";
import AdminLayout from "./components/AdminLayout";
export default function VendorLayout({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

