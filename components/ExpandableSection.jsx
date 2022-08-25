import { useState, useEffect } from "react";

import classNames from "classnames";

const ExpandableSection = ({ title, children }) => {
  return (
    <>
      <details className="space-y-4">
        <summary className="bg-inherit text-lg cursor-pointer marker:text-pink-900">
          <div className="underline text-lg text-pink-900 inline outline-none select-none">
            {title}
          </div>
        </summary>
        <div className="group-open:bg-gray-300">{children}</div>
      </details>
    </>
  );
};

export default ExpandableSection;
