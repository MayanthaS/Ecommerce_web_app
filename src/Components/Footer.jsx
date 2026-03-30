import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        {/*  info */}
        <div className="mb-6 md:mb-0">
          <Link to="/">
            {/* <img src={Logo} alt="" className='w-32'/> */}
            <h1>
              <span className="text-blue-500 text-2xl font-bold">My</span>Shop
            </h1>
          </Link>
          <p className="mt-2 text-sm">
            Powering Your World with the Best in Items.
          </p>
          <p className="mt-2 text-sm">123 Udahamulla,Nugegoda, Sri Lanka</p>
          <p className="text-sm">Email: support@MyShop.com</p>
          <p className="text-sm">Phone: (+94)76 456-7890</p>
        </div>
        {/* customer service link */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* social media links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook />
            <FaInstagram />
            <FaX />
            <FaTiktok />
          </div>
        </div>
        {/* newsletter subscription */}
        <div>
          <h3 className="text-xl font-semibold">Get the Latest Updates</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* bottom section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-blue-500">My</span>Shop. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
