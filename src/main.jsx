import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { DataProvider } from "./context/DataProvider";
import { CLERK_ENABLED, CLERK_PUBLISHABLE_KEY } from "./config/auth";

if (!CLERK_ENABLED && import.meta.env.VITE_ENABLE_CLERK !== "false") {
  console.warn(
    "Clerk auth is disabled because VITE_CLERK_PUBLISHABLE_KEY is missing or Clerk was turned off.",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
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
    </DataProvider>
  </StrictMode>,
);
