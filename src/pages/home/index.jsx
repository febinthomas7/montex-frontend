import React from "react";
import Overview from "../../component/Overview";
import ProductList from "../../component/ProductList";
import PageNotFound from "../../component/PageNotFound";
import Hero from "../../component/Hero";
import Header from "../../component/Header";
import BottomNav from "../../component/BottomNav";
import FeaturedProducts from "../../component/FeaturedProduct";
import Footer from "../../component/Footer";
import Newsletter from "../../component/Newsletter";
import NewArrivals from "../../component/NewArrivals";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts />
      {/* <ProductList /> */}
      <NewArrivals />
      <Newsletter />

      <BottomNav />
      <Footer />
    </>
  );
};

export default Home;
