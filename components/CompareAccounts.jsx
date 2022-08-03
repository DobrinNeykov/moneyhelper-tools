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
        <a href={generateSearchForPage(previousPage)} className="underline">
          Previous
        </a>
        {pages.map((page) => {
          return (
            <a
              key={page}
              href={generateSearchForPage(page + 1)}
              className="underline"
            >
              {page + 1}
            </a>
          );
        })}
        <a href={generateSearchForPage(nextPage)} className="underline">
          Next
        </a>
      </div>
    );
  };

  return (
    <div className="flex space-x-3">
      <div className="border border-solid border-grey-500 overflow-hidden rounded-md">
        <div className="mb-3 bg-gray-100 pl-3 py-5 font-bold text-lg text-gray-900">
          Refine your search
        </div>
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
      <div className="p-3">
        <div className="flex mb-5">
          <div className="flex-grow">
            <div className="">Showing 1 - 5 of {accounts.length} accounts</div>
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
        <div className="mb-3 space-y-3">
          {accounts
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((account) => (
              <div
                key={account.providerName}
                className="border-solid border rounded-bl-3xl py-4 px-6"
              >
                <div className="flex items-center">
                  <div className="flex-grow text-2xl font-bold text-blue-900 mb-2">
                    {account.providerName}
                  </div>
                  <div className="">
                    <a
                      href={account.productLandingPageURL}
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
                <div className="text-lg text-gray-900 mb-4">
                  {account.productName}
                </div>
                <div className="divide-x-2 flex mb-3">
                  <div className="pr-4">
                    <div className="">Monthly account fee</div>
                    <div className="font-bold">£{account.monthlyCharge}</div>
                  </div>
                  <div className="px-4">
                    <div className="">Min. monthly deposit requirement</div>
                    <div className="font-bold">
                      £{account.minimumMonthlyCredit}
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="">Arranged overdraft interest rate</div>
                    <div className="font-bold">
                      {account.representativeAPR}%
                    </div>
                  </div>
                  <div className="pl-4">
                    <div className="">
                      Unarranged overdraft max. monthly charge
                    </div>
                    <div className="font-bold">
                      £{account.unauthODMonthlyCap}
                    </div>
                  </div>
                </div>
                <div className="">
                  <a
                    href={"#"}
                    className="underline text-pink-900 flex items-center space-x-1"
                  >
                    <div>Show all account fees and charges</div>
                    <div>
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-8.74228e-08 5.5L2 7.5L5.9 3.6C6.5 3 7.4 3 8 3.6L12 7.5L14 5.5L9.8 1.3C8.2 -0.3 5.7 -0.3 4.1 1.3L-8.74228e-08 5.5Z"
                          fill="#AE0060"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
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
