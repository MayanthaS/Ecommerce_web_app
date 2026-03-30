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
    <div className="bg-[#04215a]">
      <div className="max-w-8xl mx-auto flex gap-40 items-center justify-center py-5 px-6 ">
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
