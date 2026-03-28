import { MapPin } from "lucide-react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const location = null; // Replace with actual location logic
  return (
    <div className="bg-white py-3 shadow-2xl px-4 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="font-bold text-4xl ">
              <span className="text-blue-700">My</span>Shop
            </h1>
          </Link>
          <div className="flex gap-2 text-gray-800 items-center">
            <MapPin className="text-blue-700" />
            <span className="font-semibold">
              {location ? <div></div> : "Add Location"}
            </span>
            <FaCaretDown />
          </div>
        </div>
        {/* Menu Section */}
        <nav>
          <ul className="flex gap-7 items-center text-xl font-semibold cursor-pointer">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 transition-all border-blue-700" : "text-blue-800"} cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 transition-all border-blue-700" : "text-blue-800"} cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 transition-all border-blue-700" : "text-blue-800"} cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive ? "border-b-2 transition-all border-blue-700" : "text-blue-800"} cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
