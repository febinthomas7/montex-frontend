import { createContext, useState } from "react";
import { handleError, handleSuccess } from "./utils";
export const Store = createContext();
const Context = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isViewingStory, setIsViewingStory] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isloggedin, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [updatedCart, setUpdatedCart] = useState(cart);
  const Remove = async (item) => {
    const updatedProducts = updatedCart.filter(
      (product) => product.id !== item.id
    );

    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    setUpdatedCart(updatedProducts);
    handleSuccess("item removed");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/cart/${
          item.id
        }?userId=${localStorage.getItem("userId")}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete from DB");

      console.log("Deleted from DB:", await response.json());
    } catch (error) {
      console.error("Error deleting from DB:", error.message);
    }
  };

  const subtotal = updatedCart.reduce((total, product) => {
    const price = parseFloat(product.price);
    return total + price * product.quantity;
  }, 0);
  const [user, setUser] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone"),
    address: localStorage.getItem("address"),
    joinDate: localStorage.getItem("date"),
    avatar: localStorage.getItem("avatar"),
    preview: "",
    userId: localStorage.getItem("userId"),
  });

  return (
    <Store.Provider
      value={{
        scrolled,
        setScrolled,
        cartOpen,
        setCartOpen,
        isViewingStory,
        setIsViewingStory,
        activeTab,
        setActiveTab,
        user,
        setUser,
        updatedCart,
        setUpdatedCart,
        Remove,
        subtotal,
        isloggedin,
        setIsLoggedIn,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
