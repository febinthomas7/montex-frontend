import { useContext } from "react";
import { Store } from "../../Context";
import TabButtons from "../../component/TabButtons";
import ProfileTab from "../../component/ProfileTab";
import Orders from "../../component/Orders";
import OrderHistory from "../../component/OrderHistory";
import Header from "../../component/Header";
import BottomNav from "../../component/BottomNav";
import Footer from "../../component/Footer";
const Settings = () => {
  const { activeTab } = useContext(Store);

  return (
    <>
      {" "}
      <Header />
      <div className="max-w-6xl mx-auto my-16 sm:mt-16 sm:mb-0 p-4 md:p-6 space-y-8">
        {/* Tabs */}
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
