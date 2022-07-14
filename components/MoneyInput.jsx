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

  const hasErrors = errors && errors.length;

  return (
    <div>
      <div
        className={
          hasErrors && "border-0 border-l-4 pl-2 border-red-700 border-solid"
        }
      >
        {label && (
          <label htmlFor={id} className="inline-block text-gray-800 mb-2">
            {label}
          </label>
        )}
        {hasErrors &&
          errors.map((e) => (
            <label htmlFor={id} key={e} className="block text-red-700 mb-2">
              {e}
            </label>
          ))}
        <div className="flex">
          <span className="bg-gray-100 py-2 px-3 rounded-l-lg border-gray-800 border border-solid">
            £
          </span>
          <NumberFormat
            id={id}
            name={name}
            className={classNames(
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
      </div>
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
   * The label text
   */
  label: PropTypes.string.isRequired,
  /**
   * Gets fired when a value changes
   */
  onChange: PropTypes.func,
  /**
   * Errors
   */
  errors: PropTypes.array,
};

MoneyInput.defaultProps = {};
