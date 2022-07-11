import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { MoneyInput } from "./MoneyInput";
import { Select } from "./Select";
import "./stamp-duty-calculator.scss";
import StampDuty from "./stamp-duty";
import numeral from "numeral";

/**
 * Stamp Duty Calculator Component
 */
export const StampDutyCalculator = () => {
  const [buyerType, setBuyerType] = React.useState();
  const [price, setPrice] = React.useState();

  let result;
  if (price && buyerType) {
    result = new StampDuty(price * 100, buyerType).calculate();
  }

  return (
    <div className="stamp-duty-calculator-container">
      <div className="box">
        <MoneyInput
          label="Property Price"
          onChange={(value) => {
            setPrice(value);
          }}
        />
        <Select
          label="Buyer type"
          emptyItemText="Select an option..."
          options={[
            { text: "First-time buyer", value: "firstTimeBuyer" },
            { text: "Next home", value: "nextHome" },
            { text: "Additional or second home", value: "additionalHome" },
          ]}
          onChange={(value) => {
            setBuyerType(value);
          }}
        />
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
  );
};

StampDutyCalculator.propTypes = {};

StampDutyCalculator.defaultProps = {};
