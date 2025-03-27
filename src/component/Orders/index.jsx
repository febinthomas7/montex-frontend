import { useState } from "react";

import { FaBox, FaShoppingBag, FaChevronRight, FaTruck } from "react-icons/fa";

const Orders = () => {
  const [currentOrders] = useState([
    {
      id: "ORD-7829",
      name: "Throwback Hip Bag",
      image: "/placeholder.svg?height=80&width=80&text=Hip+Bag",
      quantity: 1,
      price: "$90.00",
      status: "Processing",
      estimatedDelivery: "May 15, 2024",
    },
    {
      id: "ORD-7830",
      name: "Artwork Tee",
      image: "/placeholder.svg?height=80&width=80&text=Tee",
      quantity: 2,
      price: "$45.00",
      status: "Shipped",
      estimatedDelivery: "May 12, 2024",
    },
  ]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
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
            <FaBox className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold">Current Orders</h2>
          </div>
          <p className="text-gray-500 mb-6">
            Track and manage your active orders
          </p>

          {currentOrders.length === 0 ? (
            <div className="text-center py-8">
              <FaShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">You have no active orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{order.name}</h3>
                          <p className="text-sm text-gray-500">
                            Order #{order.id}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <p className="text-sm">Qty: {order.quantity}</p>
                          <p className="font-medium">{order.price}</p>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          <FaTruck className="h-4 w-4 text-gray-500 mr-1" />
                          <p className="text-sm text-gray-500">
                            Est. delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="flex-shrink-0 text-gray-400 hover:text-indigo-600 p-2">
                      <FaChevronRight className="h-5 w-5" />
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

export default Orders;
