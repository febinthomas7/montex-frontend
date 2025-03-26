import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <Link
      to={`/product/${product?.id}`}
      key={product.id}
      className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-green-600 font-bold mt-2">${product.price}</p>
        <p className="text-yellow-500 text-sm mt-1">⭐ {product.rating}</p>
      </div>
    </Link>
  );
};

export default Card;
