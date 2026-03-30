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
              className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e  ]-z-10 "
            >
              <div className="flex gap-10 justify-center h-96 items-center px-4">
                <div className="space-y-6">
                  <h3>abacd</h3>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <h3>1</h3>
        </div>
      </SlickSlider>
    </div>
  );
};

export default Carousel;
