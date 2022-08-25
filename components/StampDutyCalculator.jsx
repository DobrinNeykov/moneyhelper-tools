import React from "react";
import { Button } from "./Button";
import { Errors } from "./Errors";
import { MoneyInput } from "./MoneyInput";
import { Select } from "./Select";
import H2 from "./H2";
import ExpandableSection from "./ExpandableSection";
import classNames from "classnames";
import StampDuty from "./stamp-duty";
import numeral from "numeral";
import { useRouter } from "next/router";
import queryString from "query-string";

/**
 * Stamp Duty Calculator Component
 */
const StampDutyCalculator = ({ serverQuery }) => {
  const router = useRouter();

  const retrievePrice = () => retrieveQueryValue("price");
  const retrieveBuyerType = () => retrieveQueryValue("buyerType");

  const retrieveQueryValue = (name) => {
    if (serverQuery && serverQuery[name]) {
      return serverQuery[name];
    } else if (typeof window !== "undefined") {
      const qs = queryString.parse(window.location.search);
      return qs[name];
    }
  };

  const calculated = !!retrieveQueryValue("calculated");

  const [price, setPrice] = React.useState(retrievePrice());
  const [buyerType, setBuyerType] = React.useState(retrieveBuyerType());

  let result;
  if (price && buyerType) {
    result = new StampDuty(price * 100, buyerType).calculate();
  }

  const [formAttributes, setFormAttributes] = React.useState({});

  React.useEffect(() => {
    // we only need to keep form attributes around so that
    // storybook iframe rendering of this component doesn't break.
    if (typeof window !== "undefined") {
      setFormAttributes((f) =>
        Object.assign(f, {
          action: window.location.pathname + window.location.search,
        })
      );
    }
  }, []);

  const propertyDescriptor = () => {
    if (buyerType === "additionalHome") {
      return "Stamp Duty on your additional property is";
    } else if (buyerType === "firstTimeBuyer") {
      return "Stamp Duty on your first property is";
    } else if (buyerType === "nextHome") {
      return "Stamp Duty on your next home is";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 text-gray-800 mb-10">
        <div className="border-l-4 border-teal-300 pl-3 text-lg text-gray-800">
          Calculate the Stamp Duty you will owe if you’re purchasing a
          residential property in England or Northern Ireland
        </div>
        <div>
          You must pay Stamp Duty Land Tax (SDLT) if you buy a property or land
          over the current threshold in England and Northern Ireland. This
          calculator will help you work out how much you must pay.
        </div>
        <div>
          You must pay Stamp Duty Land Tax (SDLT) if you buy a property or land
          over a certain price in England and Northern Ireland. There are
          different rules if you’re buying your first home or an additional
          residential property.
        </div>
        <div>
          You must generally pay the higher SDLT rates when you buy a
          residential property or a part of one if it will not be the only
          residential property that you own (or part own) anywhere in the world,
          you have not sold or given away your previous main home and no one
          else has a lease on it which has more than 21 years left to run. These
          rules apply if you’re married to or buying with someone.
        </div>
      </div>
      <hr />
      <form
        method="get"
        {...formAttributes}
        className="mx-auto"
        onSubmit={(e) => {
          if (window) {
            e.preventDefault();

            const qs = queryString.parse(window.location.search);
            qs.price = price || "";
            qs.buyerType = buyerType || "";
            qs.calculated = true;
            window.location.search = queryString.stringify(qs);
          }
        }}
      >
        <div className="lg:space-x-8 lg:flex">
          <div className="sm:w-full lg:w-1/2 mb-8">
            <input type="hidden" name="calculated" value="true" />
            <div className="mb-3">
              <Errors
                label="I am buying"
                errors={
                  calculated && !buyerType
                    ? ["Select the type of property you are buying"]
                    : []
                }
              >
                <Select
                  name="buyerType"
                  emptyItemText="Select an option..."
                  value={buyerType}
                  options={[
                    {
                      text: "first property (first-time buyer)",
                      value: "firstTimeBuyer",
                    },
                    { text: "my next home", value: "nextHome" },
                    {
                      text: "an additional property or second home",
                      value: "additionalHome",
                    },
                  ]}
                  onChange={(e) => {
                    setBuyerType(e.target.value);
                  }}
                />
              </Errors>
            </div>
            <div className="mb-8">
              <Errors
                label="Property price"
                errors={
                  calculated && !price
                    ? ["Enter a property price, for example £200,000"]
                    : []
                }
              >
                <MoneyInput
                  name="price"
                  defaultValue={price || ""}
                  onChange={(value) => {
                    setPrice(value);
                  }}
                />
              </Errors>
            </div>
            <Button title="Calculate stamp duty" />
          </div>

          <div className="w-1/2 p-3 lg:p-8 w-full lg:w-1/2 border border-slate-400 rounded-bl-3xl">
            <div className="text-2xl text-gray-700 font-bold mb-8">
              Calculate how much stamp duty you will pay:
            </div>
            {result ? (
              <>
                <div className="text-xl text-gray-700 font-bold mb-4">
                  {propertyDescriptor()}
                </div>
                <div className="text-5xl text-gray-700 font-bold mb-4">
                  £{numeral(result.tax / 100).format("0,0")}
                </div>
                <div className="text-xl text-gray-700 font-bold">
                  The effective tax rate is {result.percentage.toPrecision(3)}%
                </div>
              </>
            ) : (
              <ol className="list-decimal marker:text-blue-800 marker:font-bold px-5">
                <li className="mb-3">Select property type</li>
                <li className="mb-3">Enter purchase price</li>
                <li className="mb-3">Press &quot;Calculate stamp duty&quot;</li>
              </ol>
            )}
          </div>
        </div>
      </form>
      <div>
        <ExpandableSection title="How it is calculated">
          <div className="space-y-8">
            <div className="space-y-4">
              <div>
                Stamp Duty is paid at different rates, depending on the purchase
                price.
              </div>
              <div>
                The table below shows the rates of stamp duty for someone buying
                their additional property or second home would pay.
              </div>
              <div>
                If the property is an additional property or second home there
                will be an extra 3% to pay on top of the relevant standard
                rates.
              </div>
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr className="border-b border-slate-400">
                  <th className="py-2 text-left">Purchase price of property</th>
                  <th className="py-2 text-left">Rate of Stamp Duty</th>
                  <th className="py-2 text-left">Additional Property Rate*</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-400">
                  <td className="py-2">£0 - £125,000</td>
                  <td className="py-2">0%</td>
                  <td className="py-2">3%</td>
                </tr>
                <tr className="border-b border-slate-400">
                  <td className="py-2">£125,001 - £250,000</td>
                  <td className="py-2">2%</td>
                  <td className="py-2">5%</td>
                </tr>
                <tr className="border-b border-slate-400">
                  <td className="py-2">£250,001 - £925,000 </td>
                  <td className="py-2">5%</td>
                  <td className="py-2">8%</td>
                </tr>
                <tr className="border-b border-slate-400">
                  <td className="py-2">£925,001 - £1,500,000 </td>
                  <td className="py-2">10%</td>
                  <td className="py-2">13%</td>
                </tr>
                <tr className="border-b border-slate-400">
                  <td className="py-2">Over £1.5 million </td>
                  <td className="py-2">12%</td>
                  <td className="py-2">15%</td>
                </tr>
              </tbody>
            </table>
            <div>
              * An extra 3% is charged if property is an additional property or
              second home. Properties under £40,000 are not subject to the
              additional SDLT rate.
            </div>
          </div>
        </ExpandableSection>
      </div>
      <div className="border-yellow-200 border-4 flex rounded-bl-3xl px-4">
        <div className="text-pink-800 -mt-3">
          <svg width="64" height="64" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 3h4v7.5c0 1.93 1.57 3.5 3.5 3.5H13v-4l7 6l-7 6v-4h-2.5C6.36 18 3 14.64 3 10.5V3Z"
            />
          </svg>
        </div>
        <div className="py-4 space-y-3">
          <div className="font-bold text-lg text-gray-800">Did you know?</div>
          <div className="text-md text-gray-800">
            You have to pay Stamp Duty within 14 days of buying a property. If
            you&apos;re using a solicitor to carry out the conveyancing, they
            will normally organise the payment for you.
          </div>
          <div className="text-md text-pink-800 underline">
            Stamp Duty - Everything you need to know
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDutyCalculator;
