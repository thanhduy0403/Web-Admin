import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Popconfirm, message } from "antd";
import { CornerUpLeft, Trash2 } from "lucide-react";

function ModalReplyComment({ productID }) {
  const [getProduct, setGetProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [reply, setReply] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteComment = async (commentID) => {
    try {
      const res = await axiosInstance.delete(`/v1/admin/comment/${commentID}`);
      if (res.data.success) {
        messageApi.success("Xóa comment thành công");
        await getCommentsProduct();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
        return;
      } else {
        messageApi.error("Xóa comment thất bại");
      }
    }
  };

  const handleDeleteReply = async (commentID, replyID) => {
    try {
      const res = await axiosInstance.delete(
        `/v1/admin/comment/${commentID}/reply/${replyID}`
      );
      if (res.data.success) {
        messageApi.success("Xóa phản hồi thành công");
        await getCommentsProduct();
      }
    } catch (error) {
      messageApi.error("Xóa phản hồi thất bại");
    }
  };
  const handleReplyComment = async (commentID) => {
    try {
      if (!reply.trim()) {
        messageApi.error("Hãy nhập nội dung");
        return;
      }
      const data = {
        replyText: reply.trim(),
      };
      const res = await axiosInstance.post(
        `/v1/admin/comment/reply/${commentID}`,
        data
      );
      if (res.data.success) {
        messageApi.success("Phản hồi thành công");
        await getCommentsProduct();
        setShowReplyInput(null);
        setReply("");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
        return;
      } else {
        messageApi.error("Phản hồi thất bại");
      }
    }
  };
  const getProductID = async () => {
    try {
      const res = await axiosInstance.get(`/v1/admin/product/${productID}`);
      if (res.data.success) {
        setGetProduct(res.data.getOne);
        console.log(res.data);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
        return;
      } else {
        setGetProduct(null);
      }
    }
  };
  const getCommentsProduct = async () => {
    try {
      const res = await axiosInstance.get(
        `/v1/admin/comment/getComment/${productID}`
      );
      if (res.data.success) {
        setComments(res.data.formatted);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
        return;
      } else {
        setComments([]);
      }
    }
  };
  useEffect(() => {
    if (productID) {
      getProductID();
      getCommentsProduct();
    }
  }, [productID]);

  return (
    <>
      {contextHolder}
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm max-h-[500px] overflow-y-auto">
        {/* ✅ Phần thông tin sản phẩm */}
        <div className="flex gap-4 items-center border-b pb-4 mb-4">
          <img
            className="w-20 h-20 object-cover rounded-md"
            src={getProduct?.image}
            alt={getProduct?.name}
          />

          <div className="flex flex-col">
            <h2 className="font-semibold text-lg text-gray-800">
              {getProduct?.name}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2">
              {getProduct?.description}
            </p>
          </div>
        </div>

        {/* ✅ Danh sách bình luận */}
        <div className="space-y-4">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((cmt) => (
              <div
                key={cmt._id}
                className="bg-white rounded-xl p-4 shadow-sm border"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar người bình luận */}
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full font-semibold text-gray-700">
                    {cmt.author.type === "guest"
                      ? cmt.author.guestName?.charAt(0).toUpperCase()
                      : cmt.author.username?.charAt(0).toUpperCase()}
                  </div>

                  {/* Nội dung bình luận */}
                  <div className="flex-1">
                    {/* Hàng đầu: tên + thời gian */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-gray-900 font-semibold">
                          {cmt.author.type === "guest"
                            ? cmt.author.guestName
                            : cmt.author.username}
                        </h1>
                        <span className="text-xs text-gray-500">
                          Bình luận{" "}
                          {formatDistanceToNow(new Date(cmt.createdAt), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </span>
                      </div>
                      <Popconfirm
                        title="Bạn có muốn xóa bình luận này?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleDeleteComment(cmt._id)}
                      >
                        <Trash2
                          size={16}
                          className="text-gray-400 hover:text-red-500 transition"
                        />
                      </Popconfirm>
                    </div>

                    {/* Nội dung bình luận */}
                    <p className="mt-2 text-gray-700">{cmt.question}</p>

                    {/* Nút trả lời */}
                    <div className="mt-2">
                      <button
                        className="text-blue-500 text-sm font-medium hover:underline"
                        onClick={() =>
                          setShowReplyInput(
                            showReplyInput === cmt._id ? null : cmt._id
                          )
                        }
                      >
                        {showReplyInput === cmt._id ? "Hủy" : "Trả lời"}
                      </button>
                    </div>

                    {/* Ô nhập phản hồi */}
                    {showReplyInput === cmt._id && (
                      <div className="mt-3">
                        <p className="flex items-center gap-2 text-sm mb-2">
                          <CornerUpLeft size={18} /> Đang trả lời:{" "}
                          <span className="font-medium">
                            {cmt.author.type === "guest"
                              ? cmt.author.guestName
                              : cmt.author.username}
                          </span>
                        </p>

                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleReplyComment(cmt._id);
                            }
                          }}
                          className="w-full min-h-[70px] rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                          placeholder="Viết phản hồi..."
                        ></textarea>

                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setShowReplyInput(null)}
                            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleReplyComment(cmt._id)}
                            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ✅ Danh sách phản hồi */}
                    {cmt.replies.length > 0 && (
                      <div className="mt-4 border-l-2 pl-6 border-gray-200 space-y-3">
                        {cmt.replies.map((rep) => (
                          <div
                            key={rep._id}
                            className="flex items-start gap-3 justify-between"
                          >
                            {/* Trái: Avatar + nội dung */}
                            <div className="flex gap-3 flex-1">
                              <div className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full font-semibold text-blue-800 text-sm">
                                {rep.author.type === "guest"
                                  ? rep.author.guestName
                                      ?.charAt(0)
                                      .toUpperCase()
                                  : rep.author.type === "admin"
                                  ? rep.author.fullname?.charAt(0).toUpperCase()
                                  : rep.author.username
                                      ?.charAt(0)
                                      .toUpperCase()}
                              </div>

                              <div className="rounded-xl px-2 py-1 flex flex-col">
                                <h1 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                                  {rep.author.type === "guest"
                                    ? rep.author.guestName
                                    : rep.author.type === "admin"
                                    ? rep.author.fullname
                                    : rep.author.username}
                                  {rep.isOfficialAnswer === true && (
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                      Quản trị viên
                                    </span>
                                  )}
                                </h1>
                                <span className="text-gray-500 text-xs">
                                  Trả lời{" "}
                                  {formatDistanceToNow(
                                    new Date(rep.createdAt),
                                    {
                                      addSuffix: true,
                                      locale: vi,
                                    }
                                  )}
                                </span>
                                <p className="text-gray-700 text-sm mt-1">
                                  <span className="font-medium mr-1 text-gray-950">
                                    @
                                    {cmt.author.type === "guest"
                                      ? cmt.author.guestName
                                      : cmt.author.username}
                                  </span>
                                  {rep.replyText}
                                </p>
                              </div>
                            </div>
                            {/* Phải: Icon xoá reply */}
                            <Popconfirm
                              title="Bạn có muốn xóa phản hồi này?"
                              okText="Có"
                              cancelText="Không"
                              onConfirm={() =>
                                handleDeleteReply(cmt._id, rep._id)
                              }
                            >
                              <Trash2
                                size={16}
                                className="text-gray-400 hover:text-red-500 transition"
                              />
                            </Popconfirm>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic text-sm">
              Chưa có bình luận nào.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalReplyComment;
