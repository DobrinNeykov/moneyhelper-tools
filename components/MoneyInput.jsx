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
  id = id || useId();

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
    <div className={styles.container}>
      <div className={hasErrors && styles.error_border}>
        {label && (
          <div>
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          </div>
        )}
        {hasErrors &&
          errors.map((e) => (
            <label htmlFor={id} key={e} className={styles.error_message}>
              {e}
            </label>
          ))}
        <div className={styles.input_container}>
          <span className={styles.prefix}>£</span>
          <NumberFormat
            id={id}
            name={name}
            className={styles.input}
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
