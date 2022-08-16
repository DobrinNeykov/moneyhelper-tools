import { DebounceInput } from "react-debounce-input";
import classNames from "classnames";

const SearchInput = ({ id, name, value, className, onChange }) => {
  return (
    <DebounceInput
      id={id}
      minLength={2}
      debounceTimeout={300}
      name={name}
      type="text"
      className={classNames("border", "rounded", "py-1", "px-2", className)}
      onChange={onChange}
      value={value}
    />
  );
};

export default SearchInput;
