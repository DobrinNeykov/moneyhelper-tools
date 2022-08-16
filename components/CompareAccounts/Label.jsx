import classNames from "classnames";

const Label = ({ htmlFor, label, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "text-md",
        "font-grey-900",
        "mb-1",
        "block",
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;
