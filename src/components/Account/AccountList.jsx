import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Eye, SquarePen } from "lucide-react";
import Input from "../../layout/Input";
import { CiSearch } from "react-icons/ci";
import { UserRoundCog } from "lucide-react";
import { Modal } from "antd";
import axiosInstance from "../../axiosInstance";
import { getAllUser } from "../../redux/apiRequest";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
function AccountList({ account, getAccount }) {
  const [openUpdateAccount, setOpenUpdateAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  console.log(account?.AccountList);

  // nếu có thì lấy data getAccount?.AccountList
  const QueryAccount = Array.isArray(account)
    ? account.filter((item) => {
        const matchesAccount = item.fullname
          .toLowerCase()
          .includes(query.toLocaleLowerCase());
        return matchesAccount;
      })
    : [];

  const handleUpdateAccount = async (id) => {
    try {
      const res = await axiosInstance.patch(
        `/v1/admin/account/${id}`,
        {
          email: email,
          fullname: fullname,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        messageApi.success("Cập nhật thành công");
        setFullname("");
        setEmail("");
        getAccount(); // load lại dữ liệu
        // set thời gian đóng form
      }
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
        messageApi.error("Cập nhập thất bại");
      }
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      const res = await axiosInstance.delete(`/v1/admin/account/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        messageApi.success("Xóa tài khoản thành công");
        setTimeout(() => {
          getAccount();
        }, 500);
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

  // handle open modal create account
  const showModalView = (acc) => {
    setOpenUpdateAccount(true); // mở modal
    setSelectedAccount(acc);
    setFullname(acc.fullname || "");
    setEmail(acc.email || "");
  };
  const handleOk = () => {
    setOpenUpdateAccount(false);
  };
  const handleCancel = () => {
    setOpenUpdateAccount(false);
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mx-auto px-[3rem] rounded-md mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          👨‍💻 Danh Sách Tài Khoản
        </h1>
        <div className="flex items-center gap-5">
          {/* tìm kiếm account */}
          <div className="relative w-[14rem]">
            {/* <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-2 pr-2 py-2 w-full border text-sm rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="🔍Tìm kiếm tài khoản..."
            />
          </div>
          {/* chọn chức vụ */}
          <select className="block w-[12rem] px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="">Tất Cả</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-[90%] mx-auto border rounded-lg border-gray-200 shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">👤 Tài Khoản</th>
              <th className="px-6 py-3 text-left">🎯 Vai Trò</th>
              <th className="px-6 py-3 text-left">📧 Email</th>
              <th className="px-6 py-3 text-left">📅 Ngày Tạo</th>
              <th className="py-3 text-center">⚙️ Thao Tác</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {QueryAccount.length > 0 ? (
              QueryAccount.map((acc) => (
                <tr
                  key={acc._id}
                  className="hover:bg-gray-50 transition-colors duration-200 ease-in-out border-b"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {acc.fullname}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        acc.position === "Admin"
                          ? "bg-red-100 text-red-600"
                          : acc.position === "Staff"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {acc.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{acc.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(acc.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-4 text-center flex items-center justify-center gap-4">
                    <Link
                      to={`/permission/${acc._id}`}
                      className="border w-[8rem] text-white bg-black gap-2 font-medium rounded-md px-2 py-1 flex items-center justify-center hover:bg-gray-800 transition"
                    >
                      <UserRoundCog size={18} className="text-white" /> Cấp
                      quyền
                    </Link>

                    <SquarePen
                      onClick={() => showModalView(acc)}
                      size={18}
                      className="text-blue-500 cursor-pointer hover:scale-110 transition"
                    />

                    <Popconfirm
                      title="Bạn có muốn xóa tài khoản này?"
                      onConfirm={() => handleDeleteAccount(acc._id)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <RiDeleteBin6Line
                        size={18}
                        className="text-red-500 cursor-pointer hover:scale-110 transition"
                      />
                    </Popconfirm>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <UserRoundCog className="w-8 h-8 mb-2" />
                    <p>Không tìm thấy tài khoản</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  modal cập nhật tài khoản */}
      <Modal
        title="Cập nhật tài khoản"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openUpdateAccount}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Input
          onChange={(e) => setFullname(e.target.value)}
          className="w-full mt-1 px-2 py-1 border mb-4"
          placeholder="Nhập họ tên"
          value={fullname}
        />

        <label htmlFor="" className="mb-2">
          Nhập email
        </label>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full  mt-1 px-2 py-1 border mb-4"
          placeholder="Nhập email"
          value={email}
        />
        <div className="w-full mx-auto mt-5 py-2 text-center rounded-md border bg-black">
          <button
            onClick={() => handleUpdateAccount(selectedAccount._id)}
            className="text-white text-sm font-semibold "
          >
            Cập nhật tài khoản
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AccountList;
