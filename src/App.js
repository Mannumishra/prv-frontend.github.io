import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import About from "./Components/About";
import Product from "./Components/Product";
import Contact from "./Components/Contact";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import SinglePageProduct from "./Components/SinglePageProduct";
import AdminHome from "./Components/Admin/AdminHome";
import CreateProduct from "./Components/Admin/Product/CreateProduct";
import UpdateProduct from "./Components/Admin/Product/UpdateProduct";
import AdminProduct from "./Components/Admin/Product/AdminProduct";
import Orders from "./Components/Orders";
import PageNotFound from "./Components/PageNotFound";
import AdminOrder from "./Components/Admin/AdminOrder";
import SingleProductPage from "./Components/SingleProductPage";
import Category from "./Components/Admin/Category/Category";
import Subcategory from "./Components/Admin/Subcategory/Subcategory";
import CreateCtegory from "./Components/Admin/Category/CreateCtegory";
import UpdateCategory from "./Components/Admin/Category/UpdateCategory";
import CreateSubcategory from "./Components/Admin/Subcategory/CreateSubcategory";
import UpdateSubcategory from "./Components/Admin/Subcategory/UpdateSubcategory";
import CreateSize from "./Components/Admin/Size/CreateSize";
import Size from "./Components/Admin/Size/Size";
import UpdateSize from "./Components/Admin/Size/UpdateSize";


function App() {

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:_id" element={<SingleProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/singlepage" element={<SinglePageProduct />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/product/create" element={<CreateProduct />} />
          <Route path="/editproduct/:_id" element={<UpdateProduct />} />

          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/category/create" element={<CreateCtegory />} />
          <Route path="/editcategory/:_id" element={<UpdateCategory />} />

          <Route path="/admin/subcategory" element={<Subcategory />} />
          <Route path="/admin/subcategory/create" element={<CreateSubcategory />} />
          <Route path="/editsubcategory/:_id" element={<UpdateSubcategory />} />

          <Route path="/admin/size" element={<Size />} />
          <Route path="/admin/size/create" element={<CreateSize />} />
          <Route path="/editsize/:_id" element={<UpdateSize />} />


          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
