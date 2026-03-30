import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  console.log("Carousel data:", data);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return <div>carousel hi</div>;
};

export default Carousel;
