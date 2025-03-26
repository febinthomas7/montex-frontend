import React, { useState } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    // You can handle order logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg">
        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 pt-6">Payment</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          {/* Example product list */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Smartphone</span>
              <span>$499</span>
            </div>
            <div className="flex justify-between">
              <span>Wireless Headphones</span>
              <span>$99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$608</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
