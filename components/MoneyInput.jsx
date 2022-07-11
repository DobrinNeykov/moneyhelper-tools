import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

/**
 * Money Input Component
 */
export const MoneyInput = ({ id, name, defaultValue, label, onChange }) => {
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

  return (
    <div>
      {label && <label className="cmp-form-text--label">{label}</label>}
      <div className="cmp-form-text__container">
        <span className="cmp-form-text__container--prefix">£</span>
        <NumberFormat
          id={id}
          name={name}
          className="cmp-form-text__container--input-box"
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
  label: PropTypes.string,
  /**
   * Gets fired when a value changes
   */
  onChange: PropTypes.func,
};

MoneyInput.defaultProps = {};