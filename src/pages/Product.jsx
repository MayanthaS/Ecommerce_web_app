import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import FilterSection from "../Components/FilterSection";
import loadingVideo from "../assets/Loading4.webm";

const loadingVideoStyle = {
  filter:
    "brightness(0) saturate(100%) invert(15%) sepia(96%) saturate(3200%) hue-rotate(219deg) brightness(84%) contrast(112%)",
};

const Product = () => {
  const { data, fetchAllProducts, isLoading, error } = useContext(DataContext);

  useEffect(() => {
    if (!data?.length) {
      fetchAllProducts();
    }
  }, [data?.length, fetchAllProducts]);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {error ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm ">
            {error}
          </div>
        ) : null}
        {isLoading && !data?.length ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <video
              muted
              autoPlay
              loop
              playsInline
              className="items-center w-56 drop-shadow-[0_0_28px_rgba(30,64,175,0.45)] md:w-72"
              style={loadingVideoStyle}
            >
              <source src={loadingVideo} type="video/webm" />
            </video>
          </div>
        ) : null}
        {data?.length > 0 ? (
          <div className="grid min-h-[60vh] gap-8 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
            <div className="lg:self-start">
              <FilterSection />
            </div>
            <div className="flex items-center justify-center">
              <video
                muted
                autoPlay
                loop
                playsInline
                className="w-56 drop-shadow-[0_0_28px_rgba(30,64,175,0.45)] md:w-72"
                style={loadingVideoStyle}
              >
                <source src={loadingVideo} type="video/webm" />
              </video>
            </div>
            <div className="hidden lg:block" />
          </div>
        ) : !isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center text-center">
            No items Found
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
