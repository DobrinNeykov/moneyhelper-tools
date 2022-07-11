import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { MoneyInput } from "./MoneyInput";
import { Select } from "./Select";
import StampDuty from "./stamp-duty";
import numeral from "numeral";
import { useRouter } from "next/router";

/**
 * Stamp Duty Calculator Component
 */
export const StampDutyCalculator = () => {
  const router = useRouter();

  const [buyerType, setBuyerType] = React.useState();
  const [price, setPrice] = React.useState();

  let result;
  if (price && buyerType) {
    result = new StampDuty(price * 100, buyerType).calculate();
  }

  React.useEffect(() => {
    if (router.query.price && !price) {
      setPrice(router.query.price);
    }
    if (router.query.buyerType && !buyerType) {
      setBuyerType(router.query.buyerType);
    }
  });
  console.log(buyerType);

  return (
    <form
      method="get"
      action={
        typeof window !== "undefined" &&
        window.location.pathname + window.location.search
      }
      onSubmit={(e) => {
        const qs = queryString.parse(location.search);
        qs.price = price;
        qs.buyerType = buyerType;

        window.location.search = queryString.stringify(qs);

        e.preventDefault();
      }}
    >
      <div className="stamp-duty-calculator-container">
        <div className="box">
          <MoneyInput
            label="Property Price"
            name="price"
            defaultValue={price}
            onChange={(value) => {
              setPrice(value);
            }}
          />
          <Select
            label="Buyer type"
            name="buyerType"
            emptyItemText="Select an option..."
            value={buyerType}
            options={[
              { text: "First-time buyer", value: "firstTimeBuyer" },
              { text: "Next home", value: "nextHome" },
              { text: "Additional or second home", value: "additionalHome" },
            ]}
            onChange={(value) => {
              setBuyerType(value);
            }}
          />
          <Button label="Calculate" />
        </div>
        <div className="box results">
          <div>Stamp duty is:</div>
          {result && (
            <>
              <div>£{numeral(result.tax / 100).format("0,0")}</div>
              <div>{result.percentage.toPrecision(3)}%</div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

StampDutyCalculator.propTypes = {};

StampDutyCalculator.defaultProps = {};
