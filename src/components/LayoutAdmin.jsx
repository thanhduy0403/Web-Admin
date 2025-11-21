import React from "react";
// import Navbar from "./components/Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <>
      <Navbar /> {/* Navbar chỉ render 1 lần */}
      <div className="flex w-full">
        <div className="w-[14%]">
          <Sidebar />
        </div>
        <div className="w-[86%] mx-auto mt-10 min-h-screen border bg-gray-50">
          <Outlet /> {/* Nội dung các trang con */}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
