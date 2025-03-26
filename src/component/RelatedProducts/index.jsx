import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";

const RelatedProducts = ({ category, currentProductId }) => {
  const [related, setRelated] = useState([]);
  console.log(category, currentProductId);

  useEffect(() => {
    if (category) {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.products.filter(
            (p) => p.id !== parseInt(currentProductId)
          );
          setRelated(filtered.slice(0, 4)); // Limit to 4 related items
        });
    }
  }, [category, currentProductId]);

  if (!related.length) return null;

  return (
    <div className="p-6 pb-24 sm:p-6">
      <h3 className="text-xl font-bold mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
