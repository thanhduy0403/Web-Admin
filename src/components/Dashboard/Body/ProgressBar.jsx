import React from "react";

function ProcessBar({ label, percent }) {
  const getColor = (value) => {
    if (value > 75) return "bg-green-500 text-green-500";
    if (value >= 50) return "bg-yellow-500 text-yellow-500";
    return "bg-red-500 text-red-500";
  };
  const color = getColor(percent);
  return (
    <>
      <div className="grid grid-cols-[100px_1fr_50px] items-center w-full mb-4">
        {/* Tiêu đề */}
        <span className="text-sm font-semibold text-gray-700">{label}</span>

        {/* Thanh màu săc */}
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner mx-2">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              // bg-green-500...
              color.split(" ")[0]
            }`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* Phần Trăm */}
        <span
          className={`text-sm font-semibold text-right ml-2 ${
            // text-green-500...
            color.split(" ")[1]
          }`}
        >
          {percent}%
        </span>
      </div>
    </>
  );
}

export default ProcessBar;
