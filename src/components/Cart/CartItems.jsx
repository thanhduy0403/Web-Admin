import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { Popconfirm, message } from "antd";
import {
  decrease,
  deleteItemCart,
  getCartCreateBy,
  increase,
} from "../../redux/apiRequest";
import { ToastContainer } from "react-toastify";
import empty_cart from "../../assets/empty_cart.jpg";

function CartItems({ getItems }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const getCart = async () => {
    const res = await axiosInstance.get("/v1/admin/cart/getCart");
    setData(res.data?.cartWithTotalPrice || []); // ✅ lấy cartWithTotalPrice
    console.log(res.data);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDeleteItem = async (e, productID, size) => {
    e.preventDefault();
    await deleteItemCart(dispatch, productID, size);
    messageApi.success("Xóa sản phẩm thành công");
    setTimeout(() => {
      getCartCreateBy(dispatch);
      getCart();
    }, 200);
  };

  // Tăng số lượng
  const handleIncreaseQuantity = async (
    e,
    productID,
    currentQuantity,
    product,
    size
  ) => {
    e.preventDefault();
    try {
      // Nếu có size → kiểm tra theo size.quantity
      if (product.sizes && product.sizes.length > 0 && size) {
        const sizeInfo = product.sizes.find((s) => s.size === size);
        if (sizeInfo && currentQuantity + 1 > sizeInfo.quantity) {
          return messageApi.error("Sản phẩm quá giới hạn trong kho");
        }
      } else {
        // Nếu không có size → kiểm tra theo stock
        if (currentQuantity + 1 > product.stock) {
          return messageApi.error("Sản phẩm quá giới hạn trong kho");
        }
      }

      // SỬA DÒNG NÀY: truyền currentQuantity + 1
      await increase(dispatch, productID, currentQuantity + 1, size);
      getCart();
    } catch (error) {
      console.log(error);
      messageApi.error("Không thể tăng số lượng sản phẩm");
    }
  };

  // Giảm số lượng
  const handleDecreaseQuantity = async (
    e,
    productID,
    currentQuantity,
    size
  ) => {
    e.preventDefault();
    if (currentQuantity <= 1) {
      await handleDeleteItem(e, productID, size);
    } else {
      await decrease(dispatch, productID, currentQuantity, size);
      getCart();
    }
  };

  // Load giỏ hàng
  useEffect(() => {
    getCartCreateBy(dispatch);
    getCart();
  }, [dispatch]);

  return (
    <>
      {contextHolder}
      <ToastContainer />

      <div className="p-2 bg-[#ffffff] shadow-lg shadow-gray-300">
        {getItems.length > 0 ? (
          <div className="font-semibold">
            {getItems.map((item) => (
              <div className="border-t border-gray-400 relative" key={item._id}>
                <div className="flex mt-2 ">
                  <img
                    className="w-[12rem] h-[12rem] mb-[2.5rem] rounded-md"
                    src={item.image}
                    alt=""
                  />
                  <div className="mx-2">
                    <h1 className="font-semibold text-xl">{item.name}</h1>

                    <div className="flex items-center ">
                      <FaArrowDown className="text-red-700 shrink-0" />
                      <span className="text-center">{item.discount}%</span>
                      <p className="line-through ml-2 text-gray-500">
                        {item.price}$
                      </p>
                    </div>

                    {/* Nút tăng giảm */}
                    <div className="flex items-center justify-between text-[1rem] w-[6rem] text-center bg-slate-400 px-1">
                      {item.quantity <= 1 ? (
                        <Popconfirm
                          title="Bạn có chắc muốn xóa sản phẩm này không?"
                          onConfirm={(e) =>
                            handleDeleteItem(e, item._id, item.size)
                          }
                          okText="Có"
                          cancelText="Không"
                        >
                          <button>-</button>
                        </Popconfirm>
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDecreaseQuantity(
                              e,
                              item._id,
                              item.quantity,
                              item.size
                            )
                          }
                        >
                          -
                        </button>
                      )}

                      <span className="w-1/3 text-center border-l border-r border-gray-700">
                        {item.quantity}
                      </span>

                      <button
                        onClick={(e) =>
                          handleIncreaseQuantity(
                            e,
                            item._id,
                            item.quantity,
                            item, // truyền toàn bộ item để kiểm tra stock hoặc size
                            item.size
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Hiển thị size nếu có */}
                    {item.size && (
                      <span className="block mt-1 text-gray-700">
                        Size: {item.size}
                      </span>
                    )}

                    <p className="mt-2 text-red-500">{item.discountedPrice}$</p>
                    <p>
                      TotalPrice:{" "}
                      {item.totalPrice
                        ? item.totalPrice.toLocaleString("de-DE") + "$"
                        : "0$"}
                    </p>

                    <button
                      onClick={(e) => handleDeleteItem(e, item._id, item.size)}
                      className="absolute bottom-0 right-0 mb-1 bg-red-600 px-2 py-1 text-white rounded-bl-lg"
                    >
                      Xóa Sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img src={empty_cart} alt="" />
          </div>
        )}
      </div>
    </>
  );
}

export default CartItems;
