import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Category = () => {
  const { data } = useContext(DataContext);

  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getUniqueCategories = (products, property) => {
    const newValue = products?.map((curElem) => {
      return curElem[property];
    });
    return [...new Set(newValue)];
  };
  const uniqueCategories = getUniqueCategories(data, "category");

  return (
    <div className="bg-[#140b63]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-5 md:gap-20 lg:gap-40">
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded cursor-pointer transition-colors duration-300"
          >
            {formatCategory(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
