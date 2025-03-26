import { useState, useEffect } from "react";
import { useContext } from "react";
import { Store } from "../../Context";

import Cart from "../Cart";
import { Link } from "react-router-dom";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/products" },
  { name: "Reels", href: "/Reels" },

  { name: "Company", href: "#" },
];
const Header = () => {
  const { scrolled, setScrolled } = useContext(Store);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Change value to your preference
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full flex top-0 right-0 transition-colors duration-300 ease-in-out z-20 ${
        scrolled ? "backdrop-blur-sm bg-[#ececec86] shadow-md" : ""
      }  justify-between items-center rounded-b-xl`}
    >
      <nav
        aria-label="Global"
        className="flex justify-between items-center w-full  p-6 lg:px-8"
      >
        <div className=" ">
          <a href="/" className=" ">
            {/* <span className="sr-only">Your Company</span> */}
            <img alt="" src="/logo1.png" className="h-8 w-auto" />
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Cart />
      </nav>
    </header>
  );
};

export default Header;
