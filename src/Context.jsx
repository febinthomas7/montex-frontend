import { createContext, useState } from "react";

export const Store = createContext();
const Context = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isViewingStory, setIsViewingStory] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "Febin Thomas",
    email: "Feb@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94321",
    joinDate: "January 2023",
    avatar: "",
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
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
