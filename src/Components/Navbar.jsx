import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white py-3 shadow-2xl px-4 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="">
          <Link to="/">
            <h1 className="font-bold text-4xl ">MyShop</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
