import { useEffect, useState } from "react";
import Overview from "../../component/Overview";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { ToastContainer } from "react-toastify";

const ProductDetails = () => {
  return (
    <>
      <ToastContainer />

      <Header />
      <Overview />
      <Footer />
    </>
  );
};

export default ProductDetails;
