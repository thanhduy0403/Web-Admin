import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Button, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrease, increase } from "../redux/apiRequest";

function ProductDetail() {
  const [data, setData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSize, setSelectedSize] = useState(""); // Thêm state chọn size
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const navigate = useNavigate();
  const checkLogin = useSelector((state) => state.auth.login?.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();
  const getDetail = async () => {
    try {
      const res = await axiosInstance.get(`/v1/admin/product/${id}`, {
        withCredentials: true,
      });
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        messageApi.error("Không đủ quyền để truy cập");
      } else {
        messageApi.error("Lỗi");
      }
    }
  };

  const handleIncreaseQuantity = async (e) => {
    e.preventDefault();
    // try {
    //   if (quantity + 1 > maxQuantity) {
    //     messageApi.error("Sản phẩm quá giới hạn trong kho");
    //     return;
    //   } else {
    //     setQuantity((prev) => prev + 1);
    //   }
    // } catch (error) {
    //   messageApi.error("Không thể tăng số lượng sản phẩm");
    // }
    if (data?.sizes?.length > 0 && selectedSize) {
      if (quantity + 1 > maxQuantity) {
        messageApi.error("Sản phẩm quá giới hạn trong kho");
        return;
      }
    } else {
      if (quantity + 1 > data.stock) {
        messageApi.error("Sản phẩm quá giới hạn trong kho");
        return;
      }
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = async (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async (id) => {
    if (!checkLogin) {
      messageApi.error("Bạn cần đăng nhập để thêm sản phẩm");
      return;
    }
    if (!id) {
      console.error("ID sản phẩm không hợp lệ");
      return;
    }

    // ✅ Nếu có size
    if (data?.sizes?.length > 0) {
      if (!selectedSize) {
        messageApi.error("Vui lòng chọn size");
        return;
      }
      messageApi.success("Thêm sản phẩm thành công");
      dispatch(addToCart(id, quantity, selectedSize));
    } else {
      // ✅ Không có size
      // if (quantity > data.stock) {
      //   messageApi.error(`Không đủ hàng, chỉ còn ${data.stock} sản phẩm`);
      //   return;
      // }
      messageApi.success("Thêm sản phẩm thành công");
      dispatch(addToCart(id, quantity));
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="text-center mt-10 text-2xl font-semibold md:text-4xl sm:text-3xl ">
        <h1>Chi Tiết Sản Phẩm</h1>
      </div>
      <div className="px-4 mt-5 mb-5 ">
        {data ? (
          <div className="md:flex  ">
            <div className=" w-full  md:w-[55%] sm:w-1/2 ">
              <img
                className="w-full h-[30rem] rounded-sm "
                src={data.image}
                alt=""
              />
            </div>
            <div className="w-full md:w-1/4 sm:w-1/2 md:text-start text-center md:ml-[5rem]  md:text-xl font-semibold md:mt-[5rem]  mt-[2rem] space-y-3">
              <h1 className="text-4xl mr-[1rem]">{data.name}</h1>
              <h1 className="font-semibold mr-[3rem] ">
                Còn lại:{" "}
                <span className="font-thin">{data.amount || data.stock}</span>
              </h1>
              <h1 className="">
                Giá gốc:{" "}
                <span className="line-through">
                  {" "}
                  {data.price.toLocaleString("de-DE")} $
                </span>
              </h1>
              <div className=" bg-red-500 bg:w-[7rem] md:ml-[0px] w-[7rem]  ml-[10rem]  text-center  ">
                <h1 className="text-white   rounded-sm px-3">
                  Sale: {data.discount}%
                </h1>
              </div>
              <h1 className="text-red-600">
                Giá giảm: {data.discountedPrice.toLocaleString("de-DE")}$
              </h1>
              {data?.sizes?.length > 0 && (
                <div className="my-4">
                  <label className="block mb-1 text-black font-medium">
                    Chọn size:
                  </label>
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedSize}
                    onChange={(e) => {
                      const select = e.target.value;
                      setSelectedSize(select);
                      const found = data.sizes.find(
                        (item) => item.size === select
                      );
                      // found?.quantity là số lượng còn lại của size
                      setMaxQuantity(found?.quantity || 0);
                      setQuantity(1);
                    }}
                  >
                    <option value="">--Chọn size--</option>
                    {data.sizes &&
                      data.sizes.map((item) => (
                        <option key={item.size} value={item.size}>
                          {item.size} (Còn {item.quantity})
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {/* chọn size sẽ hiển thị số lượng đã order */}
              {data?.sizes?.length > 0 && selectedSize && (
                <div className="flex items-center gap-2">
                  <span>Số lượng:</span>
                  <div className="flex items-center justify-between text-[1rem] w-[4rem] text-center bg-slate-400 px-1">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span className="w-1/3 text-center border-l border-r border-gray-700">
                      {quantity}
                    </span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                </div>
              )}

              {(!data?.sizes || data?.sizes.length === 0) && (
                <div className="flex items-center gap-2">
                  <span>Số lượng:</span>
                  <div className="flex items-center justify-between text-[1rem] w-[4rem] text-center bg-slate-400 px-1">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span className="w-1/3 text-center border-l border-r border-gray-700">
                      {quantity}
                    </span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                </div>
              )}
              {/* button add */}
              <div className="text-center w-full py-2 bg-[rgb(239,83,42)] flex items-center justify-center space-x-2">
                <FaCartPlus className="text-white" />
                <button
                  onClick={() => handleAddToCart(data._id)}
                  className="text-white font-semibold "
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1>đang tải sản phẩm</h1>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
