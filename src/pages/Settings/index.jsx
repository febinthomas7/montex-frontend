import { useContext } from "react";
import { Store } from "../../Context";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import TabButtons from "../../component/TabButtons";
import ProfileTab from "../../component/ProfileTab";
import Orders from "../../component/Orders";
import OrderHistory from "../../component/OrderHistory";
import Header from "../../component/Header";
import BottomNav from "../../component/BottomNav";
import Footer from "../../component/Footer";
import { handleError, handleSuccess } from "../../utils";

import { useEffect } from "react";
const Settings = () => {
  const { isloggedin, setIsLoggedIn, activeTab, user } = useContext(Store);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  // Step 1: Detect success param and prepare toast trigger
  useEffect(() => {
    if (success === "true") {
      // Set a flag so toast can be shown after the URL is cleaned
      sessionStorage.setItem("showPaymentToast", "true");

      // Clean the URL
      const params = new URLSearchParams(location.search);
      params.delete("success");

      navigate(
        { pathname: location.pathname, search: params.toString() },
        { replace: true }
      );
    }
  }, [success, location, navigate]);

  // Step 2: After URL is replaced, show the toast based on the session flag
  useEffect(() => {
    const showToast = sessionStorage.getItem("showPaymentToast");
    if (showToast === "true") {
      handleSuccess("Payment success!");
      sessionStorage.removeItem("showPaymentToast");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <>
      {" "}
      <Header />
      <div className="max-w-6xl mx-auto my-16 sm:mt-16 sm:mb-0 p-4 md:p-6 space-y-8">
        <ToastContainer />
        {/* Tabs */}
        {!isloggedin && (
          <div className="text-center text-gray-600 border border-dashed sm:mt-20 mb-16 border-gray-300 p-6 rounded-md shadow-sm bg-gray-50">
            <p className="text-lg font-medium">You're not logged in.</p>
            <p className="mt-2 text-sm">
              Please log in to manage your profile and view your orders.
            </p>
            <a
              href="/login"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </a>
          </div>
        )}

        <div className="w-full">
          <TabButtons />

          {/* Profile Tab */}
          {activeTab === "profile" && <ProfileTab />}

          {/* Orders Tab */}
          {activeTab === "orders" && <Orders />}

          {/* History Tab */}
          {activeTab === "history" && <OrderHistory />}
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
};

export default Settings;
