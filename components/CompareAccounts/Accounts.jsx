import Link from "next/link";

import formatMoney from "./formatMoney";
import formatPercentage from "./formatPercentage";

import AccountExpandedView from "./AccountExpandedView";

const Accounts = ({ accounts, pagination }) => {
  return (
    <div className="mb-3">
      <div className="space-y-3">
        {accounts.length === 0 && (
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
        {accounts
          .slice(pagination.startIndex, pagination.endIndex)
          .map((account) => (
            <div
              key={account.id}
              className="border border-slate-400 rounded-bl-3xl py-4 px-6 animate-in zoom-in"
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
                  <div className="font-bold">
                    {formatMoney(account.minimumMonthlyCredit)}
                  </div>
                </div>
                <div className="px-4">
                  <div className="">Arranged overdraft interest rate</div>
                  <div className="font-bold">
                    {formatPercentage(account.representativeAPR)}
                  </div>
                </div>
                <div className="pl-4">
                  <div className="">
                    Unarranged overdraft max. monthly charge
                  </div>
                  <div className="font-bold">
                    {formatMoney(account.unauthODMonthlyCap)}
                  </div>
                </div>
              </div>

              <AccountExpandedView account={account} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Accounts;
