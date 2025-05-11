import ProductList from "../../component/ProductList";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import BottomNav from "../../component/BottomNav";
import { ToastContainer } from "react-toastify";

const Products = () => {
  return (
    <>
      <ToastContainer />
      <Header />

      <ProductList />
      <Footer />
      <BottomNav />
    </>
  );
};

export default Products;
