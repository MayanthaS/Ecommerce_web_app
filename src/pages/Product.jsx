import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import FilterSection from "../Components/FilterSection";
import loadingVideo from "../assets/Loading4.webm";

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
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        ) : null}
        {isLoading && !data?.length ? (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop playsInline>
              <source src={loadingVideo} type="video/webm" />
            </video>
          </div>
        ) : null}
        {data?.length > 0 ? (
          <div className="flex gap-8 ">
            <FilterSection />
            <div className="flex items-center justify-center h-[400px]">
              <video muted autoPlay loop playsInline>
                <source src={loadingVideo} type="video/webm" />
              </video>
            </div>
          </div>
        ) : !isLoading ? (
          <div>No items Found</div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
