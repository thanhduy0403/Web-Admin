import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../layout/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { SquarePen } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import { getCategory, getListProduct } from "../../redux/apiRequest";
import Sidebar from "../Sidebar";
import { Package } from "lucide-react";
import OverViewProduct from "./OverViewProduct";
import { Popconfirm } from "antd";
import { message } from "antd";

function ProductManagement() {
  // const getProduct = useSelector((state) => state.product?.products.getAll);
  const checkAdmin = useSelector((state) => state.auth.login?.currentUser);
  const getItemCate = useSelector((state) => state.category.categories.getAll);

  const [messageApi, contextHolder] = message.useMessage();
  const [query, setQuery] = useState("");
  const [selectCate, setSelectCate] = useState("");
  const [selectAmount, setSelectAmount] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/product/getList");
      if (res.data.success) {
        setProduct(res.data.products);
      } else {
        setProduct([]);
      }
    } catch (error) {
      console.log("Error:", error);
      setProduct([]);
    }
  };

  console.log("getItemCate", getItemCate);

  const handleDeleteItemProduct = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.delete(`/v1/admin/product/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        messageApi.success("Xóa sản phẩm thành công");
        await getProduct();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Xóa thất bại");
      }
    }
  };

  // truyền state gồm dữ liệu sản phẩm sang cho location để nhận dữ liệu từ state đó
  const getInfoProduct = (productID) => {
    navigate(`/FormEditProduct/${productID.id}`, { state: { productID } });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (
      getProduct === undefined ||
      getProduct.length === 0 ||
      getItemCate === undefined ||
      getItemCate.length === 0
    ) {
      getCategory(dispatch);
    }
  }, []);

  const getAmountProduct = (amount, stock) => {
    if (amount > 10 || stock > 10) return "Còn hàng";
    if (amount > 0 || (stock > 0 && amount < 10) || stock < 10)
      return "Sắp hết";
    return "Hết hàng";
  };
  const productStatus = ["Còn hàng", "Sắp hết", "Hết hàng"];

  const filterProduct = Array.isArray(product)
    ? product.filter((item) => {
        const matchesQuery = item.name
          .toLowerCase()
          .includes(query.toLocaleLowerCase());
        const matchesCategory =
          selectCate === "" || item.categoryID?.name === selectCate;
        // sử dụng hàm thì getAmountProduct(item.amount) === selectAmount;
        const matchesAmount =
          selectAmount === "" ||
          getAmountProduct(item.amount || item.stock) === selectAmount;
        return matchesQuery && matchesCategory && matchesAmount;
      })
    : [];

  return (
    <>
      {contextHolder}

      <div className="flex justify-between mt-16  mr-3 px-10 items-center">
        <div>
          <h1 className="text-xl font-bold">Quản Lý Sản Phẩm</h1>
          <span className="text-gray-500 text-sm">
            Quản lý tất cả sản phẩm trong cửa hàng
          </span>
        </div>
        <div className="">
          <div className="bg-black px-4 py-1 text-center font-semibold rounded-sm border-2">
            <Link to={"/FormAddProduct"} className=" text-white ">
              Thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[95%] mx-auto mt-3">
        <OverViewProduct product={product} />
      </div>
      {/* data list */}

      <div className="w-[90%] h-auto mx-auto border shadow-md rounded-md bg-white mb-4 mt-10">
        <div className="flex items-center  justify-between mx-auto px-[2rem] py-4">
          <h1 className=" text-xl font-bold "> 📦 Danh Sách Sản Phẩm </h1>

          <div className="flex items-center justify-center gap-3 ">
            {/* query */}
            <div className="relative w-[12rem]">
              {/* <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-2 pr-2 py-2 w-full border text-sm rounded-md"
                placeholder="🔍 Tìm kiếm sản phẩm..."
              />
            </div>
            {/* filter category */}
            <select
              className="block w-[12rem]  p-2 border font-semibold rounded-md text-sm z-10"
              value={selectCate}
              onChange={(e) => setSelectCate(e.target.value)}
            >
              <option className="text-black font-semibold " value="">
                Tất cả các danh mục
              </option>
              {getItemCate.categories &&
                getItemCate?.categories.map((cate) => (
                  <option className="font-normal" key={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
            {/* filter amount */}
            <select
              value={selectAmount}
              onChange={(e) => setSelectAmount(e.target.value)}
              className="block w-[12rem] font-semibold  p-2 border rounded-md text-sm z-10"
            >
              <option value="">tất cả trạng thái</option>
              {productStatus.map((pro, index) => (
                <option key={index}>{pro}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[95%] mx-auto  mb-5 mt-2 rounded-md overflow-hidden  bg-white border border-gray-200 ">
          <table className="w-full text-sm  border ">
            <thead className=" text-xs text-gray-500   uppercase rounded-md hover:bg-slate-50">
              <tr className="border-b border-gray-700 ">
                <th className="px-4 py-3">Hình Ảnh</th>
                <th className="px-4 py-3">Sản Phẩm</th>
                <th className="px-4 py-3">Danh Mục</th>
                <th className="px-4 py-3">Số Lượng</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Giảm Giá</th>
                {/* <th className="px-4 py-3">Tồn Kho</th> */}
                <th className="px-4 py-3">Trạng Thái</th>
                <th className="px-4 py-3">Giá Bán</th>
                <th className="px-4 py-3">Số Lượng Mua</th>
                <th className="px-4 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="justify-center text-center ">
              {filterProduct.length > 0 ? (
                <>
                  {filterProduct?.map((item, index) => (
                    <tr
                      className=" hover:bg-gray-50 transition-colors duration-200 ease-in-out  "
                      key={index}
                    >
                      <td className="w-[4rem] h-[4rem] py-10 text-left pl-4">
                        <img
                          src={item.image}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="font-semibold border-gray-200">
                        {item.name}
                      </td>
                      <td>
                        <span className="inline-block px-3  border border-gray-300 rounded-full text-sm  bg-gray-50">
                          {item.categoryID?.name}
                        </span>
                      </td>
                      <td className=" border-gray-200">
                        {item.amount || item.stock}
                      </td>
                      <td className=" border-gray-200">
                        <div className="flex items-center justify-center gap-1">
                          <span className="min-w-[60px] text-right">
                            {item.price.toLocaleString("de-DE")}đ
                          </span>
                        </div>
                      </td>
                      <td className="border-gray-200">
                        <div className="flex items-center justify-center ">
                          <FaArrowDown className="text-red-700 shrink-0" />
                          <span className="min-w-[40px] text-center">
                            {item.discount}%
                          </span>
                        </div>
                      </td>

                      {/* <td className="   border-gray-200">
                            <div className="flex items-center justify-center gap-1">
                              <span className="min-w-[40px] text-center">
                                {item.amount || item.stock}
                              </span>
                            </div>
                          </td> */}

                      <td>
                        <span
                          className={`inline-block w-[4.5rem] text-center rounded-lg text-sm font-semibold ${
                            item.amount > 10 || item.stock > 10
                              ? " bg-green-50 text-green-500 hover:bg-slate-800 hover:text-white "
                              : (item.amount > 0 || item.stock > 0) &&
                                (item.amount < 10 || item.stock < 10)
                              ? "bg-yellow-50 text-yellow-500 hover:bg-slate-800 hover:text-white"
                              : "bg-red-50 text-red-500 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {item.amount > 10 || item.stock > 10
                            ? "Còn hàng"
                            : (item.amount > 0 || item.stock > 0) &&
                              (item.amount < 10 || item.stock < 10)
                            ? "Sắp hết"
                            : "Hết hàng"}
                        </span>{" "}
                      </td>

                      <td className=" border-gray-200 text-red-700">
                        <div className="gap-1 items-center flex justify-center ">
                          <span className="min-w-[60px] text-right">
                            {item.discountedPrice.toLocaleString("de-DE")}đ
                          </span>
                        </div>
                      </td>
                      <td>{item.soldCount}</td>
                      <td className="flex items-center justify-center py-10 mt-4 gap-3 cursor-pointer">
                        <SquarePen
                          onClick={() => getInfoProduct(item)}
                          className="text-blue-500 "
                          size={18}
                        />
                        <Popconfirm
                          title="Bạn có muốn xóa sản phẩm này?"
                          onConfirm={(e) =>
                            handleDeleteItemProduct(e, item._id)
                          }
                          okText="Có"
                          cancelText="Không"
                        >
                          <span>
                            <RiDeleteBin6Line
                              className="text-red-500 "
                              size={18}
                            />
                          </span>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Package className="w-8 h-8 mb-2" />
                      <p>Không tìm thấy sản phẩm nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProductManagement;
