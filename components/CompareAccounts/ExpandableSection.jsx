import { useState, useEffect } from "react";

import classNames from "classnames";

const ExpandableSection = ({ title, expandedTitle, children }) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(false);
  }, []);

  return (
    <>
      <button
        type="button"
        className={classNames(
          "underline text-lg text-pink-900 flex items-center outline-none",
          { "mb-4": expanded }
        )}
        onClick={() => setExpanded((se) => !se)}
      >
        <div>{expanded ? expandedTitle || title : title}</div>
        <div>
          {expanded || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
              ></path>
            </svg>
          )}
          {expanded && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
              ></path>
            </svg>
          )}
        </div>
      </button>
      {expanded && <div className="mb-8">{children}</div>}
    </>
  );
};

export default ExpandableSection;
