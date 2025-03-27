import { useState, useEffect } from "react";
import { useContext } from "react";
import { Store } from "../../Context";

import Cart from "../Cart";
import { Link, useLocation } from "react-router-dom";
const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Product",
  },
  {
    href: "/reels",
    label: "Reels",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];
const Header = () => {
  const { scrolled, setScrolled } = useContext(Store);

  const location = useLocation();

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
        scrolled ? "backdrop-blur-sm bg-[#fffefe] shadow-md" : ""
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
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={index}
                to={item.href}
                className={`text-sm font-semibold underline-offset-2 transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-600 underline"
                    : "text-gray-900 hover:text-indigo-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Cart />
      </nav>
    </header>
  );
};

export default Header;
