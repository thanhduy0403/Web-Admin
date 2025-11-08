import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import axiosInstance from "../../../axiosInstance";
import { Link } from "react-router-dom";

function CateBest_Seller() {
  const [data, setData] = useState([]);
  const getCateBestSeller = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/category/getList");
      setData(res.data.categories);
    } catch (error) {
      setData([]);
    }
  };
  const topSeller = Array.isArray(data)
    ? data.sort((a, b) => b.soldCount - a.soldCount).slice(0, 3)
    : [];
  console.log(topSeller);
  useEffect(() => {
    getCateBestSeller();
  }, []);

  return (
    <>
      <div className="border border-green-200 bg-green-50 relative  rounded-lg shadow-sm p-3 h-[12rem] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-green-100 border border-green-200 rounded-full text-green-600">
            <BiCategory className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-base font-semibold text-green-700">
            Danh Mục Bán Chạy
          </h1>
        </div>

        {topSeller.length > 0 && (
          <div>
            <p className="text-xs mb-2 text-green-500">Top danh mục bán chạy</p>
            <div className="space-y-1.5">
              {topSeller.map((cate) => (
                <div
                  key={cate._id}
                  className="flex justify-between items-center bg-green-100 px-2.5 py-1 rounded-md border border-green-200"
                >
                  <span className="font-medium text-xs">{cate.name}</span>
                  <span className="text-[11px] font-semibold text-green-700">
                    Đã bán: {cate.soldCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          className="text-[11px]  font-medium absolute bottom-2 right-2 text-blue-500 mt-2 text-right hover:underline"
          to={"/category_management"}
        >
          Xem chi tiết
        </Link>
      </div>
    </>
  );
}

export default CateBest_Seller;
