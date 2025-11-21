import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./page/Home";
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
import BannerManagement from "./components/Banner/BannerManagement";
import AdminLayout from "./components/LayoutAdmin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ❌ Các trang KHÔNG dùng admin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/categoryDetail/:id" element={<CategoryDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkOut" element={<CheckOut />} />
        <Route path="FormAddProduct" element={<FormAddProduct />} />
        <Route path="FormEditProduct/:id" element={<FormEditProduct />} />
        {/* ✅ Các trang Admin dùng AdminLayout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product/edit/:id" element={<ProductManagement />} />
          <Route path="product_management" element={<ProductManagement />} />
          <Route path="category_management" element={<CategoryManagement />} />
          <Route path="category/edit/:id" element={<CategoryManagement />} />
          <Route path="order_management" element={<OrderManagement />} />
          <Route path="account_management" element={<AccountManagement />} />
          <Route path="permission/:id" element={<PermissionAccount />} />
          <Route path="FormCategory" element={<FormCategory />} />
          <Route path="user_management" element={<UserManagement />} />
          <Route path="voucher_management" element={<Voucher />} />
          <Route path="comment_management" element={<CommentManagement />} />
          <Route path="modal_comment" element={<ModalReplyComment />} />
          <Route path="banner_management" element={<BannerManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
