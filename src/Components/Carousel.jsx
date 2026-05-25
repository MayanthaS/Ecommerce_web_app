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
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} !left-4 !z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-md transition hover:bg-white md:!flex lg:!left-10`}
        aria-label="Previous slide"
      >
        <AiOutlineArrowLeft className="h-5 w-5" />
      </button>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} !right-4 !z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-md transition hover:bg-white md:!flex lg:!right-10`}
        aria-label="Next slide"
      >
        <AiOutlineArrowRight className="h-5 w-5" />
      </button>
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
        <SlickSlider {...settings} className="overflow-hidden">
          {data.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                className="bg-linear-to-r from-[#12058d] to-[#24243e]"
              >
                <div className="mx-auto flex min-h-[520px] max-w-6xl flex-col-reverse items-center justify-center gap-6 px-4 py-8 text-center sm:min-h-[560px] md:h-96 md:min-h-0 md:flex-row md:gap-10 md:py-0 md:text-left">
                  <div className="max-w-xl space-y-4 md:space-y-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100 sm:text-sm">
                      Powering Your World With Best Items
                    </h3>
                    <h1 className="line-clamp-3 text-2xl font-bold text-white sm:text-3xl md:line-clamp-2 md:text-4xl">
                      {item.title}
                    </h1>
                    <p className="line-clamp-3 text-sm leading-6 text-gray-300 sm:text-base md:line-clamp-4">
                      {item.description}
                    </p>
                    <button className="mb-2 mt-2 rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-800">
                      Shop Now
                    </button>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-44 w-44 object-contain transition-all hover:scale-105 sm:h-56 sm:w-56 md:h-64 md:w-64"
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
