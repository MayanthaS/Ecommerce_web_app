import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import {
  ClerkDegraded,
  ClerkFailed,
  ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  UserButton,
} from "@clerk/react";
import { CgClose } from "react-icons/cg";
import { CLERK_ENABLED } from "../config/auth";
import { useCart } from "../context/useCart";

const AuthControls = () => {
  if (!CLERK_ENABLED) {
    return (
      <span className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-500">
        Sign in unavailable
      </span>
    );
  }

  return (
    <header>
      <ClerkLoading>
        <span className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-500">
          Loading auth...
        </span>
      </ClerkLoading>
      <ClerkFailed>
        <span className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700">
          Auth unavailable
        </span>
      </ClerkFailed>
      <ClerkDegraded>
        <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700">
          Auth degraded
        </span>
      </ClerkDegraded>
      <ClerkLoaded>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              type="button"
              className="bg-blue-700 px-3 py-1 rounded-md cursor-pointer text-white hover:bg-blue-600"
            >
              Sign in
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </ClerkLoaded>
    </header>
  );
};

const Navbar = () => {
  const { cartItem } = useCart();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const locationMenuRef = useRef(null);

  const detectLocation = () => {
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
          const districtName =
            address.city_district ||
            address.suburb ||
            address.state_district ||
            address.county ||
            address.district ||
            "";

          if (!cityName) {
            setLocationStatus("error");
            setLocationError("City not found");
            return;
          }

          setCity(cityName);
          setDistrict(districtName);
          setLocationStatus("success");
        } catch {
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
  };

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationMenuRef.current &&
        !locationMenuRef.current.contains(event.target)
      ) {
        setIsLocationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const locationLabel = (() => {
    if (locationStatus === "loading") return "Detecting...";
    if (locationStatus === "success") {
      if (district && district !== city) return `${city}, ${district}`;
      return city;
    }
    if (locationStatus === "denied") return "Location blocked";
    if (locationStatus === "error") return "Location unavailable";
    return "Add Location";
  })();
  const cartCount = cartItem.reduce((total, item) => total + item.quantity, 0);

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
          <div className="relative" ref={locationMenuRef}>
            <button
              type="button"
              className="flex gap-2 text-gray-800 items-center"
              onClick={() => setIsLocationMenuOpen((open) => !open)}
              aria-expanded={isLocationMenuOpen}
              aria-haspopup="true"
            >
              <MapPin className="text-blue-700" />
              <div
                className="font-semibold leading-tight"
                title={locationError}
              >
                {locationStatus === "success" &&
                district &&
                district !== city ? (
                  <>
                    <div>{city}</div>
                    <div className="text-xs text-gray-600">{district}</div>
                  </>
                ) : (
                  locationLabel
                )}
              </div>
              <FaCaretDown
                className={`transition-transform ${isLocationMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isLocationMenuOpen ? (
              <div className="absolute left-0 top-10 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Change Location
                    </p>
                    <p className="text-xs text-gray-500">
                      We use your device to detect your city.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setIsLocationMenuOpen(false)}
                    aria-label="Close location menu"
                  >
                    <CgClose />
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={detectLocation}
                  disabled={locationStatus === "loading"}
                >
                  {locationStatus === "loading"
                    ? "Detecting..."
                    : "Detect my location"}
                </button>
                {locationError ? (
                  <p className="mt-2 text-xs text-red-600">{locationError}</p>
                ) : null}
              </div>
            ) : null}
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
              {cartCount}
            </span>
          </Link>
          <div>
            <AuthControls />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
