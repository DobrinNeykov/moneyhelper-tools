import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import classNames from "classnames";

import useFilters from "./useFilters";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

import { Button } from "../Button";

import Label from "./Label";
import SearchInput from "./SearchInput";
import FilterSection from "./FilterSection";

const RefineSearch = ({ refineSearch }) => {
  const filters = useFilters();

  const router = useRouter();
  const [showApply, setShowApply] = useState(true);

  useEffect(() => setShowApply(false), []);

  return (
    <div className="border border-slate-400 border-grey-500 overflow-hidden rounded-md">
      <input type="hidden" name="refineSearch" value="true" />

      <button
        type="submit"
        className="flex items-center w-full text-left block bg-gray-100 px-5 lg:px-6 text-left lg:py-5 font-bold text-lg text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          className="lg:hidden"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"
          ></path>
        </svg>
        <div>Refine your search</div>
      </button>

      <div
        className={classNames(
          "p-6",
          {
            block: refineSearch,
            hidden: !refineSearch,
          },
          "lg:block"
        )}
      >
        <div className="space-y-5">
          <div className="">
            <Label htmlFor="search">Account or provider name</Label>
            <SearchInput
              id={"search"}
              name="q"
              className="w-full"
              value={filters.searchQuery}
              onChange={(e) => filters.setSearchQuery(e.target.value)}
            />
          </div>
          <FilterSection title="Account type" values={listAccountTypes()} />
          <FilterSection
            title="Account features"
            values={listAccountFeatures()}
          />
          <FilterSection title="Account access" values={listAccountAccess()} />

          {showApply && <Button title="Apply filters" />}
        </div>
      </div>
    </div>
  );
};

export default RefineSearch;
