import React, { useEffect, useMemo, useState } from "react";
import FilterSection from "../Components/FilterSection";
import MobileFilter from "../Components/MobileFilter";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";
import Loading from "../assets/Loading4.webm";
import { useData } from "../context/useData";

const getProductBrand = (product) => {
  if (product.brand) return product.brand;
  if (!product.title) return "Unknown";

  return product.title.split(/[\s-]+/)[0];
};

export const Product = () => {
  const { data, fetchAllProducts, isLoading, error } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, [fetchAllProducts]);

  const categories = useMemo(() => {
    const productCategories = data
      ?.map((item) => item.category)
      .filter(Boolean);

    return ["All", ...new Set(productCategories)];
  }, [data]);

  const brands = useMemo(() => {
    const productBrands = data?.map((item) => getProductBrand(item));

    return ["All", ...new Set(productBrands)];
  }, [data]);

  const maxPrice = useMemo(() => {
    return Math.ceil(
      Math.max(...data.map((item) => Number(item.price) || 0), 5000),
    );
  }, [data]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return data?.filter((item) => {
      const productBrand = getProductBrand(item);

      return (
        item.title?.toLowerCase().includes(normalizedSearch) &&
        (category === "All" || item.category === category) &&
        (brand === "All" || productBrand === brand) &&
        Number(item.price) >= priceRange[0] &&
        Number(item.price) <= priceRange[1]
      );
    });
  }, [brand, category, data, priceRange, search]);

  const dynamicPage = Math.ceil((filteredData?.length || 0) / 8);
  const paginatedProducts = filteredData?.slice(page * 8 - 8, page * 8);
  const filterProps = {
    search,
    setSearch: handleSearchChange,
    brand,
    setBrand,
    brands,
    maxPrice,
    priceRange,
    setPriceRange: handlePriceRangeChange,
    category,
    setCategory,
    categories,
    handleCategoryChange,
    handleBrandChange,
    productCount: filteredData?.length || 0,
  };

  return (
    <div>
      <div className="mx-auto mb-10 max-w-6xl px-4 pt-4">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          {...filterProps}
        />

        {error ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        ) : null}

        {data?.length > 0 ? (
          <div className="flex gap-8">
            <FilterSection {...filterProps} />

            {filteredData?.length > 0 ? (
              <div className="flex flex-1 flex-col items-center">
                <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-7 lg:mt-10">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        brand: getProductBrand(product),
                      }}
                    />
                  ))}
                </div>
                <Pagination
                  pageHandler={pageHandler}
                  page={page}
                  dynamicPage={dynamicPage}
                />
              </div>
            ) : (
              <div className="mt-10 flex min-h-[420px] flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    No products found
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Try changing your search, category, brand, or price range.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <video
              muted
              autoPlay
              loop
              playsInline
              className="h-32 w-32 object-contain"
              aria-label="Loading products"
            >
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center text-center">
            <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">
                No items found
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try checking again later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
