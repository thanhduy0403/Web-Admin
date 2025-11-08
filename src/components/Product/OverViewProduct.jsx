import React from "react";
import Sidebar from "../Sidebar";
import { Package } from "lucide-react";
import { useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";

function OverViewProduct({ product }) {
  // const getProduct = useSelector((state) => state.product.products.getAll);

  const categorizedProducts = {
    // Còn hàng: amount > 10 hoặc stock > 10
    over10: product.filter((p) => (p.amount || 0) > 10 || (p.stock || 0) > 10),

    // Sắp hết: 0 < amount <= 10 hoặc 0 < stock <= 10
    under10: product.filter(
      (p) =>
        ((p.amount || 0) > 0 && (p.amount || 0) <= 10) ||
        ((p.stock || 0) > 0 && (p.stock || 0) <= 10)
    ),

    // Hết hàng: amount = 0 và stock = 0 hoặc null
    outOfStock: product.filter(
      (p) => (p.amount || 0) === 0 && (p.stock || 0) === 0
    ),
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {/* Tổng sản phẩm */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Tổng sản phẩm</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.length}
            </h1>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Tất cả sản phẩm trong hệ thống
          </span>
        </div>

        {/* Còn hàng */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Còn hàng</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-green-600">
              {categorizedProducts.over10.length}
            </h1>
            <div className="p-3 bg-green-100 rounded-full">
              <Package className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">Sản phẩm có sẵn để bán</span>
        </div>

        {/* Sắp hết */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Sắp hết</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-yellow-600">
              {categorizedProducts.under10.length}
            </h1>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Package className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">Cần nhập thêm hàng</span>
        </div>

        {/* Hết hàng */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Hết hàng</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-red-600">
              {categorizedProducts.outOfStock.length}
            </h1>
            <div className="p-3 bg-red-100 rounded-full">
              <Package className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">Không có sẵn để bán</span>
        </div>
      </div>
    </>
  );
}

export default OverViewProduct;
