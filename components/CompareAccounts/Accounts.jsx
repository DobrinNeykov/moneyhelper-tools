import Link from "next/link";

import classNames from "classnames";

import formatMoney from "./formatMoney";
import formatPercentage from "./formatPercentage";

import Account from "./Account";

const Accounts = ({ accounts, totalItems }) => {
  return (
    <div className="mb-3">
      <div className="space-y-3">
        {totalItems === 0 && (
          <div className="border p-3">
            <div className="max-w-lg text-md text-gray-900">
              <div className="mb-3">
                There are no results that match your selected filters and search
                terms.
              </div>
              <div>
                Update your filters and search terms by removing tags in the
                applied filters section above. Or you can{" "}
                <Link href="?">
                  <a className="underline text-pink-900">reset the filters</a>
                </Link>{" "}
                and start over.
              </div>
            </div>
          </div>
        )}
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default Accounts;
