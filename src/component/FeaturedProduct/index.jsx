import React, { useEffect, useState } from "react";
import Card from "../Card";

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
    <div className="px-6 py-10  font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        ✨ Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured?.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
