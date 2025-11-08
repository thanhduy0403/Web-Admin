import axiosInstance from "../../axiosInstance";

export const Product_Inventory = async () => {
  const res = await axiosInstance.get("/v1/admin/product/getList");
  return res.data;
};
