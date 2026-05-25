import axios from "axios";
import { useCallback, useState } from "react";
import { DataContext } from "./DataContext";
import fallbackProducts from "../data/fallbackProducts";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      // Use the proxy endpoint
      const response = await axios.get("/api/products?limit=150", {
        timeout: 8000,
      });

      setData(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to reach the live catalog. Showing fallback products.");
      setData(fallbackProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, isLoading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};
