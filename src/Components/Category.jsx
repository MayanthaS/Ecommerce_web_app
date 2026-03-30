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
  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex gap-10 items-center justify-center py-7 px-4 ">
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
