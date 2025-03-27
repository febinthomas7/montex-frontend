import { useState } from "react";
import { FaUser, FaHistory, FaShoppingBag } from "react-icons/fa";
import { useContext } from "react";
import { Store } from "../../Context";
const TabButtons = () => {
  const { activeTab, setActiveTab, user } = useContext(Store);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      {/* <h1 className="text-xl sm:text-3xl font-bold mb-4 md:mb-0">
        Welcome ,{user.name}
      </h1> */}
      <div className="bg-gray-100 rounded-lg p-1 grid grid-cols-3 w-full md:w-auto">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "profile"
              ? "bg-white shadow-sm text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
        >
          <FaUser className="h-4 w-4 mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "orders"
              ? "bg-white shadow-sm text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
        >
          <FaShoppingBag className="h-4 w-4 mr-2" />
          Orders
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "history"
              ? "bg-white shadow-sm text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
        >
          <FaHistory className="h-4 w-4 mr-2" />
          History
        </button>
      </div>
    </div>
  );
};

export default TabButtons;
