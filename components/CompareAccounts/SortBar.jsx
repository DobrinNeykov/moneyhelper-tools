import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import slug from "slug";

import useFilters from "./useFilters";

import { Select } from "../Select";
import { Button } from "../Button";

const SortBar = ({ pagination }) => {
  const router = useRouter();
  const filters = useFilters();
  const [showApply, setShowApply] = useState(true);

  useEffect(() => setShowApply(false), []);

  return (
    <div className="flex mb-5">
      <div className="flex-grow">
        <div className="">
          Showing {pagination.startIndex + 1} - {pagination.endIndex} of{" "}
          {pagination.totalItems} accounts
        </div>
        <div className="">Last updated: 19 April 2022</div>
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="order" className="text-md text-gray-700">
          Sort by
        </label>
        <Select
          label="Sort by"
          id="order"
          name="order"
          hideEmptyItem={true}
          value={filters.order}
          onChange={(e) => filters.setOrder(e.target.value)}
          options={[
            "Random",
            "Provider name A-Z",
            "Provider name Z-A",
            "Account name A-Z",
            "Account name Z-A",
            "Monthly account fee (lowest first)",
            "Minimum monthly deposit (lowest first)",
            "Arranged overdraft rate (lowest first)",
            "Unarranged maximum monthly charge (lowest first)",
          ].map((v) => ({ text: v, value: slug(v) }))}
        />
        {showApply && <Button title="Apply" />}
      </div>
    </div>
  );
};

export default SortBar;
