import React, { useEffect, useState } from "react";
import Input from "../../layout/Input";
import { message } from "antd";
import axiosInstance from "../../axiosInstance";

function FormVoucher({ getListVoucher, handleCancel, editVoucher }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    code: "",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    expiryDate: "",
    quantity: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelEditVoucher = async () => {
    if (!formData.code || !formData.discountValue) {
      messageApi.error("Hãy điền đầy đủ thông tin");
      return;
    }
    try {
      const res = await axiosInstance.patch(
        `/v1/admin/voucher/${editVoucher._id}`,
        formData
      );
      if (res.data.success) {
        messageApi.success(res.data.message);
        await getListVoucher(); // load lại table
        setTimeout(() => {
          handleCancel();
        }, 500); // set thời gian đóng form
      } else {
        messageApi.error(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Cập nhật thất bại");
      }
    }
  };
  // khi editVoucher thay đổi=> fill dữ liệu vào form
  useEffect(() => {
    if (editVoucher) {
      setFormData({
        code: editVoucher.code,
        discountValue: editVoucher.discountValue,
        minOrderValue: editVoucher.minOrderValue,
        maxDiscount: editVoucher.maxDiscount,
        expiryDate: editVoucher.expiryDate
          ? new Date(editVoucher.expiryDate).toISOString().split("T")[0]
          : "",
        quantity: editVoucher.quantity,
      });
    } else {
      setFormData({
        code: "",
        discountValue: "",
        minOrderValue: "",
        maxDiscount: "",
        expiryDate: "",
        quantity: "",
      });
    }
  }, [editVoucher]);

  const handleAdd = async () => {
    if (!formData.code || !formData.discountValue) {
      return messageApi.error("Vui lòng nhập đủ mã voucher và % giảm.");
    }
    try {
      const res = await axiosInstance.post(
        "/v1/admin/voucher/createVoucher",
        formData
      );
      if (res.data.success) {
        messageApi.success(res.data.message);
      }
      await getListVoucher();
      setTimeout(() => {
        handleCancel();
      }, 500);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Thêm thất bại");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="space-y-4 mt-4">
        {/* Mã Voucher */}
        <div className="space-y-1">
          <label className="font-semibold">
            Mã Voucher <span className="text-red-500">*</span>
          </label>
          <Input
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="style_address"
            placeholder="Nhập mã voucher (VD: SALE20)"
          />
        </div>

        {/* Phần trăm giảm */}
        <div className="space-y-1">
          <label className="font-semibold">
            Phần Trăm Giảm (%) <span className="text-red-500">*</span>
          </label>
          <Input
            name="discountValue"
            type="number"
            value={formData.discountValue}
            onChange={handleChange}
            className="style_address"
            placeholder="Nhập % giảm (VD: 10)"
          />
        </div>

        {/* Giá trị đơn hàng tối thiểu */}
        <div className="space-y-1">
          <label className="font-semibold">
            Giá Trị Đơn Hàng Tối Thiểu (VND){" "}
            <span className="text-red-500">*</span>
          </label>
          <Input
            name="minOrderValue"
            type="number"
            value={formData.minOrderValue}
            onChange={handleChange}
            className="style_address"
            placeholder="VD: 200000"
          />
        </div>

        {/* Giảm tối đa */}
        <div className="space-y-1">
          <label className="font-semibold">
            Giảm Tối Đa (VND) <span className="text-red-500">*</span>
          </label>
          <Input
            name="maxDiscount"
            type="number"
            value={formData.maxDiscount}
            onChange={handleChange}
            className="style_address"
            placeholder="VD: 50000"
          />
        </div>
        {/* Giảm ngày đến hạn */}
        <div className="space-y-1">
          <label className="font-semibold">
            Ngày hết hạn <span className="text-red-500">*</span>
          </label>
          <Input
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            className="style_address"
            placeholder="VD: 20/10/2025"
          />
        </div>
        {/* số lượng còn lại */}
        <div className="space-y-1">
          <label className="font-semibold">
            Số lượng còn lại <span className="text-red-500">*</span>
          </label>
          <Input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="style_address"
            placeholder="VD: 20"
          />
        </div>
        <div className="w-full border text-center bg-blue-500 rounded-md py-2 cursor-pointer">
          {editVoucher ? (
            <button
              onClick={handelEditVoucher}
              className="text-white font-semibold"
            >
              Cập nhật voucher
            </button>
          ) : (
            <button onClick={handleAdd} className="text-white font-semibold">
              Tạo Voucher
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default FormVoucher;
