import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/apiRequest";
import { Link } from "react-router-dom";

function CategoryList() {
  const getList = useSelector((state) => state.category.categories.getAll);
  console.log(getList);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);
  return (
    <>
      <div className="">
        <h1 className="text-center mt-10  text-2xl md:text-4xl sm:text-3xl ">
          Category List
        </h1>
        <div className="flex flex-wrap md:mx-[4rem] mt-4 items-center justify-center mb-5  h-auto bg-transparent ">
          {getList.categories?.map((item, index) => (
            <Link
              to={`/categoryDetail/${item._id}`}
              className="flex flex-col items-center justify-center cursor-pointer mx-4 mt-5  rounded-lg p-4"
              key={index}
            >
              {/* Hình ảnh sản phẩm */}
              <img
                className="h-[5rem] w-[5rem] object-cover rounded-full mb-2"
                src={item.image}
                alt=""
              />
              {/* Tên sản phẩm */}
              <h1 className="text-black text-lg  text-center">{item.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
