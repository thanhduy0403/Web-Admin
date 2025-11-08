import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Input from "../../layout/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  getListProduct,
  postProduct,
  updateProduct,
} from "../../redux/apiRequest";
import { useState } from "react";
import { Button, message, Space } from "antd";
import { useLocation } from "react-router-dom";

function FormEditProduct() {
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [hasSize, setHasSize] = useState(false);
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [discount, setDiscount] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState("");
  const getCate = useSelector((state) => state.category?.categories.getAll);
  const getItemCate = Array.isArray(getCate.categories)
    ? getCate.categories
    : [];
  console.log("getItemCate", getItemCate);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  // state? để tránh state undefined
  // dùng location để nhận dữ liệu từ state
  const product = location.state?.productID;
  const id = product?._id || params.id;
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!name || !desc || discount === "" || !price || !selected) {
      messageApi.error("Hãy điền đầy đủ thông tin sản phẩm");
      return;
    }

    let validSizes = [];
    if (hasSize) {
      validSizes = sizes.filter(
        (item) => item.size.trim() !== "" && item.quantity !== ""
      );
      if (validSizes.length === 0) {
        messageApi.error("Vui lòng điền ít nhất 1 size");
        return;
      }
    } else {
      if (!stock || stock < 0) {
        messageApi.error("Vui lòng nhập số lượng hoặc số lượng phải hơn 0");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    if (hasSize) {
      formData.append("sizes", JSON.stringify(validSizes));
      formData.append("stock", "");
    } else {
      formData.append("stock", stock);
      formData.append("sizes", JSON.stringify([]));
    }
    formData.append("discount", discount);
    if (typeof image !== "string") {
      formData.append("image", image);
    }
    gallery.forEach((file) => {
      if (typeof file !== "string") {
        // chỉ gửi file mới
        formData.append("gallery", file);
      }
    });
    formData.append(
      "oldGallery",
      JSON.stringify(gallery.filter((file) => typeof file === "string"))
    );
    formData.append("categoryID", selected);
    try {
      const newUpdate = await updateProduct(dispatch, id, formData);
      if (newUpdate) {
        messageApi.success(" Cập nhật thành công");
        setName("");
        setSizes([]);
        setStock("");
        setHasSize(false);
        setDesc("");
        setDiscount("");
        setPrice("");
        setSelected("");
        setGallery([]);
        setImage(null);
        await getListProduct(dispatch);
      }
      console.log(newUpdate);
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 403 ? "Không đủ quyền truy cập" : "Tạo mới thất bại";

      messageApi.error(message);
    }
  };

  useEffect(() => {
    if (getItemCate === undefined || getItemCate.length === 0) {
      getCategory(dispatch);
    }
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDesc(product.description);
      setPrice(product.price);
      setHasSize(product.sizes && product.sizes.length > 0);
      setSizes(product.sizes || []);
      setStock(product.stock || "");
      setDiscount(product.discount);
      setSelected(product.categoryID._id);
      setImage(product.image);
      setGallery(product.gallery);
    }
  }, [product]);

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const handleRemoveSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };
  return (
    <>
      {contextHolder}
      <div className="w-full h-[5rem] bg-white shadow-md border-b">
        <div className="w-[70%] flex items-center gap-10 mx-auto h-[5rem] px-2">
          <Link to="/product_management">
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Cập Nhật Sản Phẩm
            </h1>
            <span className="text-gray-500">
              Điền thông tin cơ bản của sản phẩm
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-full bg-gray-50 pt-5">
        {/* Thông tin cơ bản */}
        <div className="w-[70%] py-4 px-5 bg-white mb-5 mx-auto border shadow-md rounded-md">
          <h1 className="text-2xl font-semibold text-black">
            Thông tin sản phẩm
          </h1>
          <span className="text-gray-500 text-sm">
            Nhập thông tin cơ bản về sản phẩm của bạn
          </span>
          <div className="mt-5">
            <label className="text-black text-md">Tên sản phẩm *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              className="w-full mt-2 rounded-md border py-2 px-2 text-black text-sm mb-5"
            />

            <label className="text-black text-md">Mô tả sản phẩm *</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full p-2.5 border rounded-md mb-5"
              placeholder="Nhập mô tả sản phẩm"
            />

            <label className="text-black text-md">Danh mục *</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-[15rem] p-2 border rounded-md text-sm mb-5"
            >
              <option value="" disabled>
                --chọn danh mục--
              </option>
              {getItemCate.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Giá & Kho */}
        <div className="w-[70%] mt-10 py-4 px-5 bg-white mb-5 mx-auto border shadow-md rounded-md">
          <h1 className="text-2xl font-semibold text-black">Giá & Kho Hàng</h1>
          <span className="text-gray-500 text-sm">
            Thiết lập giá bán và số lượng tồn kho
          </span>
          <div className="flex gap-10 mt-5">
            <div className="flex flex-col">
              <label>Giá đề xuất</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-[16rem] py-1 px-3 border rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label>Giảm giá %</label>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                className="w-[16rem] py-1 px-3 border rounded-md"
              />
            </div>

            {/* Toggle size */}
            <div className="flex flex-col mt-2">
              <label className="font-semibold">Sản phẩm có size?</label>
              <div className="flex gap-5 mt-1">
                <label>
                  <input
                    type="radio"
                    checked={hasSize}
                    onChange={() => setHasSize(true)}
                  />{" "}
                  Có
                </label>
                <label>
                  <input
                    type="radio"
                    checked={!hasSize}
                    onChange={() => setHasSize(false)}
                  />{" "}
                  Không
                </label>
              </div>
            </div>
          </div>

          {/* Nhập size hoặc stock */}
          {hasSize ? (
            <div className="mt-5 px-6">
              <div className="flex gap-10 mb-2">
                <label>Size</label>
                <label>Số lượng</label>
              </div>
              {sizes.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Size"
                    value={item.size}
                    onChange={(e) =>
                      handleSizeChange(idx, "size", e.target.value)
                    }
                    className="w-[8rem] border"
                  />
                  <Input
                    type="number"
                    placeholder="Số lượng"
                    value={item.quantity}
                    onChange={(e) =>
                      handleSizeChange(idx, "quantity", e.target.value)
                    }
                    className="w-[8rem] border"
                  />
                  {sizes.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveSize(idx)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-500"
                onClick={handleAddSize}
              >
                + Thêm size
              </button>
            </div>
          ) : (
            <div className="mt-5 px-6">
              <label>Số lượng *</label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Nhập số lượng tồn kho"
                className="w-[16rem] py-1 px-3 border rounded-md"
              />
            </div>
          )}

          {/* Upload ảnh chính */}
          <div className="mt-10">
            <label
              htmlFor="upload-main"
              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-md hover:border-blue-400"
            >
              <p className="font-medium text-gray-700">Ảnh chính</p>
              <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md font-semibold mt-2">
                Chọn ảnh
              </div>
              <input
                id="upload-main"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            {image && (
              <div className="relative mt-4 inline-block">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Upload gallery */}
          <div className="mt-10">
            <label
              htmlFor="upload-gallery"
              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-md hover:border-blue-400"
            >
              <p className="font-medium text-gray-700">Ảnh phụ (gallery)</p>
              <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md font-semibold mt-2">
                Chọn ảnh
              </div>
              <input
                id="upload-gallery"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => setGallery([...gallery, ...e.target.files])}
              />
            </label>
            {gallery.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-4">
                {gallery.map((file, idx) => (
                  <div key={idx} className="relative inline-block">
                    <img
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt={`gallery-${idx}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                      onClick={() =>
                        setGallery(gallery.filter((_, i) => i !== idx))
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-end gap-5">
            <Link
              to="/product_management"
              className="px-3 py-1 bg-white border rounded-md shadow-md font-semibold text-black"
            >
              Hủy
            </Link>
            <button
              onClick={handleUpdateProduct}
              className="px-6 py-2 bg-black text-white rounded-md font-semibold"
            >
              Cập nhật sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormEditProduct;
