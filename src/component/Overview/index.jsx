import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts";
import BottomNav from "../BottomNav";
import { useContext } from "react";
import { Store } from "../../Context";
const Overview = () => {
  const { id } = useParams(); // Gets the product ID from the route
  const [productDetails, setProductDetails] = useState(null);
  const { setUpdatedCart, updatedCart } = useContext(Store);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productDetails?.minimumOrderQuantity) {
      setQuantity(
        productDetails?.minimumOrderQuantity +
          1 -
          productDetails?.minimumOrderQuantity
      );
    }
  }, [productDetails]);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductDetails(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0]);
          }
        });
    }
  }, [id]);
  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  if (!productDetails) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-24">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          {/* Left: Image Section */}
          <div className="flex-1">
            <div className="h-96 bg-gray-200 rounded w-full mb-4" />
            <div className="flex gap-2">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded" />
                ))}
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-100 w-full rounded" />
            <div className="h-4 bg-gray-100 w-2/3 rounded" />
            <div className="h-5 bg-gray-300 w-1/3 rounded" />

            <div className="h-5 bg-gray-300 w-2/4 rounded" />
            <div className="h-4 bg-gray-100 w-1/2 rounded" />
            <div className="h-4 bg-gray-100 w-1/4 rounded" />
            <div className="h-4 bg-gray-100 w-2/5 rounded" />

            <div className="h-3 bg-gray-100 w-1/3 rounded" />
            <div className="h-3 bg-gray-100 w-1/2 rounded" />
            <div className="h-3 bg-gray-100 w-1/4 rounded" />

            <div className="flex gap-2 mt-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-gray-200 rounded-full w-20 h-6"
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-10 space-y-4">
          <div className="h-5 bg-gray-300 w-1/3 rounded" />
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border bg-gray-50 p-4 rounded-md space-y-2 animate-pulse"
              >
                <div className="h-4 bg-gray-200 w-1/4 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 rounded" />
                <div className="h-3 bg-gray-100 w-3/4 rounded" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // const handleAddToCart = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const existingIndex = cart.findIndex(
  //     (item) => item.id === productDetails.id
  //   );

  //   if (existingIndex !== -1) {
  //     // Update quantity if product already exists
  //     cart[existingIndex].quantity += quantity;
  //     productToAdd = cart[existingIndex];
  //   } else {
  //     // Add new product
  //     const productToAdd = {
  //       id: productDetails.id,
  //       title: productDetails.title,
  //       price: productDetails.price,
  //       image: mainImage,
  //       quantity: quantity,
  //     };
  //     setUpdatedCart(...updatedCart, productToAdd);
  //     cart.push(productToAdd);
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   alert(`${quantity} item(s) added to cart!`);
  // };

  const handleAddToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.id === productDetails.id
    );

    let productToAdd;

    if (existingIndex !== -1) {
      // Update quantity if product already exists
      cart[existingIndex].quantity += quantity;
      productToAdd = cart[existingIndex];
    } else {
      // Add new product
      productToAdd = {
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        image: mainImage,
        quantity: quantity,
      };
      cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} item(s) added to cart!`);

    // 🔄 Send to backend (MongoDB)
    try {
      const response = await fetch("https://your-backend-url.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include Authorization token if needed
        },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) throw new Error("Failed to save cart item to database");

      const result = await response.json();
      console.log("Saved to DB:", result);
    } catch (error) {
      console.error("Error saving to DB:", error.message);
    }
  };

  return (
    <>
      <div className="pt-24">
        <div className="max-w-5xl mx-auto p-6 bg-white sm:shadow--md rounded-xl">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Images */}
            <div className="flex-1">
              <div className="overflow-hidden rounded-lg border group">
                <img
                  src={mainImage}
                  alt={productDetails?.title}
                  className="w-full h-60 sm:h-96 object-contain transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="flex mt-4 gap-2">
                {productDetails?.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className={`w-20 h-20 object-cover border cursor-pointer rounded ${
                      mainImage === img ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{productDetails?.title}</h2>
              <p className="text-gray-700">{productDetails?.description}</p>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">
                  {getStars(productDetails?.rating)}
                </span>
                <span className="text-sm text-gray-600">
                  ({productDetails?.rating.toFixed(1)})
                </span>
              </div>

              <p className="text-xl font-semibold text-green-700">
                ${productDetails?.price.toFixed(2)}{" "}
                <span className="text-sm text-red-500 line-through">
                  $
                  {(
                    productDetails?.price /
                    (1 - productDetails?.discountPercentage / 100)
                  ).toFixed(2)}
                </span>{" "}
                <span className="text-sm text-green-500">
                  ({productDetails?.discountPercentage}% off)
                </span>
              </p>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-600">Quantity:</span>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-md font-semibold">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev < productDetails?.minimumOrderQuantity
                        ? prev + 1
                        : prev
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>

              {/* <p className="text-gray-600">Stock: {productDetails?.stock}</p> */}
              <p className="text-gray-600">Brand: {productDetails?.brand}</p>
              <p className="text-gray-600">
                Category: {productDetails?.category}
              </p>
              <p className="text-gray-600">
                Availability: {productDetails?.availabilityStatus}
              </p>

              <p className="text-sm text-gray-500">
                Warranty: {productDetails?.warrantyInformation}
              </p>
              <p className="text-sm text-gray-500">
                {productDetails?.shippingInformation}
              </p>
              <p className="text-sm text-gray-500">
                Return Policy: {productDetails?.returnPolicy}
              </p>

              <div className="text-sm text-gray-500">
                <p>
                  Dimensions: {productDetails?.dimensions.width} x{" "}
                  {productDetails?.dimensions.height} x{" "}
                  {productDetails?.dimensions.depth} cm
                </p>
                <p>Weight: {productDetails?.weight}g</p>
              </div>

              <div className="flex gap-2 mt-2">
                {productDetails?.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {productDetails?.reviews?.map((review, i) => (
                <div key={i} className="p-4 border rounded-md bg-gray-50">
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-yellow-500">{getStars(review.rating)}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productDetails?.category}
        currentProductId={productDetails?.id}
      />

      <BottomNav />
    </>
  );
};

export default Overview;
