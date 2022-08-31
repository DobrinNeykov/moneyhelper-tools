import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "../Pagination";

import RefineSearch from "./RefineSearch";
import Accounts from "./Accounts";
import ActiveFilters from "./ActiveFilters";
import SortBar from "./SortBar";

import pageFilters from "./pageFilters";
import calculatePagination from "./calculatePagination";

/**
 * Compare accounts calculator
 */
export const CompareAccounts = ({ accounts, totalItems }) => {
  const router = useRouter();
  const filters = pageFilters(router);

  const pagination = calculatePagination({
    page: filters.page,
    totalItems,
  });

  return (
    <form method="get" className="mx-auto">
      <div className="w-full lg:flex lg:space-x-4 ">
        <div className="mb-4 lg:w-[300px] lg:min-w-[300px]">
          <RefineSearch />
        </div>
        <div className="space-y-4 flex-grow">
          {filters.count > 0 && <ActiveFilters />}
          <SortBar
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            totalItems={pagination.totalItems}
          />
          <Accounts accounts={accounts} totalItems={pagination.totalItems} />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            setPageHref={filters.setPageHref}
          />
        </div>
      </div>
    </form>
  );
};

export default CompareAccounts;
