import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataProvider";
import { CLERK_ENABLED, CLERK_PUBLISHABLE_KEY } from "./config/auth";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";

if (!CLERK_ENABLED && import.meta.env.VITE_ENABLE_CLERK !== "false") {
  console.warn(
    "Clerk auth is disabled because VITE_CLERK_PUBLISHABLE_KEY is missing or Clerk was turned off.",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        {CLERK_ENABLED ? (
          <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl="/"
          >
            <App />
          </ClerkProvider>
        ) : (
          <App />
        )}
        <ScrollToTop
          color="white"
          smooth
          style={{
            backgroundColor: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </CartProvider>
    </DataProvider>
  </StrictMode>,
);
