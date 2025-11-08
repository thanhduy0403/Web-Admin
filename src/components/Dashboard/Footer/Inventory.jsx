import React, { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

function Inventory() {
  const [data, setData] = useState([]);
  const Product_Inventory = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/product/getList");
      //console.log(res.data);
      setData(res.data);
    } catch (error) {
      setData([]);
    }
  };

  const Low_Inventory = Array.isArray(data)
    ? data
        .filter((pro) => pro.amount <= 10 && pro.stock <= 10)
        .sort((a, b) => a.amount - b.amount && a.stock - b.stock)
        .slice(0, 3)
    : [];

  console.log(Low_Inventory);
  useEffect(() => {
    Product_Inventory();
  }, []);

  return (
    <>
      <div className="border border-yellow-200 bg-yellow-50 relative rounded-lg shadow-sm p-3 h-[12rem] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-yellow-100 border border-yellow-200 rounded-full text-yellow-600">
            <TriangleAlert className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-base font-semibold text-yellow-700">
            Cảnh Báo Tồn Kho
          </h1>
        </div>

        {/* Nội dung */}
        {Low_Inventory.length > 0 ? (
          <div>
            <p className="text-xs text-yellow-600 mb-2">
              Các sản phẩm sắp hết hàng:
            </p>
            <div className="space-y-1.5">
              {Low_Inventory.map((pro) => (
                <div
                  key={pro._id}
                  className="flex justify-between items-center bg-yellow-100 px-2.5 py-1 rounded-md border border-yellow-200 hover:bg-yellow-200 transition"
                >
                  <span className="text-xs font-medium">{pro.name}</span>
                  <span className="text-[11px] font-semibold text-red-600">
                    Còn lại: {pro.amount || pro.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs font-medium text-green-700">
              ✅ Tất cả sản phẩm đều còn đủ hàng
            </p>
          </div>
        )}

        <Link
          className="absolute bottom-2 right-2 text-[11px] font-medium text-blue-500 hover:underline"
          to={"/product_management"}
        >
          Xem chi tiết
        </Link>
      </div>
    </>
  );
}

export default Inventory;
