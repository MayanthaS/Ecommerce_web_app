import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import FilterSection from "../Components/FilterSection";
import loadingVideo from "../assets/Loading4.webm";

const loadingVideoStyle = {
  filter:
    "brightness(0) saturate(100%) invert(15%) sepia(96%) saturate(3200%) hue-rotate(219deg) brightness(84%) contrast(112%)",
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
};

const Product = () => {
  const { data, fetchAllProducts, isLoading, error } = useContext(DataContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);

  useEffect(() => {
    if (!data?.length) {
      fetchAllProducts();
    }
  }, [data?.length, fetchAllProducts]);

  const maxPrice = Math.max(...data.map((item) => Number(item.price) || 0), 0);

  useEffect(() => {
    if (!data?.length) {
      return;
    }

    setSelectedMaxPrice(maxPrice);
  }, [data?.length, maxPrice]);

  const categories = ["all", ...new Set(data.map((item) => item.category))];

  const filteredProducts = data
    .filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesPrice = (Number(item.price) || 0) <= selectedMaxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((leftItem, rightItem) => {
      if (sortBy === "price-low") {
        return (Number(leftItem.price) || 0) - (Number(rightItem.price) || 0);
      }

      if (sortBy === "price-high") {
        return (Number(rightItem.price) || 0) - (Number(leftItem.price) || 0);
      }

      if (sortBy === "name-asc") {
        return leftItem.title.localeCompare(rightItem.title);
      }

      if (sortBy === "name-desc") {
        return rightItem.title.localeCompare(leftItem.title);
      }

      return 0;
    });

  const resetFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSortBy("featured");
    setSelectedMaxPrice(maxPrice);
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {error ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </div>
        ) : null}
        {isLoading && !data?.length ? (
          <div className="flex min-h-[65vh] items-center justify-center rounded-3xl bg-white shadow-sm">
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
          <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FilterSection
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                maxPrice={maxPrice}
                selectedMaxPrice={selectedMaxPrice}
                onMaxPriceChange={setSelectedMaxPrice}
                productCount={filteredProducts.length}
                onReset={resetFilters}
              />
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                      Product catalog
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                      Explore every category in one place
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                      Browse curated picks, compare prices, and narrow the list
                      with live filters without leaving the page.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                    Showing{" "}
                    <span className="font-bold text-slate-900">
                      {filteredProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-900">
                      {data.length}
                    </span>{" "}
                    products
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((item) => {
                    return (
                      <article
                        key={item.id}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="flex h-64 items-center justify-center bg-slate-50 p-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="space-y-4 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                              {item.category}
                            </span>
                            <span className="text-lg font-bold text-slate-900">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          <div>
                            <h2 className="line-clamp-2 text-lg font-bold text-slate-900">
                              {item.title}
                            </h2>
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="w-full rounded-2xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Add to cart
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
                  <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-40 drop-shadow-[0_0_28px_rgba(30,64,175,0.45)]"
                    style={loadingVideoStyle}
                  >
                    <source src={loadingVideo} type="video/webm" />
                  </video>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    No matching products
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Try changing the category, search text, or price range to
                    bring products back into the list.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : !isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white text-center shadow-sm">
            No items Found
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
