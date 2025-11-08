import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartCreateBy } from "../redux/apiRequest";
import { setCart } from "../redux/cartSlice";
import Sidebar from "../components/Sidebar";
function Home() {
  const checkLogin = useSelector((state) => state.auth?.login.currentUser);
  const [searchProduct, setSearchProduct] = useState("");

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (checkLogin?.token) {
  //     dispatch(setCart());
  //   }
  // }, [dispatch]);
  return (
    <>
      <Navbar setSearchProduct={setSearchProduct} />
      <div className="w-full  min-h-screen flex gap-2 mt-20">
        <div className="w-[13%]   ">
          <Sidebar />
        </div>
        <div className="w-[85%] mx-auto border-l bg-slate-50 border-2">
          <CategoryList />
          <ProductList searchProduct={searchProduct} />
        </div>
      </div>
    </>
  );
}

export default Home;
