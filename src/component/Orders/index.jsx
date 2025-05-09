import { useEffect, useState } from "react";
import { FaBox, FaShoppingBag, FaTruck, FaChevronRight } from "react-icons/fa";

const Orders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // adjust if needed
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/orders?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setCurrentOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <FaBox className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold">Current Orders</h2>
          </div>
          <p className="text-gray-500 mb-6">
            Track and manage your active orders
          </p>

          {loading ? (
            <p>Loading orders...</p>
          ) : currentOrders.length === 0 ? (
            <div className="text-center py-8">
              <FaShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">You have no active orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentOrders?.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md"
                >
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Order_{order._id}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center gap-4 border-t pt-4 mt-4"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="mt-1 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-4">
                            <p className="text-sm">Qty: {item.quantity}</p>
                            <p className="font-medium">${item.price}</p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <FaTruck className="h-4 w-4 text-gray-500 mr-1" />
                            <p className="text-sm text-gray-500">
                              Est. delivery:{" "}
                              {new Date(
                                order.estimatedDelivery || new Date()
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="flex-shrink-0 text-gray-400 hover:text-indigo-600 p-2">
                        <FaChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
