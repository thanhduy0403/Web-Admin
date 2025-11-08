import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "../components/Cart/CartItems";
import { BsCartPlus } from "react-icons/bs";
import OrderSummary from "../components/OrderSummary";

function Cart() {
  const getProduct = useSelector((state) => state.product.products.getAll);
  console.log("getProduct", getProduct);
  const getItems = useSelector((state) => state.myCart.cartItems || []);
  const totalQuantityProducts = useSelector(
    (state) => state.myCart.totalQuantityProducts
  );
  const totalPriceProducts = useSelector(
    (state) => state.myCart.totalPriceProducts
  );
  console.log("totalQuantityProducts", totalQuantityProducts);
  console.log("getItems", getItems);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />

      <div className="w-[1300px] mx-auto  py-2 h-auto mt-20  ">
        <div className="flex  text-white items-center rounded-sm justify-center py-2 text-center text-4xl gap-x-1 font-semibold w-[20rem]  bg-orange-500">
          <BsCartPlus />
          <h1 className="text-gray-600 ">Shopping Cart</h1>
        </div>

        <div className="flex gap-x-10">
          {/* cartItem */}
          <div className="w-3/4 h-auto">
            <CartItems getItems={getItems} />
          </div>
          {/* order summary */}
          <div className="w-2/4 bg-gray-100 shadow-md h-[22rem]">
            <OrderSummary
              totalPriceProducts={totalPriceProducts}
              totalQuantityProducts={totalQuantityProducts}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
