import axios from "axios";
import { useCallback, useState } from "react";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=150",
      );
      console.log(response);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};
