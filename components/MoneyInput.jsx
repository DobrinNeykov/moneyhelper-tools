import React, { useId } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import styles from "./MoneyInput.module.css";
import classNames from "classnames";

/**
 * Money Input Component
 */
export const MoneyInput = ({
  id,
  name,
  defaultValue,
  label,
  onChange,
  errors,
}) => {
  const generatedId = useId();
  id = id || generatedId;

  const minMaxNumberCheck = (input) => {
    const MAX_MONEY_VALUE = 999999999999;

    if (input.floatValue) {
      const value = input.floatValue;
      if (value <= MAX_MONEY_VALUE && value >= 0) return true;
      return false;
    } else {
      return true;
    }
  };

  const hasErrors = errors && errors.length > 0;

  return (
    <div className="flex">
      <span className="bg-gray-100 py-2 px-3 rounded-l-lg border-gray-800 border border-solid">
        £
      </span>
      <NumberFormat
        id={id}
        name={name}
        className={classNames(
          "w-full",
          "border-gray-800",
          "border-t",
          "border-b",
          "border-r",
          "border-l-0",
          "rounded-r-lg",
          "pl-2",
          "ml-0",
          "h-auto",
          "focus:outline-purple-700",
          styles.outline
        )}
        value={defaultValue}
        thousandSeparator={true}
        decimalSeparator="."
        decimalScale={3}
        isAllowed={minMaxNumberCheck}
        onValueChange={(values) => {
          onChange && onChange(values.value);
        }}
      />
    </div>
  );
};

MoneyInput.propTypes = {
  /**
   * The input id
   */
  id: PropTypes.string,
  /**
   * The input name
   */
  name: PropTypes.string,
  /**
   * Gets fired when a value changes
   */
  onChange: PropTypes.func,
};

MoneyInput.defaultProps = {};
