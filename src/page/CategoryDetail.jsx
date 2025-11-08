import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FaCartPlus } from "react-icons/fa";
function CategoryDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const getDetailCategory = async () => {
    const res = await axiosInstance.get(`/v1/admin/category/${id}`, {
      withCredentials: true,
    });
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getDetailCategory();
  }, [id]);
  return (
    <>
      <Navbar />
      {/* lấy chi tiết sản phẩm từ getDetailCategory */}
      <h1 className="mt-[7rem] text-center font-semibold text-4xl">
        Category Product
      </h1>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  sm:grid-cols-2 mb-5 md:mx-[4rem] items-center justify-center">
          {data.products.map((product) => (
            <Link
              className="border border-gray-300 cursor-pointer mx-2  bg-white shadow-lg mt-5 shadow-blue-200 rounded-lg p-4 relative space-y-5 "
              to={`/productDetail/${product._id}`}
              key={product._id}
            >
              <div className="bg-red-600 px-2 py-1  rounded-bl-lg top-0 right-0 absolute">
                <h1 className="text-center text-white ">
                  Sale {product.discount}%
                </h1>
              </div>
              <img
                className="h-[12.4rem] w-[80%] object-cover rounded-lg mx-auto "
                src={product.image}
                alt=""
              />
              <div className="flex justify-between mt-5">
                {/* name and price */}
                <div className="text-start ">
                  <h1 className="text-black text-lg font-semibold">
                    {product.name}
                  </h1>
                  <h1 className="text-gray-600 text-sm">
                    {" "}
                    Còn lại: {product.amount}
                  </h1>
                </div>

                {/* discountPrice and amount */}
                <div className="text-end font-semibold">
                  <h1 className="text-back  ">
                    Giá gốc:
                    <span className="line-through"> {product.price}$</span>
                  </h1>
                  <h1 className="text-red-700 ">
                    Giá giảm : {product.discountedPrice}$
                  </h1>
                </div>
              </div>
              {/* button add */}
              <div className="text-center w-full py-2 bg-[rgb(239,83,42)] flex items-center justify-center space-x-2">
                <FaCartPlus className="text-white" />
                <button className="text-white font-semibold ">
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>Đang tải dữ liệu...</div>
      )}
    </>
  );
}

export default CategoryDetail;
