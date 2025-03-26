import React, { useEffect, useState } from "react";
import Card from "../Card";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    // Assuming latest products are towards the end of the list
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const latest = data.products.slice(-8); // get last 8 products
        setNewProducts(latest.reverse()); // show newest first
      });
  }, []);

  return (
    <div className="px-6 py-10 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        🆕 New Arrivals
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts?.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
