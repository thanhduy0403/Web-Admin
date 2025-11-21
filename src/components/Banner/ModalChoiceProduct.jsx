import React, { useEffect, useState } from "react";

function ModalChoiceProduct({ products, onConfirm, defaultSelected }) {
  const [selectProducts, setSelectProducts] = useState([]);
  useEffect(() => {
    if (defaultSelected.length > 0) {
      setSelectProducts(defaultSelected.map((pro) => pro.id || pro._id));
    } else {
      setSelectProducts([]);
    }
  }, [defaultSelected]);
  const handleSelect = (id) => {
    if (selectProducts.includes(id)) {
      // nếu đã chọn thì bỏ chọn
      setSelectProducts(selectProducts.filter((pro) => pro !== id));
    } else {
      setSelectProducts([...selectProducts, id]); // thêm vào danh sách đã chọn
    }
  };

  return (
    <>
      <div>
        {products.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`text-center items-center cursor-pointer  rounded-md ${
                  selectProducts.includes(item.id)
                    ? "border border-blue-500 bg-blue-50"
                    : "border border-gray-200"
                }`}
              >
                <div className="w-full h-32  mt-2 rounded-md">
                  <img
                    className="w-full h-full object-cover p-2"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="space-y-1 mb-1 ">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-gray-600">{item.categoryID.name}</p>
                  <span className="font-bold text-red-500">
                    {item.discountedPrice.toLocaleString("de-DE")}đ{" "}
                    {item.discount}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Không tim thấy sản phẩm</div>
        )}
        <div className="w-[5rem] border mt-5 py-1 text-center bg-blue-500 rounded-md">
          <button
            onClick={() => onConfirm(selectProducts)}
            className="text-white  font-semibold"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalChoiceProduct;
