import React from "react";
import { CiHome } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    href: "/",
    icon: <CiHome className="w-6 h-6" />,
    label: "Home",
  },
  {
    href: "/products",
    icon: <AiOutlineProduct className="w-6 h-6" />,
    label: "Product",
  },
  {
    href: "/reels",
    icon: <MdMovieFilter className="w-6 h-6" />,
    label: "Reels",
  },
  {
    href: "/settings",
    icon: <IoSettingsOutline className="w-6 h-6" />,
    label: "Settings",
  },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <section className="fixed bottom-0 left-0 z-20 w-full bg-white shadow-sm sm:hidden drop-shadow-lg">
      <nav className="flex justify-around p-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              to={item.href}
              key={index}
              className={`flex flex-col gap-2 items-center ${
                isActive ? "text-indigo-600 font-semibold" : "text-gray-500"
              }`}
            >
              <div className="relative flex justify-center items-center">
                <span
                  className={`-top-8 p-2 absolute rounded-full bg-white drop-shadow-lg ${
                    isActive ? "outline outline-2 outline-indigo-600" : ""
                  }`}
                >
                  {item.icon}
                </span>
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default BottomNav;
