import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import queryString from "query-string";
import slug from "slug";

import { Button } from "../Button";
import { Errors } from "../Errors";
import { Select } from "../Select";

import AccountList from "./account-list";
import AccountFinder from "./account-finder";
import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";
import Filters from "./filters";

import formatMoney from "./formatMoney";

import jsonAccounts from "../../accounts.json";

const usePagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    page,
    pageSize,
    totalItems,

    totalPages,

    startIndex: pageSize * (page - 1),
    endIndex: pageSize * (page - 1) + pageSize,

    nextPage: page + 1,
    previousPage: page - 1,

    previousEnabled: page > 1,
    nextEnabled: page < totalPages,
  };
};

const TextInput = ({ id, name, value, className, onChange }) => {
  return (
    <input
      id={id}
      name={name}
      type="text"
      className={classNames("border", "rounded", "py-1", "px-2", className)}
      onChange={onChange}
      value={value}
    />
  );
};

const Label = ({ htmlFor, label, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "text-md",
        "font-grey-900",
        "mb-1",
        "block",
        className
      )}
    >
      {children}
    </label>
  );
};

const RefineSearch = ({ serverQuery, refineSearch }) => {
  const [queryValue, setQueryValue] = useState(serverQuery.q);

  return (
    <div className="border border-solid border-grey-500 overflow-hidden rounded-md">
      <input type="hidden" name="refineSearch" value="true" />

      <button
        type="submit"
        className="flex items-center w-full text-left block bg-gray-100 px-3 text-center lg:text-left lg:py-5 font-bold text-lg text-gray-900"
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
            <TextInput
              id={"search"}
              name="q"
              className="w-full"
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
            />
          </div>
          <FilterSection
            serverQuery={serverQuery}
            title="Account type"
            values={listAccountTypes()}
          />
          <FilterSection
            serverQuery={serverQuery}
            title="Account features"
            values={listAccountFeatures()}
          />
          <FilterSection
            serverQuery={serverQuery}
            title="Account access"
            values={listAccountAccess()}
          />

          <Button title="Apply filters" />
        </div>
      </div>
    </div>
  );
};

const CheckBox = ({ id, name, label, initialValue }) => {
  const [checked, setChecked] = useState(initialValue);

  return (
    <div key={name} className="flex">
      <div className="mr-2 flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="w-4 h-4 rounded accent-pink-600"
        />
      </div>
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
    </div>
  );
};

