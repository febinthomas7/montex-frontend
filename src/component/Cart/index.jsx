import { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { useContext } from "react";
import { Store } from "../../Context";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Cart = () => {
  const {
    cartOpen,
    setCartOpen,
    updatedCart,
    setUpdatedCart,
    Remove,
    subtotal,
  } = useContext(Store);
  const [Loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/auth/create-checkout-session?userId=${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: updatedCart,
            total: subtotal,
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        setUpdatedCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        setLoading(false);
      }

      const result = stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.log("Checkout error:", result.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("scroll", "hide");
    } else {
      document.body.classList.remove("scroll", "hide");
    }

    return () => {
      document.body.classList.remove("scroll", "hide");
    };
  }, [cartOpen]);

  return (
    <>
      <div
        className="flex justify-center items-center gap-1  cursor-pointer"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <BsCart4 className="  text-gray-700 h-5 w-5 " />
        <span>{updatedCart?.length}</span>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed  z-40 left-0  top-0 h-svh ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } w-full bg-[#010305bf] transition-opacity duration-500 ease-in-out`}
        onClick={() => setCartOpen(!cartOpen)}
      >
        {/* Slide-in Panel */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 bottom-0 max-w-md  h-100vh h-dvh sm:h-svh transition-transform duration-500 ease-in-out right-0 z-50 flex ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          } pl-10`}
        >
          <div className="w-screen max-w-md transform transition duration-500 ease-in-out translate-x-0 bg-white shadow-xl">
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setCartOpen(!cartOpen)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {updatedCart?.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={product.title}
                              src={product.image}
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.id}>{product.title}</a>
                                </h3>
                                <p className="ml-4">${product.price}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty {product.quantity}
                              </p>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => Remove(product)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={checkout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    {Loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      onClick={() => setCartOpen(!cartOpen)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
