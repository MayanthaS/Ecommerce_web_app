import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Show, SignInButton, UserButton } from "@clerk/react";

const Navbar = () => {
  const [city, setCity] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Geolocation not supported");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "Accept-Language": "en",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Reverse geocoding failed");
          }

          const data = await response.json();
          const address = data.address || {};
          const cityName =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            address.state ||
            "";

          if (!cityName) {
            setLocationStatus("error");
            setLocationError("City not found");
            return;
          }

          setCity(cityName);
          setLocationStatus("success");
        } catch (error) {
          setLocationStatus("error");
          setLocationError("Unable to fetch city");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("denied");
          setLocationError("Location blocked");
          return;
        }

        setLocationStatus("error");
        setLocationError("Location unavailable");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000,
      },
    );
  }, []);

  const locationLabel = (() => {
    if (locationStatus === "loading") return "Detecting...";
    if (locationStatus === "success") return city;
    if (locationStatus === "denied") return "Location blocked";
    if (locationStatus === "error") return "Location unavailable";
    return "Add Location";
  })();

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
            <span className="font-semibold" title={locationError}>
              {locationLabel}
            </span>
            <FaCaretDown />
          </div>
        </div>
        {/* Menu Section */}
        <nav className="flex gap-6 items-center">
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
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-blue-700 px-2 rounded-full absolute -top-3 -right-3 text-white">
              0
            </span>
          </Link>
          <div>
            <header>
              <Show when="signed-out">
                <SignInButton className="bg-blue-700 text-white hover:bg-blue-600 px-3 py-1 rounded-md cursor-pointer" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </header>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
