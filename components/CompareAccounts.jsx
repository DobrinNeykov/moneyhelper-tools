import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "./Button";
import { Errors } from "./Errors";
import { Select } from "./Select";
import queryString from "query-string";

/**
 * Compare accounts calculator
 */
export const CompareAccounts = ({ serverQuery, accounts, ...props }) => {
  const pageSize = 10;
  const currentPage = 1;

  const generateSearchForPage = (page) => {
    const query = serverQuery || {};
    query.page = page;
    return "?" + queryString.stringify(query);
  };

  const SearchInput = () => {
    return (
      <div className="">
        <input type="text" />
      </div>
    );
  };

  const FilterSection = ({ title, values }) => {
    return (
      <div className="">
        <div className="mb-3 text-lg font-bold">{title}</div>
        {values.map((v) => (
          <div key={v} className="flex">
            <div className="mr-2">
              <input type="checkbox" />
            </div>
            <div className="">{v}</div>
          </div>
        ))}
      </div>
    );
  };

  const Pagination = ({ totalItems, pageSize, currentPage }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const pages = [...Array(totalPages).keys()];
    const previousPage = currentPage == 1 ? currentPage : currentPage - 1;
    const nextPage = currentPage == totalPages ? currentPage : currentPage + 1;

    return (
      <div className="flex space-x-1">
        <a href={generateSearchForPage(previousPage)}>Previous</a>
        {pages.map((page) => {
          return (
            <a key={page} href={generateSearchForPage(page + 1)}>
              {page + 1}
            </a>
          );
        })}
        <a href={generateSearchForPage(nextPage)}>Next</a>
      </div>
    );
  };

  return (
    <div className="flex space-x-3">
      <div className="border border-solid rounded-md">
        <div className="mb-3 bg-gray-100 pl-3 py-5">Refine your search</div>
        <div className="p-3">
          <div className="space-y-5">
            <Errors label="Account or provider name" errors={[]}>
              <SearchInput />
            </Errors>
            <FilterSection
              title="Account type"
              values={[
                "Children's accounts",
                "Current accounts",
                "Fee-free basic accounts",
                "Graduate accounts",
                "Packaged accounts",
                "Premier accounts",
                "Prepaid card accounts",
                "Student accounts",
                "Young person's accounts",
              ]}
            />
            <FilterSection
              title="Account features"
              values={[
                "Cheque book available",
                "No monthly fee",
                "Open to new customers",
                "Overdraft facilities",
                "Supports 7-day switching",
              ]}
            />
            <FilterSection
              title="Account access"
              values={[
                "Branch banking",
                "Internet banking",
                "Mobile app banking",
                "Post Office banking",
              ]}
            />

            <Button title="Apply filters" />
          </div>
        </div>
      </div>
      <div className="border border-solid p-3 rounded-sm">
        <div className="flex mb-3">
          <div className="flex-grow">
            <div className="">Showing 1 - 5 of {accounts.length} accounts</div>
            <div className="">Last updated: 19 April 2022</div>
          </div>
          <div className="">
            <Select
              label="Sort by"
              options={[{ text: "Random order...", value: "random" }]}
              value="random"
            />
          </div>
        </div>
        <div className="mb-3 space-y-3">
          {accounts
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((account) => (
              <div
                key={account.name}
                className="border-solid border rounded-bl-lg p-3"
              >
                {account.name}
              </div>
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={accounts.length}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

CompareAccounts.propTypes = {
  /**
   * Account data
   */
  accounts: PropTypes.array,
};

CompareAccounts.defaultProps = {
  accounts: [],
};
