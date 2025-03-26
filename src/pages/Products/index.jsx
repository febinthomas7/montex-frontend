import React, { useEffect, useState } from "react";
import ProductList from "../../component/ProductList";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import BottomNav from "../../component/BottomNav";
import Masonry from "../../component/Masonry";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((e) => setProduct(e.products));
  }, []);
  return (
    <>
      <Header />

      <ProductList />
      <Footer />
      <BottomNav />
    </>
  );
};

export default Products;
