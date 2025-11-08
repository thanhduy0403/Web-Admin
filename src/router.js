import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import ProductDetail from "./page/ProductDetail";
import CategoryDetail from "./page/CategoryDetail";
import ProductManagement from "./components/Product/ProductManagement";
import CategoryManagement from "./components/Category/CategoryManagement";
import Cart from "./page/Cart";
import CheckOut from "./page/CheckOut";
import OrderManagement from "./components/Order/OrderManagement";
import AccountManagement from "./components/Account/AccountManagement";
import PermissionAccount from "./components/Permission/PermissionAccount";
import FormEditProduct from "./components/Product/FormEditProduct";
import FormAddProduct from "./components/Product/FormAddProduct";
import FormCategory from "./components/Category/FormCategory";
import Dashboard from "./components/Dashboard/Dashboard";
import UserManagement from "./components/User/UserManagement";
import Voucher from "./components/Voucher/Voucher";
import CommentManagement from "./components/Comment/CommentManagement";
import ModalReplyComment from "./components/Comment/ModalReplyComment";

function router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/productDetail/:id" element={<ProductDetail />}></Route>
          <Route
            path="/categoryDetail/:id"
            element={<CategoryDetail />}
          ></Route>
          <Route
            path="/product_management"
            element={<ProductManagement />}
          ></Route>
          <Route
            path="/category_management"
            element={<CategoryManagement />}
          ></Route>
          <Route
            path="/category/edit/:id"
            element={<CategoryManagement />}
          ></Route>
          <Route
            path="/product/edit/:id"
            element={<ProductManagement />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkOut" element={<CheckOut />}></Route>
          <Route path="/order_management" element={<OrderManagement />}></Route>
          <Route
            path="/account_management"
            element={<AccountManagement />}
          ></Route>
          <Route path="/permission/:id" element={<PermissionAccount />}></Route>
          <Route path="/FormAddProduct" element={<FormAddProduct />}></Route>
          <Route path="/FormEditProduct/:id" element={<FormEditProduct />} />
          <Route path="/FormCategory" element={<FormCategory />}></Route>
          <Route path="/user_management" element={<UserManagement />}></Route>
          <Route path="/voucher_management" element={<Voucher />}></Route>
          <Route
            path="/comment_management"
            element={<CommentManagement />}
          ></Route>
          <Route path="/modal_comment" element={<ModalReplyComment />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default router;
