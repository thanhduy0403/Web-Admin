import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";
function Best_Seller({ getDashboardStart, selectMonth, selectYear, data }) {
  useEffect(() => {
    if (selectMonth && selectYear) {
      getDashboardStart(selectMonth, selectYear);
    }
  }, [selectMonth, selectYear]);
  console.log(data);
  return (
    <>
      <div className="w-full bg-white border shadow-sm rounded-xl p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Top {data?.bestSellingProducts?.length} Sản Phẩm Bán Chạy Tháng{" "}
              {selectMonth}
            </h1>
            <p className="text-sm  text-gray-500 mt-1">
              Sản phẩm bán chạy nhất gần đây
            </p>
          </div>
          <Link
            to={"/product_management"}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Xem tất cả
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Products list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.isArray(data.bestSellingProducts) &&
          data.bestSellingProducts.length > 0 ? (
            data.bestSellingProducts.map((pro) => (
              <div
                key={pro._id}
                className="flex items-center justify-between border rounded-lg p-3 hover:shadow-md transition bg-gray-50"
              >
                {/* Left: image + info */}
                <div className="flex items-center gap-3">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-14 h-14 rounded-md object-cover border"
                  />
                  <div className="space-y-0.5">
                    <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {pro.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Đã bán:{" "}
                      <span className="font-medium text-green-600">
                        {pro.totalSold}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Giá:{" "}
                      <span className="font-semibold text-red-500">
                        {pro.price.toLocaleString("vi-VN")}₫
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: category */}
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full whitespace-nowrap">
                  {pro.categoryName}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-2 h-40 text-sm text-gray-500 gap-2">
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="text-purple-500 w-8 h-8" />
              </div>
              <p>Không có sản phẩm nào</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Best_Seller;
