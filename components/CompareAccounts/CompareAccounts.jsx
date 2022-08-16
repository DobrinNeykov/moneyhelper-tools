import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import RefineSearch from "./RefineSearch";
import Pagination from "./Pagination";
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
export const CompareAccounts = ({ serverQuery, ...props }) => {
  const router = useRouter();
  const [query, setQuery] = useState(serverQuery);

  const refineSearch = !!serverQuery.refineSearch;
  const filters = useFilters();

  const allAccounts = new AccountList(jsonAccounts);
  const accountFinder = new AccountFinder(allAccounts, filters);
  const accounts = accountFinder.find();

  useEffect(() => {
    setQuery(router.query);
  }, [setQuery, router.query]);

  const pagination = usePagination({
    page: filters.page,
    pageSize: 5,
    totalItems: accounts.length,
  });

  return (
    <form method="get" className="p-10">
      <div className="w-full lg:flex lg:space-x-4 ">
        <div className="mb-4 lg:w-[300px] lg:min-w-[300px]">
          <RefineSearch refineSearch={refineSearch} />
        </div>
        <div className="space-y-4 flex-grow">
          {filters.count > 0 && <ActiveFilters />}
          <SortBar pagination={pagination} />
          <Accounts accounts={accounts} pagination={pagination} />
          <Pagination pagination={pagination} />
        </div>
      </div>
    </form>
  );
};

export default CompareAccounts;
