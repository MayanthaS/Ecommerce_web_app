const FilterSection = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  maxPrice,
  selectedMaxPrice,
  onMaxPriceChange,
  productCount,
  onReset,
}) => {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Filters
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Refine products
            </h2>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            Reset
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          {productCount} item{productCount === 1 ? "" : "s"} match your filters.
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
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by product title"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </section>

        <section>
          <p className="mb-3 text-sm font-semibold text-slate-800">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                    isActive
                      ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">Max price</p>
            <span className="text-sm font-semibold text-blue-700">
              ${selectedMaxPrice}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="1"
            value={selectedMaxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className="w-full accent-blue-700"
          />
        </section>

        <section>
          <label
            htmlFor="product-sort"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Sort by
          </label>
          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </section>
      </div>
    </aside>
  );
};

export default FilterSection;
