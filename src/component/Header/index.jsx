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
  const location = useLocation();
  const { user, setUser, scrolled, setScrolled } = useContext(Store);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Change value to your preference
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUser({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      address: localStorage.getItem("address"),
      joinDate: localStorage.getItem("joinDate"),
      avatar: localStorage.getItem("avatar"),
      preview: "",
      userId: localStorage.getItem("userId"),
    });
  }, []);

  return (
    <header
      className={`fixed w-full flex top-0 right-0 transition-colors duration-300 ease-in-out z-30 ${
        scrolled ? "backdrop-blur-sm bg-[#fffefe] shadow-md" : ""
      }  justify-between items-center rounded-b-xl`}
    >
      <nav
        aria-label="Global"
        className="flex justify-between items-center w-full  p-6 lg:px-8"
      >
        <div className=" ">
          <Link to="/" className=" ">
            {/* <span className="sr-only">Your Company</span> */}
            <img alt="" src="/logo1.png" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex md:gap-x-12">
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
        <div className="flex  gap-4">
          <Cart />
          <div className="relative h-10 w-10 rounded-full border-2 border-white shadow-lg overflow-hidden">
            <Link to="/settings">
              <img
                src={user.avatar || "../user.png"}
                alt={user.name}
                className="object-cover h-full w-full"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
