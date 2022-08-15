import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Select component
 */
export const Select = ({
  id,
  name,
  value,
  emptyItemText,
  hideEmptyItem,
  options,
  onChange,
  location,
  errors,
  required,
}) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <div className="">
      <div className="relative block focus-within:border-purple-600 border-transparent border focus-within:rounded focus-within:shadow-select-focus">
        <div className="">
          <span className="flex absolute pointer-events-none items-center inset-y-0 right-0 w-10 pl-2 text-white bg-pink-600 rounded-r shadow-bottom-gray focus:shadow-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="currentColor"
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
            className="text-gray-500 border-gray-400 border-y border-l w-full outline-none block text-md h-10 pl-3 pr-12 bg-white rounded focus:border-white"
            onChange={onChange}
          >
            {!hideEmptyItem && <option value="">{emptyItemText}</option>}
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
  /**
   * The id
   */
  id: PropTypes.string.isRequired,
  /**
   * The name
   */
  name: PropTypes.string.isRequired,
  /**
   * The selected value
   */
  value: PropTypes.string,
  /**
   * Hide the empty item?
   */
  hideEmptyItem: PropTypes.bool,
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
