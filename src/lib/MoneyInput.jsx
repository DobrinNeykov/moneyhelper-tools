import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import "./money-input.scss";

/**
 * Money Input Component
 */
export const MoneyInput = ({ id, defaultValue }) => {
  const minMaxNumberCheck = (input) => {
    console.log(input);
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
    <div class="cmp-form-text__container">
      <span class="cmp-form-text__container--prefix">£</span>
      <NumberFormat
        id={id}
        className="cmp-form-text__container--input-box"
        value={defaultValue}
        thousandSeparator={true}
        decimalSeparator="."
        decimalScale={3}
        isAllowed={minMaxNumberCheck}
      />
    </div>
  );
};

MoneyInput.propTypes = {
  /**
   * The input id
   */
  id: PropTypes.string,
};

MoneyInput.defaultProps = {};
