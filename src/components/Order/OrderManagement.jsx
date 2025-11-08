import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/index";
import axiosInstance from "../../axiosInstance";
import { FaArrowDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPenSquare } from "react-icons/fa";
import { Button, message, Space, Popconfirm, Modal } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/index";
import { Eye } from "lucide-react";
import ModalDetailOrder from "./ModalDetailOrder";
import OrderList from "./OrderList";
import OverViewOrder from "./OverViewOrder";

function OrderManagement() {
  const checkAdmin = useSelector((state) => state.auth.login?.currentUser);
  const [orders, setOrders] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  // modal view
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // modal edit
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedOrderEdit, setSelectedOrderEdit] = useState(null);

  // handle showModalView
  const showModalView = (odrItem) => {
    setIsModalOpenView(true); // mở modal
    setSelectedOrder(odrItem); // chọn đơn hàng
  };
  const handleOk = () => {
    setIsModalOpenView(false);
  };
  const handleCancel = () => {
    setIsModalOpenView(false);
  };

  //handle showModalEdit
  const showModalEdit = (odrItem) => {
    setIsModalEditOpen(true); // mở modal
    setSelectedOrderEdit(odrItem); // chọn order từ orders để edit
  };

  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };
  const navigate = useNavigate();

  const getListOrder = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/order/getList", {
        withCredentials: true,
      });
      if (res.data.success) {
        setOrders(res.data.orderList);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  useEffect(() => {
    if (checkAdmin) {
      getListOrder();
    } else {
      messageApi.error("Bạn cần đăng nhập");
      setTimeout(() => {
        navigate("/login");
      });
    }
  }, [navigate, checkAdmin]);

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="flex w-full ">
        <div className="w-[14%] ">
          <Sidebar />
        </div>
        <div className="w-[86%] mx-auto  mt-10  min-h-screen border  bg-gray-50">
          <div className="px-10 mb-6 mt-16 ">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mt-10">
              Quản Lý Đơn Hàng
            </h1>
            <span className="text-gray-500 text-sm">
              Theo dõi và quản lý đơn hàng
            </span>
          </div>

          <div className="w-[95%] mx-auto mt-3">
            <OverViewOrder getListOrder={getListOrder} orders={orders} />
          </div>

          <div>
            <OrderList
              orders={orders}
              showModalEdit={showModalEdit}
              handleEditOk={handleEditOk}
              handleEditCancel={handleEditCancel}
              showModalView={showModalView}
              isModalEditOpen={isModalEditOpen}
              selectedOrderEdit={selectedOrderEdit}
              setSelectedOrderEdit={setSelectedOrderEdit}
              getListOrder={getListOrder}
              handleOk={handleOk}
              selectedOrder={selectedOrder}
              isModalOpenView={isModalOpenView}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
