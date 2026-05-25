const ProductCard = ({ product }) => {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-50 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
          {product.brand || product.category}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-slate-900 md:text-base">
          {product.title}
        </h3>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-slate-950 md:text-lg">
            ${product.price}
          </span>
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 md:px-4 md:text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
