import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  addToCart,
  getCartCreateBy,
  getListProduct,
} from "../redux/apiRequest";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, message, Space } from "antd";
import { Pagination } from "antd";

function ProductList({ searchProduct }) {
  //searchProduct hiển thị ra dữ liệu từ setSearchProduct
  const [messageApi, contextHolder] = message.useMessage();
  const checkLogin = useSelector((state) => state.auth.login?.currentUser);
  const getProduct = useSelector((state) => state.product.products.getAll);

  //page hiện tại = 1
  const [currentPage, setCurrentPage] = useState(1);

  //số lượng sản phẩm được hiện thị trên page
  const itemsPerPage = 4;

  // console.log("getProduct", getProduct);
  const dispatch = useDispatch();
  const handleAddToCart = async (id) => {
    if (!checkLogin) {
      messageApi.error("Bạn cần đăng nhập để thêm sản phẩm");
      // navigate("/login");
      return;
    }
    if (!id) {
      console.error("ID sản phẩm không hợp lệ");
      return;
    }
    messageApi.success("Thêm sản phẩm thành công");
    dispatch(addToCart(id));
  };

  const filterProduct = getProduct.filter((item) =>
    item.name?.toLowerCase().includes(searchProduct?.toLowerCase())
  );

  // tính số lượng sản phẩm sẽ hiển thị trên page
  //1. lấy thứ tự sản phẩm đầu tiên 1 page
  // (1-1) * 4 = 0 ==> lấy sản phẩm ở vị trí đầu tiên
  const startIndex = (currentPage - 1) * itemsPerPage;
  //2. lấy sản phẩm cuối cùng trên 1 page
  // 0 + 4  = 4 ==> 0->1->2->3
  const endIndex = startIndex + itemsPerPage;
  // dùng slice để cắt startIndex và endIndex ==> 0->3 sẽ là 4 sản phẩm bắt đầu từ vị trị thứ 0
  const displayedProduct = filterProduct.slice(startIndex, endIndex);

  useEffect(() => {
    getListProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // khi tìm kiếm thì sẽ đưa về page đầu tiên và hiện thị kết quả cần tìm
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm thay đổi
  }, [searchProduct]);
  return (
    <>
      {contextHolder}
      <div>
        <h1 className=" text-center mt-10 text-2xl md:text-4xl ">
          Product List
        </h1>

        {displayedProduct.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:grid-cols-2 mb-5 md:mx-[4rem] items-center justify-center">
            {displayedProduct.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 cursor-pointer mx-2 bg-white
        shadow-lg mt-5 shadow-blue-200 rounded-lg p-4 relative space-y-5 "
              >
                <div className="bg-red-600 px-2 py-1 rounded-bl-lg top-0 right-0 absolute">
                  <h1 className="text-center text-white">
                    Sale {item.discount}%
                  </h1>
                </div>
                <Link to={`/productDetail/${item._id}`}>
                  <img
                    className="h-[12.4rem] mt-5 w-[80%] mx-auto object-cover rounded-lg "
                    src={item.image}
                    alt=""
                  />
                  <div className="flex justify-between mt-5">
                    {/* name and price */}
                    <div className="text-start">
                      <h1 className="text-black text-md ">{item.name}</h1>
                      <h1 className="text-gray-600 text-sm">
                        Còn lại: {item.amount}
                      </h1>
                    </div>

                    {/* discountPrice and amount */}
                    <div className="text-end">
                      <h1 className="text-black">
                        Giá gốc:
                        <span className="line-through">
                          {item.price.toLocaleString("de-DE")}$
                        </span>
                      </h1>
                      <h1 className="text-red-700">
                        Giá giảm: {item.discountedPrice.toLocaleString("de-DE")}
                        $
                      </h1>
                    </div>
                  </div>
                </Link>
                {/* button add */}
                <div className="text-center w-full py-2 bg-[rgb(239,83,42)] flex items-center justify-center space-x-2">
                  <FaCartPlus className="text-white" />
                  <button className="text-white">Thêm vào giỏ hàng</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10 mb-10 w-full">
            <h1 className="text-xl font-semibold text-gray-600 ">
              Không tìm thấy sản phẩm nào
            </h1>
          </div>
        )}

        <Pagination
          className="mb-5"
          align="center"
          pageSize={itemsPerPage}
          current={currentPage}
          // tổng số sản phẩm sau khi lọc và sẽ biết có bao nhiêu trang cần hiển thị
          // vd filterProduct.lenght = 50 thì mỗi page sẽ có 10 sản phẩm và sẽ có 5 page
          total={filterProduct.length}
          showSizeChanger={false}
          // nhận page làm 1 trang mới
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductList;
