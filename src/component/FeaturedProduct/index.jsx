import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.products);
      });
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-100 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        ✨ Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
              <p className="text-yellow-500 mt-1">⭐ {product.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
