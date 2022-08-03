import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Select.module.css";

/**
 * Select component
 */
export const Select = ({
  id,
  name,
  value,
  label,
  emptyItemText,
  options,
  onChange,
  location,
  errors,
  required,
}) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.border}>
          <span className={styles.arrow}>
            <svg
              className={styles.svg}
              width="24"
              height="24"
              viewBox="0 0 18 18"
              stroke="current"
              fill="current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_45_392)">
                <path d="M16 8L14 6L10.1 9.9C9.5 10.5 8.6 10.5 8 9.9L4 6L2 8L6.2 12.2C7.8 13.8 10.3 13.8 11.9 12.2L16 8Z" />
              </g>
              <defs>
                <clipPath id="clip0_45_392">
                  <rect width="18" height="18" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <select
            id={id}
            name={name}
            value={value}
            className={styles.select}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              }
            }}
          >
            <option value="">{emptyItemText}</option>
            {options.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  emptyItemText: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.object,
};

Select.propTypes = {
  /**
   * The id
   */
  id: PropTypes.string,
  /**
   * The name
   */
  name: PropTypes.string,
  /**
   * The label
   */
  label: PropTypes.string,
  /**
   * The selected value
   */
  value: PropTypes.string,
  /**
   * Text for the first empty item
   */
  emptyItemText: PropTypes.string,
  /**
   * Is the select optional or required?
   */
  required: PropTypes.bool,
  /**
   * The options
   */
  options: PropTypes.array,
  /**
   * Errors
   */
  errors: PropTypes.array,
};

Select.defaultProps = {};
