import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Category = () => {
  const { data } = useContext(DataContext);

  const getUniqueCategories = (products, property) => {
    let newVAl = products?.map((curElem) => {
      return curElem[property];
    });
    return [...new Set(newVAl)];
  };
  const uniqueCategories = getUniqueCategories(data, "category");
  console.log(uniqueCategories);
  return <div></div>;
};

export default Category;
