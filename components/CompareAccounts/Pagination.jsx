import Link from "next/link";

import useFilters from "./useFilters";

const Pagination = ({ pagination }) => {
  const filters = useFilters();

  const generateSearchForPage = (page) => {
    return filters.setPageHref(page);
  };

  const chevronLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
  const chevronRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );

  return (
    <>
      <div className="flex space-x-2 text-md border-y py-2">
        {pagination.previousEnabled && (
          <Link href={generateSearchForPage(pagination.page - 1)}>
            <a className="underline flex items-center space-x-1 text-pink-800">
              {chevronLeft}
              <div>Previous Page</div>
            </a>
          </Link>
        )}
        {pagination.previousEnabled || (
          <div className="underline text-gray-400 cursor-not-allowed flex items-center space-x-1">
            {chevronLeft}
            <div>Previous</div>
          </div>
        )}
        <div className="text-gray-800 flex-grow text-center">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        {pagination.nextEnabled && (
          <Link href={generateSearchForPage(pagination.page + 1)}>
            <a className="underline flex items-center space-x-1 text-pink-800">
              <div>Next Page</div>
              {chevronRight}
            </a>
          </Link>
        )}
        {pagination.nextEnabled || (
          <div className="underline text-gray-400 cursor-not-allowed flex items-center space-x-1">
            <div>Next</div>
            {chevronRight}
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
