import React from "react";
import { useCart } from "../context/useCart";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <div className="mx-auto mb-5 mt-6 max-w-6xl px-4 md:mt-10 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="text-xl font-bold md:text-2xl">
            My Cart ({cartItem.length})
          </h1>
          <div>
            <div className="mt-6 md:mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mt-3 flex w-full flex-col gap-4 rounded-md bg-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 flex-none rounded-md object-cover"
                      />
                      <div className="min-w-0">
                        <h1 className="line-clamp-2 text-sm font-semibold sm:max-w-[260px] md:w-[300px] md:text-base">
                          {item.title}
                        </h1>
                        <p className="text-base font-semibold text-blue-500 md:text-lg">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-4 rounded-md bg-blue-500 p-2 text-lg font-bold text-white md:text-xl">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, "increase")}
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                      aria-label={`Remove ${item.title}`}
                    >
                      <FaRegTrashAlt className="text-blue-500 text-2xl cursor-pointer" />
                    </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-20">
              <div className="mt-4 space-y-2 rounded-md bg-gray-100 p-4 md:p-7">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded-md"
                    defaultValue={location?.county}
                  />
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full"
                      defaultValue={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode</label>
                    <input
                      type="text"
                      placeholder="Enter your postcode"
                      className="p-2 rounded-md w-full"
                      defaultValue={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      className="p-2 rounded-md w-full"
                      defaultValue={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your Number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                  Submit
                </button>
                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------OR-----------
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={getLocation}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="mt-4 h-max space-y-2 rounded-md border border-gray-100 bg-white p-4 shadow-xl md:p-7">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill details
                </h1>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>
                  <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>
                  <p className="text-blue-500 font-semibold">
                    <span className="text-gray-600 line-through">$25</span> FREE
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Handling Charge
                  </h1>
                  <p className="text-blue-500 font-semibold">$5</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg">Grand total</h1>
                  <p className="font-semibold text-lg">${totalPrice + 5}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                    Apply Promo Code
                  </h1>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full"
                    />
                    <button className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-black sm:py-1">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 text-center md:h-[600px]">
          <h1 className="text-3xl font-bold text-blue-500/80 md:text-5xl">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="" className="w-full max-w-[320px] md:max-w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 text-white px-3 py-2 rounded-md cursor-pointer "
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