const FilterSection = ({ serverQuery, title, values }) => {
  return (
    <div className="">
      <div className="mb-3 text-lg font-bold">{title}</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:block">
        {values.map((v) => {
          const name = slug(v);
          const checked = !!serverQuery[name];

          return (
            <div key={name} className="flex">
              <CheckBox
                id={name}
                name={name}
                label={v}
                initialValue={checked}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Pagination = ({ pagination, query }) => {
  const generateSearchForPage = (page) => {
    return "?" + queryString.stringify({ q: query, p: page });
  };

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

  return (
    <>
      <div className="flex space-x-2 text-md border-y py-2">
        {pagination.previousEnabled && (
          <a
            href={generateSearchForPage(pagination.page - 1)}
            className="underline flex items-center space-x-1 text-pink-800"
          >
            {chevronLeft}
            <div>Previous Page</div>
          </a>
        )}
        {pagination.previousEnabled || (
          <div className="underline text-gray-400 cursor-not-allowed flex items-center space-x-1">
            {chevronLeft}
            <div>Previous</div>
          </div>
        )}
        <div className="text-gray-800 flex-grow text-center">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        {pagination.nextEnabled && (
          <a
            href={generateSearchForPage(pagination.page + 1)}
            className="underline flex items-center space-x-1 text-pink-800"
          >
            <div>Next Page</div>
            {chevronRight}
          </a>
        )}
        {pagination.nextEnabled || (
          <div className="underline text-gray-400 cursor-not-allowed flex items-center space-x-1">
            <div>Next</div>
            {chevronRight}
          </div>
        )}
      </div>
    </>
  );
};

const SortBar = ({ pagination }) => {
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
        <label htmlFor="sort-order" className="text-md text-gray-700">
          Sort by
        </label>
        <Select
          label="Sort by"
          id="sort-order"
          options={[{ text: "Random order...", value: "random" }]}
          value="random"
        />
      </div>
    </div>
  );
};

const AccountCheckboxes = ({ title, fields }) => {
  return (
    <div>
      <div className="mb-3 text-lg font-bold">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center space-x-2">
            {field.checked ? (
              <div className="text-blue-900">
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
                    d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="text-pink-800">
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
                    d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                  ></path>
                </svg>
              </div>
            )}
            <div>{field.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountExpandedView = ({ account }) => {
  const [showExpanded, setShowExpanded] = useState(true);

  useEffect(() => {
    setShowExpanded(false);
  }, []);

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="underline text-pink-900 flex items-center outline-none"
        onClick={() => setShowExpanded((se) => !se)}
      >
        <div>{showExpanded ? "Hide" : "Show"} all account fees and charges</div>
        <div>
          {showExpanded || (
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
          {showExpanded && (
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
      {showExpanded && (
        <div className="animate-in zoom-in">
          <AccountCheckboxes
            title="Account access options"
            fields={listAccountAccess().map((a) => ({
              label: a,
              checked: account.access.includes(a),
            }))}
          />
          <AccountCheckboxes
            title="Account features"
            fields={listAccountFeatures().map((a) => ({
              label: a,
              checked: account.features.includes(a),
            }))}
          />
        </div>
      )}
    </div>
  );
};

const Accounts = ({ accounts, pagination }) => {
  return (
    <div className="mb-3 space-y-3">
      {accounts
        .slice(pagination.startIndex, pagination.endIndex)
        .map((account) => (
          <div
            key={account.id}
            className="border-solid border rounded-bl-3xl py-4 px-6"
          >
            <div className="flex items-center">
              <div className="flex-grow text-2xl font-bold text-blue-900 mb-2">
                {account.providerName}
              </div>
              <div className="">
                <a
                  href={account.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-pink-900 flex items-center space-x-1"
                >
                  <div>Visit provider website</div>
                  <div>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.80582 0.443208L1.80581 3.27164L7.32125 3.27164C8.16978 3.27164 8.80617 3.90803 8.80617 4.75656L8.87688 10.3427L11.7053 10.3427L11.7053 4.40301C11.7053 2.14027 9.93754 0.372498 7.6748 0.372498L1.80582 0.443208Z"
                        fill="#AE0060"
                      />
                      <rect
                        x="2.81836"
                        y="11.4521"
                        width="3"
                        height="10"
                        transform="rotate(-135 2.81836 11.4521)"
                        fill="#AE0060"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="text-lg text-gray-900 mb-4">{account.name}</div>
            <div className="divide-x-2 flex mb-3">
              <div className="pr-4">
                <div className="">Monthly account fee</div>
                <div className="font-bold">
                  {formatMoney(account.monthlyFee)}
                </div>
              </div>
              <div className="px-4">
                <div className="">Min. monthly deposit requirement</div>
                <div className="font-bold">£{account.minimumMonthlyCredit}</div>
              </div>
              <div className="px-4">
                <div className="">Arranged overdraft interest rate</div>
                <div className="font-bold">{account.representativeAPR}%</div>
              </div>
              <div className="pl-4">
                <div className="">Unarranged overdraft max. monthly charge</div>
                <div className="font-bold">£{account.unauthODMonthlyCap}</div>
              </div>
            </div>

            <AccountExpandedView account={account} />
          </div>
        ))}
    </div>
  );
};

const ActiveFilters = ({ filters }) => {
  const Filter = ({ filter }) => {
    const filtersWithoutFilter = filters.withoutFilter(filter);

    return (
      <div className="inline-block border-2 rounded shadow px-2 py-1">
        <div className="flex items-center text-pink-800 space-x-2">
          <div>{filter}</div>
          <a href={filtersWithoutFilter.href}>
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
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div>{filters.count} active filters </div>
        <a
          href="?"
          className="underline flex items-center space-x-1 text-pink-800"
        >
          Clear all
        </a>
      </div>
      <div className="space-x-2">
        {filters.accountTypes.map((a) => (
          <Filter key={a} filter={a} />
        ))}
      </div>
    </div>
  );
};

/**
 * Compare accounts calculator
 */
export const CompareAccounts = ({ serverQuery, ...props }) => {
  const refineSearch = !!serverQuery.refineSearch;
  const page = serverQuery.p ? parseInt(serverQuery.p) : 1;
  const query = serverQuery.q;
  const filters = new Filters(serverQuery);

  const allAccounts = new AccountList(jsonAccounts);
  const accountFinder = new AccountFinder(serverQuery, allAccounts);
  const accounts = accountFinder.find();

  const pagination = usePagination({
    page,
    pageSize: 5,
    totalItems: accounts.length,
  });

  return (
    <form method="get" className="p-10">
      <div className="w-full lg:flex lg:space-x-4 ">
        <div className="mb-4">
          <RefineSearch serverQuery={serverQuery} refineSearch={refineSearch} />
        </div>
        <div className="space-y-4">
          {filters.count > 0 && <ActiveFilters filters={filters} />}
          <SortBar pagination={pagination} />
          <Accounts accounts={accounts} pagination={pagination} />
          <Pagination pagination={pagination} query={filters.query} />
        </div>
      </div>
    </form>
  );
};

export default CompareAccounts;
