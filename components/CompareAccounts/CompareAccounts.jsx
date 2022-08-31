import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";

import RefineSearch from "./RefineSearch";
import Accounts from "./Accounts";
import ActiveFilters from "./ActiveFilters";
import SortBar from "./SortBar";

import useFilters from "./useFilters";
import usePagination from "./usePagination";

import AccountList from "./account-list";
import AccountFinder from "./account-finder";

import jsonAccounts from "../../accounts.json";

/**
 * Compare accounts calculator
 */
export const CompareAccounts = () => {
  const filters = useFilters();

  const allAccounts = new AccountList(jsonAccounts);
  const accountFinder = new AccountFinder(allAccounts, filters);
  const accounts = accountFinder.find();

  const pagination = usePagination({
    page: filters.page,
    totalItems: accounts.length,
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
          <Accounts
            accounts={accounts.slice(
              pagination.startIndex,
              pagination.endIndex
            )}
            totalItems={pagination.totalItems}
          />
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
