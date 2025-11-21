import React, { useEffect, useState } from "react";
import Input from "../../layout/Input";
import ModalChoiceProduct from "./ModalChoiceProduct";
import { Modal } from "antd";
import axiosInstance from "../../axiosInstance";
import { message } from "antd";

function ModalBanner({ getListBanner, setOpenModal, editBanner }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState(null); // danh sách sản phẩm
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [imageBanner, setImageBanner] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (editBanner) {
      setTitle(editBanner.title || "");
      setImageBanner(editBanner.image || "");
      setStartDate(
        editBanner.startDate
          ? new Date(editBanner.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        editBanner.endDate
          ? new Date(editBanner.endDate).toISOString().split("T")[0]
          : ""
      );
      setSelectedProducts(editBanner.products || []);
    } else {
      setTitle("");
      setImageBanner("");
      setStartDate("");
      setEndDate("");
      setSelectedProducts([]);
    }
  }, [editBanner]);
  const handleUpdateBanner = async () => {
    if (!title || !imageBanner || selectedProducts.length === 0) {
      messageApi.error("Hãy điền đầy đủ thông tin");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", imageBanner);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append(
        "products",
        JSON.stringify(selectedProducts.map((p) => p._id))
      );
      const res = await axiosInstance.patch(
        `/v1/admin/banner/${editBanner._id}`,
        formData
      );
      if (res.data.success) {
        messageApi.success(res.data.message);
        await getListBanner();
        setTitle("");
        setImageBanner(null);
        setSelectedProducts([]);
        setTimeout(() => {
          setOpenModal(false);
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      }
    }
  };
  const handlePostBanner = async () => {
    if (!title || !imageBanner || selectedProducts.length === 0) {
      messageApi.error("Hãy điền đầy đủ thông tin");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", imageBanner);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append(
        "products",
        JSON.stringify(selectedProducts.map((p) => p._id))
      );
      const res = await axiosInstance.post(
        `/v1/admin/banner/create_banner`,
        formData
      );
      if (res.data.success) {
        messageApi.success(res.data.message);
        await getListBanner();
        setTitle("");
        setSelectedProducts([]);
        setImageBanner(null);
        setTimeout(() => {
          setOpenModal();
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      }
    }
  };

  const getProduct = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/product/getList");
      setProducts(res.data.products);
    } catch (error) {
      setProducts([]);
    }
  };
  const showChoiceProduct = () => {
    setOpenModalProduct(true);
  };
  const handleOk = () => {
    setOpenModalProduct(false);
  };
  const handleCancel = () => {
    setOpenModalProduct(false);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {contextHolder}
      <div className="space-y-4 mt-4">
        {/* title banner  */}
        <div className="space-y-1">
          <label className="font-semibold">
            Mã Banner <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="style_address"
            placeholder="Nhập tiêu đề banner "
          />
        </div>

        {/* Upload image */}
        <div className="space-y-1">
          <label className="font-semibold">
            Ảnh Banner <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="upload"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16v-4m0 0V8m0 4h10m-5 4v-4m0 0V8m0 4h10"
              />
            </svg>
            <p className="text-gray-700 font-medium">
              Kéo thả hình ảnh vào đây
            </p>
            <p className="text-sm text-gray-500 my-1">hoặc</p>
            <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-md font-semibold hover:bg-blue-100">
              Chọn hình ảnh
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB mỗi file.
            </p>
            <input
              onChange={(e) => setImageBanner(e.target.files[0])}
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>

          {imageBanner && (
            <div className="relative mt-4 inline-block">
              <img
                src={
                  typeof imageBanner === "string"
                    ? imageBanner
                    : URL.createObjectURL(imageBanner)
                }
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border shadow"
              />
              <button
                type="button"
                onClick={() => setImageBanner(null)}
                className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                title="Xóa ảnh"
              >
                ×
              </button>
            </div>
          )}
        </div>
        {/* startDate, endDate */}
        <div className="w-full flex gap-2">
          {/* startDate */}
          <div className="space-y-1 ">
            <label className="font-semibold">
              Ngày bắt đầu <span className="text-red-500">*</span>
            </label>
            <Input
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="style_address w-[1/2]"
            />
          </div>
          {/* endDate */}
          <div className="space-y-1 ">
            <label className="font-semibold">
              Ngày kết thúc <span className="text-red-500">*</span>
            </label>
            <Input
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="style_address w-[1/2]"
            />
          </div>
        </div>
        {/* add product */}
        <div className="space-y-1">
          <label className="font-semibold">
            Chọn sản phẩm<span className="text-red-500">*</span>
          </label>
          <div className="w-full border bg-blue-50 text-center py-2  border-blue-200 ">
            <button
              onClick={showChoiceProduct}
              className="text-blue-600 font-semibold"
            >
              Chọn sản phẩm từ danh sách
            </button>
          </div>
        </div>
        {/* product select */}
        <div>
          <label className="font-semibold">Sản phẩm đã chọn</label>
          <div className="mt-2 flex flex-wrap items-center">
            {selectedProducts.map((p) => (
              <div className="border mr-2 px-2 rounded-md bg-blue-50 ">
                <h1 className="text-blue-500 font-semibold ">{p.name}</h1>
              </div>
            ))}
          </div>
        </div>
        {/* button add banner */}
        <div className="w-full bg-blue-500 rounded-md py-1 text-center">
          {editBanner ? (
            <button
              onClick={handleUpdateBanner}
              className=" text-white font-semibold"
            >
              Cập nhật banner
            </button>
          ) : (
            <button
              onClick={handlePostBanner}
              className=" text-white font-semibold"
            >
              Tạo banner
            </button>
          )}
        </div>
      </div>
      <Modal
        title={
          <div>
            <h1>Chọn sản phẩm</h1>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModalProduct}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <div className="max-h-[70vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ModalChoiceProduct
            defaultSelected={selectedProducts}
            products={products}
            onConfirm={(productIDs) => {
              const chosenProducts = products.filter((p) =>
                productIDs.includes(p.id)
              );
              setSelectedProducts(chosenProducts);
              handleCancel();
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalBanner;
