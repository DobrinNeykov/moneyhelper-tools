import React, { useId } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Primary UI component for user interaction
 */
export const Errors = ({ label, errors, children, ...props }) => {
  const hasErrors = errors && errors.length > 0;
  const id = useId();

  return (
    <div>
      <div
        className={classNames({
          "border-0 border-l-4 pl-2 border-red-700 border-solid": hasErrors,
        })}
      >
        {label && (
          <label htmlFor={id} className="inline-block text-gray-800 mb-2">
            {label}
          </label>
        )}
        {hasErrors &&
          errors.map((e) => (
            <label key={e} htmlFor={id} className="block text-red-700 mb-2">
              {e}
            </label>
          ))}
        <div>{children}</div>
      </div>
    </div>
  );
};

Errors.propTypes = {
  /**
   * The label text
   */
  label: PropTypes.string.isRequired,
  /**
   * Errors
   */
  errors: PropTypes.array,
};

Errors.defaultProps = {
  label: "The Label",
  errors: ["This field is required"],
};
