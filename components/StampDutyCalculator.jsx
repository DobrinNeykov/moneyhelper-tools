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

  const retrievePrice = () => {
    if (serverQuery && serverQuery.price) {
      return serverQuery.price.replaceAll(",", "");
    } else if (typeof window !== "undefined") {
      const qs = queryString.parse(window.location.search);
      return qs.price;
    }
  };

  const retrieveBuyerType = () => {
    if (serverQuery && serverQuery.buyerType) {
      return serverQuery.buyerType;
    } else if (typeof window !== "undefined") {
      const qs = queryString.parse(window.location.search);
      return qs.buyerType;
    }
  };

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
          qs.price = price;
          qs.buyerType = buyerType;
          window.location.search = queryString.stringify(qs);
        }
      }}
    >
      <div className="lg:space-x-8 lg:flex">
        <div className="sm:w-full lg:w-1/2 mb-8">
          <div className="mb-3">
            <MoneyInput
              label="Property Price"
              name="price"
              defaultValue={price}
              onChange={(value) => {
                setPrice(value);
              }}
            />
          </div>
          <div className="mb-8">
            <Select
              label="Buyer type"
              name="buyerType"
              emptyItemText="Select an option..."
              value={buyerType}
              options={[
                { text: "First-time buyer", value: "firstTimeBuyer" },
                { text: "Next home", value: "nextHome" },
                {
                  text: "Additional or second home",
                  value: "additionalHome",
                },
              ]}
              onChange={(value) => {
                setBuyerType(value);
              }}
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
              <li className="mb-3">Press "Calculate stamp duty"</li>
            </ol>
          )}
        </div>
      </div>
    </form>
  );
};

StampDutyCalculator.propTypes = {};

StampDutyCalculator.defaultProps = {};
