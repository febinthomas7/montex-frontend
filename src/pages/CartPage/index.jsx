import React from "react";

const CartPage = ({ cartItems = [], onRemoveItem }) => {
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="p-4 hh max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems?.length !== 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                // onClick={() => onRemoveItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-bold">Total: ₹{getTotal().toFixed(2)}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
