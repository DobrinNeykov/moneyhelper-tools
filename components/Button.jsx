import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, disabled, label, autoFocus, ...props }) => {
  const commonClasses = [
    "t2",
    "cursor-pointer",
    "p-3",
    "font-bold",
    "rounded-md",
    "outline-none",
    "shadow-bottom-gray",

    "disabled:cursor-not-allowed",
    "disabled:border-slate-400",
    "disabled:border",
    "disabled:bg-transparent",
    "disabled:text-gray-500",
    "disabled:shadow-none",
  ];

  const primaryClasses = commonClasses.concat([
    "border-0",
    "text-white",
    "bg-pink-600",

    "hover:bg-pink-800",

    "active:bg-pink-900",
    "active:border-yellow-200",
    "active:border-2",
    "active:shadow-none",

    "focus:bg-yellow-200",
    "focus:border-purple-700",
    "focus:border-2",
    "focus:text-gray-800",
    "focus:shadow-none",
  ]);

  const secondaryClasses = commonClasses.concat([
    "border",
    "border-pink-600",
    "text-pink-600",
    "bg-white",
    "shadow-bottom-gray",

    "hover:border",
    "hover:border-pink-800",
    "hover:text-pink-800",
    "hover:shadow-none",

    "active:text-gray-800",
    "active:border-purple-700",
    "active:border-2",
    "active:shadow-none",

    "focus:bg-yellow-200",
    "focus:border-purple-700",
    "focus:border-2",
    "focus:text-gray-800",
    "focus:shadow-none",
  ]);

  return (
    <button
      disabled={disabled}
      className={classNames(primary ? primaryClasses : secondaryClasses)}
      autoFocus={autoFocus}
      type="submit"
      {...props}
    >
      {label}
    </button>
  );
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
