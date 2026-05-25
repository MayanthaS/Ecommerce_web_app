import { SlidersHorizontal, X } from "lucide-react";
import FilterSection from "./FilterSection";

const MobileFilter = ({ openFilter, setOpenFilter, ...filterProps }) => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Products
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Shop catalog</h1>
        </div>
        <button
          type="button"
          onClick={() => setOpenFilter(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
        >
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>

      {openFilter ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden">
          <div className="ml-auto h-full w-[min(22rem,90vw)] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpenFilter(false)}
                className="rounded-lg border border-slate-200 p-2 text-slate-700"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            <div className="[&_aside]:block [&_aside]:w-full [&_aside]:border-0 [&_aside]:p-0 [&_aside]:shadow-none">
              <FilterSection {...filterProps} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileFilter;
