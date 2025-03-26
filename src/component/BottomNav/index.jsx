import React from "react";
import { CiHome } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdMovieFilter } from "react-icons/md";

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
    label: "reels",
  },
  {
    href: "#",
    icon: <FaRegUser className="w-6 h-6" />,
    label: "Profile",
  },
  // {
  //   href: "#",
  //   icon: <IoSettingsOutline className="w-6 h-6" />,
  //   label: "Settings",
  // },
];

const BottomNav = () => {
  return (
    <section className="fixed bottom-0 left-0 z-20 w-full bg-[#d4d4d4]  shadow-sm sm:hidden  drop-shadow-lg">
      <nav className="flex justify-around p-4">
        {navItems.map((e, index) => {
          return (
            <a
              href={e.href}
              key={index}
              className="flex flex-col gap-2 items-center text-gray-500 hover:text-[#4f46e5] "
            >
              <div className="relative flex justify-center items-center ">
                <span className="-top-8 p-2 absolute hover:outline outline-1 hover:outline-2 outline-offset-2 rounded-full bg-white drop-shadow-lg">
                  {e.icon}{" "}
                </span>
              </div>

              <span className="text-xs mt-1">{e.label}</span>
            </a>
          );
        })}
      </nav>
    </section>
  );
};

export default BottomNav;
