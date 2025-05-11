import Masonry from "../../component/Masonry";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import BottomNav from "../../component/BottomNav";
import { ToastContainer } from "react-toastify";

const ReelsPage = () => {
  return (
    <>
      <ToastContainer />

      <Header />
      <Masonry />
      <Footer />
      <BottomNav />
    </>
  );
};

export default ReelsPage;
