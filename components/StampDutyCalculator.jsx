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
import styles from "./StampDutyCalculator.module.css";

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
      <div className={styles.container}>
        <div className={styles.box}>
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
        <div className={classNames(styles.box, styles.results)}>
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
