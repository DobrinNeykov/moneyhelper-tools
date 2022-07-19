import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { MoneyInput } from "./MoneyInput";
import { Select } from "./Select";
import classNames from "classnames";
import StampDuty from "./stamp-duty";
import numeral from "numeral";
import { useRouter } from "next/router";
import queryString from "query-string";

/**
 * Stamp Duty Calculator Component
 */
export const StampDutyCalculator = ({ serverQuery }) => {
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
    <form
      method="get"
      {...formAttributes}
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
            <Select
              label="I am buying"
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
              onChange={(value) => {
                setBuyerType(value);
              }}
              errors={
                calculated && !buyerType
                  ? ["Select the type of property you are buying"]
                  : []
              }
            />
          </div>
          <div className="mb-8">
            <MoneyInput
              label="Property price"
              name="price"
              defaultValue={price || ""}
              onChange={(value) => {
                setPrice(value);
              }}
              errors={
                calculated && !price
                  ? ["Enter a property price, for example £200,000"]
                  : []
              }
            />
          </div>
          <Button label="Calculate stamp duty" />
        </div>

        <div className="w-1/2 border-solid p-3 lg:p-8 w-full lg:w-1/2 border border-gray-900 rounded-bl-3xl">
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
            <ol>
              <li className="mb-3">Select property type</li>
              <li className="mb-3">Enter purchase price</li>
              <li className="mb-3">Press &quot;Calculate stamp duty&quot;</li>
            </ol>
          )}
        </div>
      </div>
    </form>
  );
};

StampDutyCalculator.propTypes = {};

StampDutyCalculator.defaultProps = {};
