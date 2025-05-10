import { useEffect, useState } from "react";

import { FaHistory, FaExclamationCircle, FaCreditCard } from "react-icons/fa";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // adjust if needed
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/orders?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrderHistory(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <FaHistory className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold">Order History</h2>
          </div>
          <p className="text-gray-500 mb-6">
            View your past orders and purchase history
          </p>

          {loading ? (
            <p>Loading order history...</p>
          ) : orderHistory?.length === 0 ? (
            <div className="text-center py-8">
              <FaExclamationCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No past orders found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory?.map((order, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-50 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">Order_{order._id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status == "paid" ? "Delivered" : "paid"
                          )}`}
                        >
                          {order.status == "paid" ? "Delivered" : "paid"}
                        </span>
                        <p className="font-medium">
                          ${order?.total?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    {order?.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-3 flex justify-between items-center">
                    <button className="text-sm text-gray-600 hover:text-indigo-600">
                      View Details
                    </button>
                    <button className="flex items-center gap-1 text-sm bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
                      <FaCreditCard className="h-4 w-4" />
                      Buy Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
