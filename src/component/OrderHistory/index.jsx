import { useState } from "react";
import { FaHistory, FaCreditCard, FaExclamationCircle } from "react-icons/fa";

const OrderHistory = () => {
  const [orderHistory] = useState([
    {
      id: "ORD-6254",
      date: "April 21, 2024",
      items: [
        {
          name: "Medium Stuff Satchel",
          quantity: 2,
          price: "$32.00",
          image: "/placeholder.svg?height=50&width=50&text=Satchel",
        },
      ],
      total: "$64.00",
      status: "Delivered",
    },
    {
      id: "ORD-5187",
      date: "March 10, 2024",
      items: [
        {
          name: "Tote Backpack",
          quantity: 1,
          price: "$45.00",
          image: "/placeholder.svg?height=50&width=50&text=Backpack",
        },
        {
          name: "Water Bottle",
          quantity: 1,
          price: "$15.00",
          image: "/placeholder.svg?height=50&width=50&text=Bottle",
        },
      ],
      total: "$60.00",
      status: "Delivered",
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
            <FaHistory className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold">Order History</h2>
          </div>
          <p className="text-gray-500 mb-6">
            View your past orders and purchase history
          </p>

          {orderHistory.length === 0 ? (
            <div className="text-center py-8">
              <FaExclamationCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No past orders found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-50 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <p className="font-medium">{order.total}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    {order.items.map((item, idx) => (
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
                            Qty: {item.quantity} × {item.price}
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
