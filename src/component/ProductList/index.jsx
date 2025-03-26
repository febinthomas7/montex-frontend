import React, { useEffect, useState } from "react";
import Card from "../Card";
import RelatedProducts from "../RelatedProducts";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (currentPage - 1) * productsPerPage;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="p-4 bg-white shadow-md rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold">Category</label>
              <select
                // value={selectedCategory}
                // onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                {/* {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))} */}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-semibold">Brand</label>
              <select
                // value={selectedBrand}
                // onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                {/* {brands.map((brand, i) => (
                  <option key={i} value={brand}>
                    {brand}
                  </option>
                ))} */}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  // value={priceRange[0]}
                  // onChange={(e) =>
                  //   setPriceRange([parseInt(e.target.value), priceRange[1]])
                  // }
                  className="w-1/2 border rounded px-2 py-1"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  // value={priceRange[1]}
                  // onChange={(e) =>
                  //   // setPriceRange([priceRange[0], parseInt(e.target.value)])
                  // }
                  className="w-1/2 border rounded px-2 py-1"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        {products.length <= 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse border rounded-md p-4 bg-white shadow-sm"
              >
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product, index) => {
            return <Card product={product} key={index} />;
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: 3 }, (_, i) => {
            // Calculate the start page
            let startPage = Math.max(1, currentPage - 1);

            // Prevent overflow when near the end
            if (currentPage >= totalPages - 1) {
              startPage = Math.max(totalPages - 2, 1);
            }

            const page = startPage + i;

            return (
              page <= totalPages && (
                <button
                  key={page}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
