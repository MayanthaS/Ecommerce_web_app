import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Footer from "./Components/Footer";

const App = () => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          /*console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude); */

          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              /*console.log("Address:", data.address);*/
              const address = data.address;
              const exactAddress = `${address.road || ""} ${address.house_number || ""}, ${address.city || ""}, ${address.state || ""}, ${address.country || ""}`;
              /*console.log("Exact Address:", exactAddress);*/
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };

  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <BrowserRouter>
      <Navbar location={location} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
