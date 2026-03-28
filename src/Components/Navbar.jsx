import { MapPin } from "lucide-react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
