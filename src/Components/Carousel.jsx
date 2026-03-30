import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
  const { data, fetchAllProducts, isLoading, error } = useContext(DataContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50%",
            background: "lightgray",
            color: "black",
            position: "absolute",
            padding: "10px",
            left: "60px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "gray";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "lightgray";
          }}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50%",
            background: "lightgray",
            color: "black",
            position: "absolute",
            padding: "10px",
            right: "60px",
          }}
        />
      </div>
    );
  };
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  const SlickSlider = Slider?.default ?? Slider;

  return (
    <div>
      {error ? (
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        </div>
      ) : null}
      {isLoading && !data?.length ? (
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-gray-600">
          Loading products...
        </div>
      ) : null}
      {data?.length > 0 ? (
        <SlickSlider {...settings}>
          {data.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                className="bg-linear-to-r from-[#12058d] to-[#24243e]-z-10 "
              >
                <div className="flex gap-10 justify-center h-96 items-center px-4">
                  <div className="space-y-6">
                    <h3 className="text-white font-semibold font-sans text-sm ">
                      Powering Your World With Best Items{" "}
                    </h3>
                    <h1 className="text-4xl font-bold  text-white line-clamp-2 w-[500px] ">
                      {item.title}
                    </h1>
                    <p className="text-gray-300 md:w-[500px] pr-2">
                      {item.description}
                    </p>
                    <button className="bg-blue-700 hover:bg-blue-800 text-uppercase text-white font-bold py-2 px-4 rounded mb-2 mt-2">
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
      ) : null}
      {data?.length > 0 ? <Category /> : null}
    </div>
  );
};

export default Carousel;
