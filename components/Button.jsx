import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, disabled, label, autoFocus, ...props }) => {
  if (primary) {
    return (
      <button
        disabled={disabled}
        className={styles.primary}
        autoFocus={autoFocus}
        type="submit"
        {...props}
      >
        <div className={styles.content}>{label}</div>
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className={styles.secondary}
        autoFocus={autoFocus}
        type="submit"
        {...props}
      >
        <div className={styles.content}>{label}</div>
      </button>
    );
  }
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Disabled
   */
  disabled: PropTypes.bool,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: true,
  onClick: undefined,
  disabled: false,
};
