import Link from "next/link";
import PropTypes from "prop-types";
import classNames from "classnames";

import range from "./range";

const Pagination = ({ page, totalPages, setPageHref }) => {
  const previousEnabled = page !== 1;
  const nextEnabled = page !== totalPages;

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

  const offset = 5;
  const mobileOffsetLeft = 5;
  const mobileOffsetRight = 1;

  const start = Math.max(page - offset, 1);
  const end = Math.min(page + offset, totalPages);

  const pages = range(start, end);

  const Page = ({ p }) => {
    const hiddenOnMobile =
      p < page - mobileOffsetLeft || p > page + mobileOffsetRight;

    return (
      <Link href={setPageHref(p)}>
        <a
          title={`Go to page number ${p}`}
          className={classNames(
            "sm:block rounded-md px-3 py-2 hover:bg-pink-600 hover:text-white",
            {
              "text-pink-800": p !== page,
              underline: p !== page,
              "bg-pink-600": p === page,
              "text-white": p === page,
              hidden: hiddenOnMobile,
            }
          )}
        >
          {p}
        </a>
      </Link>
    );
  };

  const PreviousLink = () => {
    return (
      <Link href={setPageHref(page - 1)}>
        <a
          title="Go to the previous page"
          className="underline rounded-md px-3 py-2 text-pink-800 hover:bg-pink-600 hover:text-white"
        >
          <div className="flex items-center space-x-1">
            <div>{chevronLeft}</div>
            <div className="">Previous</div>
          </div>
        </a>
      </Link>
    );
  };

  const NextLink = () => {
    return (
      <Link href={setPageHref(page + 1)}>
        <a
          title="Go to the next page"
          className="underline rounded-md px-3 py-2 text-pink-800 hover:bg-pink-600 hover:text-white"
        >
          <div className="flex items-center space-x-1">
            <div className="">Next</div>
            <div>{chevronRight}</div>
          </div>
        </a>
      </Link>
    );
  };

  return (
    <div className="border-y border-slate-400 text-md py-2">
      <div className="flex space-x-2">
        <div className="hidden sm:flex items-center">
          {previousEnabled && <PreviousLink />}
        </div>
        {pages.map((p) => (
          <Page key={p} p={p} />
        ))}
        <div className="hidden sm:flex flex items-center">
          {nextEnabled && <NextLink />}
        </div>
      </div>
      <div className="flex sm:hidden">
        {previousEnabled && <PreviousLink />}
        <div className="flex-grow"></div>
        {nextEnabled && <NextLink />}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  /**
   * The current page
   */
  page: PropTypes.number.isRequired,
  /**
   * The total amount of pages
   */
  totalPages: PropTypes.number.isRequired,
  /**
   * A url for changing the page
   */
  setPageHref: PropTypes.func.isRequired,
};

Pagination.defaultProps = {};

export default Pagination;
