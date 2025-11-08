import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import {
  TicketCheck,
  MessageCircleMore,
  CircleUserRound,
  ListOrdered,
  House,
} from "lucide-react";

function MenuItem() {
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("");

  const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const menuItems = [
    {
      label: "Tổng Quan",
      icon: <House size={18} />,
      path: "/",
    },
    {
      label: "Quản Lý Danh Mục",
      icon: <BiCategory size={18} />,
      path: "/category_management",
    },
    {
      label: "Quản Lý Sản Phẩm",
      icon: <GrProductHunt size={18} />,
      path: "/product_management",
    },
    {
      label: "Quản Lý Đơn Hàng",
      icon: <ListOrdered size={18} />,
      path: "/order_management",
    },
    {
      label: "Quản Lý Nhân Viên",
      icon: <FaUserCog size={18} />,
      path: "/account_management",
    },
    {
      label: "Quản Lý Khách Hàng",
      icon: <CircleUserRound size={18} />,
      path: "/user_management",
    },
    {
      label: "Quản Lý Voucher",
      icon: <TicketCheck size={18} />,
      path: "/voucher_management",
    },
    {
      label: "Quản Lý Bình Luận",
      icon: <MessageCircleMore size={18} />,
      path: "/Comment_management",
    },
    // { label: "Sản Phẩm", icon: <FaHome size={18} />, path: "/" },
  ];

  return (
    <>
      <div
        className="fixed top-5 left-0 w-[14%] h-screen  text-sm
  bg-white  py-6 space-y-8 "
      >
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setSelected(item.label)}
            className="menu-item flex items-center gap-2 cursor-pointer"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center text-start gap-2 px-2 py-2 rounded w-full  ${
                  isActive
                    ? "bg-blue-500 text-white border-r-2 "
                    : "text-black hover:bg-gray-50 hover:text-black"
                }`
              }
            >
              <span className="icon-animation">{item.icon}</span>
              {item.label}
            </NavLink>
          </div>
        ))}

        {/* {dropDown ? (
          <RiArrowDropDownLine size={30} className="ml-12 cursor-pointer" />
        ) : (
          <RiArrowDropUpLine size={30} className="ml-12 cursor-pointer" />
        )}

        {dropDown && (
          <div className="ml-12  justify-center">
            <Link to="/test" className="block item">
              Test
            </Link>
            <Link to="/test" className="block">
              demo
            </Link>
          </div>
        )} */}
      </div>
    </>
  );
}

export default MenuItem;
