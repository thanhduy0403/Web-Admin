import React, { useState } from "react";
import { Save } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { GrProductHunt } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { Eye } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { FaUserCog } from "react-icons/fa";
import { CircleUserRound } from "lucide-react";
import { TicketCheck } from "lucide-react";
import { Key } from "lucide-react";

function PermissionList({
  assignPermission,
  permissionList,
  selectedEndpoints,
  handleCheckBoxChange,
}) {
  const [isShow, setIsShow] = useState(false);

  const togglePermission = (permissionId) => {
    //...prev để lấy các key value
    /* {
 ex  abc123: true, ==> hiện ra
  xyz456: false ==> ẩn đi
}*/
    setIsShow((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId], // toggle true/false
    }));
  };

  return (
    <>
      <h1 className="mt-10 text-xl font-bold mb-10">Cấp quyền</h1>
      {permissionList ? (
        <div>
          {permissionList.getListPermission.map((permission) => (
            <div className="mx-2 text-sm mb-5" key={permission._id}>
              <div
                onClick={() => togglePermission(permission._id)}
                className={`flex items-center border-b border-gray-300 py-2 cursor-pointer  `}
              >
                <div className="flex-1 font-semibold flex items-center gap-3  ">
                  <div className="border w-[2.5rem] h-[2.5rem] p-2 rounded-lg">
                    {permission.name === "Sản Phẩm" ? (
                      <GrProductHunt size={18} />
                    ) : permission.name === "Danh Mục Sản Phẩm" ? (
                      <BiCategory size={18} />
                    ) : permission.name === "Quản Lý Đơn Hàng" ? (
                      <ListOrdered size={18} />
                    ) : permission.name === "Quản Lý Tài Khoản" ? (
                      <FaUserCog size={18} />
                    ) : permission.name === "Quản Lý Khách Hàng" ? (
                      <CircleUserRound size={18} />
                    ) : permission.name === "Quản Lý Voucher" ? (
                      <TicketCheck size={18} />
                    ) : (
                      <Key size={18} />
                    )}
                  </div>
                  {permission.name}
                </div>

                <div className="flex justify-center flex-none w-20">
                  {/* lấy dựa theo permission cha */}
                  {isShow[permission._id] ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>
              {/* tương tự endpoint con cũng vậy */}
              {isShow[permission._id] &&
              permission.endpoints &&
              permission.endpoints.length > 0 ? (
                <div
                  className={`flex flex-col  overflow-hidden transition-all duration-300 ${
                    isShow[permission._id]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col ">
                    <div className="flex flex-col">
                      {permission.endpoints.map((endpoint) => (
                        <div
                          key={endpoint._id}
                          className={`flex items-center hover:bg-gray-50 border-b border-gray-50 py-2 min-h-[48px] ${
                            selectedEndpoints.includes(endpoint._id)
                              ? "bg-gray-50"
                              : ""
                          }`}
                        >
                          <div className="flex-1 flex items-center min-h-[48px] ml-2 gap-2">
                            {endpoint.title.includes("Xem") && (
                              <Eye className="text-blue-400" size={20} />
                            )}
                            {endpoint.title.includes("Thêm") && (
                              <FolderPlus
                                className="text-green-400"
                                size={20}
                              />
                            )}
                            {(endpoint.title.includes("Cập Nhật") ||
                              endpoint.title.includes("Xác Nhận")) && (
                              <SquarePen
                                className="text-yellow-400"
                                size={20}
                              />
                            )}
                            {(endpoint.title.includes("Xóa") ||
                              endpoint.title.includes("Hủy")) && (
                              <Trash2 className="text-red-400" size={20} />
                            )}

                            {endpoint.title}
                          </div>

                          <div className="flex justify-center items-center flex-none w-20 h-full">
                            <input
                              type="checkbox"
                              checked={selectedEndpoints.includes(endpoint._id)}
                              onChange={() =>
                                handleCheckBoxChange(endpoint._id)
                              }
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div className="mt-10 w-[12rem] mx-auto py-2 rounded-lg bg-blue-500 mb-4">
        <button
          onClick={assignPermission}
          className="text-white  px-3 flex items-center gap-2 text-center font-semibold"
        >
          <Save />
          Xác nhận thay đổi
        </button>
      </div>
    </>
  );
}

export default PermissionList;
