const Pagination = ({ pageHandler, page, dynamicPage }) => {
  if (dynamicPage <= 1) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: dynamicPage }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => pageHandler(pageNumber)}
            className={`h-10 w-10 rounded-lg border text-sm font-semibold transition ${
              page === pageNumber
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {pageNumber}
          </button>
        ),
      )}
    </div>
  );
};

export default Pagination;
