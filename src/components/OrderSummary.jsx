import React, { useState } from "react";
import { GrCaretNext } from "react-icons/gr";
import { Link } from "react-router-dom";

function OrderSummary({ totalQuantityProducts, totalPriceProducts }) {
  const shippingCost = 10000;
  const orderTotal = (Number(totalPriceProducts) || 0) + shippingCost;
  console.log("totalPriceProducts: " + totalPriceProducts);
  return (
    <>
      <div className="mt-10 px-10 d text-[1.2rem] space-y-6">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="justify-between flex text-[1rem]">
          <span className="text-gray-600 font-medium">SubTotal </span>
          <span>
            {(Number(totalPriceProducts) || 0).toLocaleString("de-DE")}$
          </span>
        </div>
        <div className="justify-between flex text-[1rem]">
          <span className="text-gray-600 font-medium">ProductsTotal </span>
          <span>{totalQuantityProducts}</span>
        </div>
        <div className="justify-between flex text-[1rem]">
          <span className="text-gray-600 font-medium">Shipping estimate</span>
          {totalQuantityProducts > 0 ? (
            <span>{shippingCost.toLocaleString("de-DE")}$</span>
          ) : (
            <span>0</span>
          )}
        </div>
        <div className="justify-between flex text-[1rem]">
          <span className=" font-medium">Order total</span>
          <span className="font-semibold">
            {totalQuantityProducts > 0 ? (
              <span>
                {orderTotal > 0
                  ? orderTotal.toLocaleString("de-DE") + "$"
                  : "0$"}
              </span>
            ) : (
              <span>0</span>
            )}
          </span>
        </div>
        <div className="text-center flex items-center gap-1 justify-center cursor-pointer rounded-md py-2 bg-indigo-600 w-full text-white text-base font-medium hover:bg-indigo-700">
          <GrCaretNext />
          <Link to={"/checkOut"}>Checkout</Link>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
