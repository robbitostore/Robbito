import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useTheme } from "./utils/ThemeContext";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "./pages/Services";
import AllBlogs from "./pages/Blogs/AllBlogs";
import BlogDetails from "./pages/Blogs/BlogDetails";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Login from "./pages/admin/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import { useAuth } from "./utils/authContext";
import { useEffect } from "react";
import AllServices from "./pages/admin/services/AllServices";
import AdminBlogs from "./pages/admin/blogs/AdminBlogs";
import Gallery from "./pages/admin/gallery/Gallery";
import AdminComments from "./pages/admin/comments/AdminComments";
import Subscription from "./pages/admin/Subscription";
import AllOrders from "./pages/admin/Orders/AllOrders";
import LayoutSetting from "./pages/admin/LayoutSetting";
import AdminContact from "./pages/admin/Contact/AdminContact";
import CreateOrder from "./pages/Order.js/CreateOrder";
import OrderSuccessPage from "./pages/Success";
import ServiceDetails from "./pages/ServiceDetails";

function ScrollToTop() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
}

function App() {
  const { theme } = useTheme();
  const { auth } = useAuth();
  AOS.init();
  useEffect(() => {
    console.log("User:", auth);
  }, [auth]);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-950"
      }`}
      data-aos-duration="1000"
    >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/detail/:id" element={<BlogDetails />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create/order" element={<CreateOrder />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/service/detail/:id" element={<ServiceDetails />} />

          {/* Admin Panal */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/services" element={<AllServices />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/gallery" element={<Gallery />} />
          <Route path="/admin/comments" element={<AdminComments />} />
          <Route path="/admin/messages" element={<AdminContact />} />
          <Route path="/admin/subscription" element={<Subscription />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          <Route path="/admin/layout-settings" element={<LayoutSetting />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
