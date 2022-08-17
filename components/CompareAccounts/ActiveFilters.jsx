import Link from "next/link";

import useFilters from "./useFilters";

const ActiveFilters = ({}) => {
  const filters = useFilters();

  const Filter = ({ title, href }) => {
    return (
      <div className="inline-block border-2 border-slate-400 shadow-bottom-gray rounded-lg px-2 py-1">
        <div className="flex items-center text-pink-800 space-x-2">
          <div>{title}</div>
          <Link href={href}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div>{filters.count} active filters </div>
        <Link href="?">
          <a className="underline flex items-center space-x-1 text-pink-800">
            Clear all
          </a>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.accountTypes.map((a) => (
          <Filter key={a} title={a} href={filters.removeFilterHref(a)} />
        ))}
        {filters.accountFeatures.map((a) => (
          <Filter key={a} title={a} href={filters.removeFilterHref(a)} />
        ))}
        {filters.accountAccess.map((a) => (
          <Filter key={a} title={a} href={filters.removeFilterHref(a)} />
        ))}
        {filters.searchQuery && (
          <Filter
            title={`search: "${filters.searchQuery}"`}
            href={filters.removeSearchQueryHref()}
          />
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;