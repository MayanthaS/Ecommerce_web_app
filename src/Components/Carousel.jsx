import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Key } from "lucide-react";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  console.log("Carousel data:", data);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const SlickSlider = Slider?.default ?? Slider;

  return (
    <div>
      <SlickSlider {...settings}>
        {data?.slice(0, 5)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-linear-to-r from-[#140b66] via-[#2c2769] to-[#24243e  ]-z-10 "
            >
              <div className="flex gap-10 justify-center h-96 items-center px-4">
                <div className="space-y-6">
                  <h3 className="text-white font-semibold font-sans text-sm ">
                    Powering Your World With Best Items{" "}
                  </h3>
                  <h1 className="text-4xl font-bold  text-blue-700 line-clamp-2 w-[500px] ">
                    {item.title}
                  </h1>
                  <p className="text-gray-300 md:w-[500px] pr-2">
                    {item.description}
                  </p>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-2 mt-2">
                    Shop Now
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-64 h-64 object-contain hover:scale-105 transition-all  shadow-gray-600 "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default Carousel;
