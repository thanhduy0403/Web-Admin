import React, { useEffect, useState } from "react";
import Input from "../../layout/Input";
import { Trash } from "lucide-react";
import { Pagination } from "antd";
import axiosInstance from "../../axiosInstance";
import { message } from "antd";
import { Popconfirm } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
function UserList({ data, getData }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [query, setQuery] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const userStatus = ["Hoạt động", "Đã xóa"];
  const filterUserList = Array.isArray(data)
    ? data.filter((item) => {
        const matchesUser = selectStatus === "" || selectStatus === item.status;
        const matchesQuery = item.username
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesUser && matchesQuery;
      })
    : [];

  //page hiện tại = 1
  const [currentPage, setCurrentPage] = useState(1);

  //số lượng sản phẩm được hiện thị trên page
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayUser = filterUserList.slice(startIndex, endIndex);

  const handleDeleteUser = async (id) => {
    try {
      const res = await axiosInstance.delete(`/v1/admin/auth/${id}`);
      if (res.data.success) {
        messageApi.success(res.data.message);
        await getData();
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
        messageApi.error("Lỗi server");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mx-auto px-[3rem] rounded-md mb-6">
        {/* Header + Filter */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            🧑 Danh Sách Khách Hàng
          </h1>
          <div className="flex items-center gap-5">
            {/* tìm kiếm account */}
            <div className="relative w-[14rem]">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-2 pr-2 py-2 w-full border text-sm rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="🔍Tìm kiếm tài khoản..."
              />
            </div>
            {/* chọn chức vụ */}
            <select
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
              className="block w-[12rem] px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Tất Cả</option>
              {userStatus.map((item) => (
                <option key={item._id}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="w-[95%] mx-auto border rounded-lg border-gray-200 shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3 text-left w-1/5">👤 Tài Khoản</th>
                <th className="px-6 py-3 text-left w-1/5">📊 Trạng Thái</th>
                <th className="px-6 py-3 text-left w-1/5">📧 Email</th>
                <th className="px-6 py-3 text-left w-1/5">📅 Ngày Tạo</th>
                <th className="px-6 py-3 text-center w-1/5">⚙️ Thao Tác</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {displayUser && displayUser.length > 0 ? (
                displayUser.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {item.username}
                    </td>
                    <td className="px-6 py-3">
                      {item.status === "Hoạt động" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-green-700 bg-green-100 text-xs font-medium">
                          🟢 Hoạt động
                        </span>
                      )}
                      {item.status === "Đã xóa" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-red-700 bg-red-100 text-xs font-medium">
                          🔴 Đã xóa
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-800">{item.email}</td>
                    <td className="px-6 py-3 text-gray-800">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center items-center">
                        <Popconfirm
                          title="Bạn có khách hàng khoản này?"
                          onConfirm={() => handleDeleteUser(item._id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <RiDeleteBin6Line
                            size={18}
                            className="text-red-500 cursor-pointer hover:scale-110 transition"
                          />
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end mb-5">
            <Pagination
              pageSize={itemsPerPage}
              current={currentPage}
              total={data.length}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
