import { createContext, useState } from "react";

export const Store = createContext();
const Context = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isViewingStory, setIsViewingStory] = useState(false);

  return (
    <Store.Provider
      value={{
        scrolled,
        setScrolled,
        cartOpen,
        setCartOpen,
        isViewingStory,
        setIsViewingStory,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Context;
