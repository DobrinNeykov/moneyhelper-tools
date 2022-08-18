import { useState, useEffect } from "react";

import classNames from "classnames";

const ExpandableSection = ({ title, children }) => {
  return (
    <>
      <div className="">
        <details className="duration-300">
          <summary className="bg-inherit text-lg cursor-pointer marker:text-pink-900">
            <div className="underline text-lg text-pink-900 inline outline-none select-none">
              {title}
            </div>
          </summary>
          <div className="mb-8 mt-4 group-open:bg-gray-300">{children}</div>
        </details>
      </div>
    </>
  );
};

export default ExpandableSection;
