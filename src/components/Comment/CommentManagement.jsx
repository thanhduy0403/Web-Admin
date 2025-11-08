import React, { useEffect, useState } from "react";
import { MessageCircleMore, CornerUpLeft, Trash2 } from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { Box } from "lucide-react";
import { message, Modal } from "antd";
import ModalReplyComment from "./ModalReplyComment";

function CommentManagement() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState([]);
  const getListProduct = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/product/getList");
      setProducts(res.data.products);
      console.log(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        setProducts([]);
      }
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="flex w-full ">
        <div className="w-[14%] ">
          <Sidebar />
        </div>
        <div className="w-[86%] mx-auto  mt-10  min-h-screen border  bg-gray-50">
          {/* Title */}
          <div className="px-10 mb-6 mt-16 ">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mt-10">
              Quản Lý Bình luận
            </h1>
            <span className="text-gray-500 text-sm">
              Xem và trả lời các bình luận của khách hàng về sản phẩm
            </span>
          </div>
          {/* Product List */}
          <div className="border mx-5 rounded-md bg-white shadow-md">
            {/* Header */}
            <div className="p-4 border-b">
              <h1 className="flex items-center gap-2 text-gray-700 font-bold">
                <Box />
                Danh sách sản phẩm
              </h1>
              <span className="text-gray-500 text-sm">
                Click vào sản phẩm để xem và quản lý bình luận
              </span>
            </div>

            {/* Product list */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item._id}
                    className="mb-2 grid grid-cols-12 gap-4 border bg-white rounded-md shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition"
                  >
                    {/* CỘT TRÁI */}
                    <div className="col-span-9 flex gap-4">
                      <img
                        className="w-20 h-20 object-cover rounded-md"
                        src={item.image}
                        alt={item.name}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="border px-2 rounded-full text-xs font-medium">
                            {item.categoryID?.name}
                          </span>
                          <span className="border bg-red-500 px-2 rounded-full text-xs text-white font-bold">
                            -{item.discount}%
                          </span>
                        </div>
                        <h2 className="font-semibold text-gray-800">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                        <span className="text-red-500 text-xs font-bold">
                          {item.price.toLocaleString("de-DE")} ₫
                        </span>
                      </div>
                    </div>
                    {/* CỘT PHẢI — có thể thêm button hoặc info khác */}
                    <div className="col-span-3 flex items-center justify-end">
                      <div className="border px-2 bg-black rounded-md">
                        <button
                          onClick={() => setSelectedProductId(item._id)}
                          className="font-semibold text-white"
                        >
                          Xem Bình Luận
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-4">
                  Chưa có sản phẩm nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={selectedProductId}
        onCancel={() => setSelectedProductId(false)}
        footer={null} // ẩn 2 nút ok và cancel
        width={700}
      >
        {selectedProductId && (
          <ModalReplyComment productID={selectedProductId} />
        )}
      </Modal>
    </>
  );
}

export default CommentManagement;
