const FilterSection = ({
  search,
  setSearch,
  brand,
  brands = ["All"],
  maxPrice = 5000,
  priceRange,
  setPriceRange,
  category,
  categories = ["All"],
  handleCategoryChange,
  handleBrandChange,
  productCount = 0,
}) => {
  return (
    <aside className="hidden h-fit w-72 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Filters
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          Refine products
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          {productCount} item{productCount === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="mt-5 space-y-6">
        <section>
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Search
          </label>
          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </section>

        <section>
          <label
            htmlFor="product-category"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Category
          </label>
          <select
            id="product-category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        <section>
          <label
            htmlFor="product-brand"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Brand
          </label>
          <select
            id="product-brand"
            value={brand}
            onChange={handleBrandChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">Price range</p>
            <span className="text-sm font-semibold text-blue-700">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="1"
            value={priceRange[1]}
            onChange={(event) =>
              setPriceRange([priceRange[0], Number(event.target.value)])
            }
            className="w-full accent-blue-700"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
            <span>$0</span>
            <span>${maxPrice}</span>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default FilterSection;
