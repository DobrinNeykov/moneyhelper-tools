const CheckBox = ({ id, name, label, description, value, onChange }) => {
  return (
    <label className="mr-2 flex items-center space-x-2 cursor-pointer select-none">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        aria-label={description}
        className="w-8 h-8 rounded accent-pink-600 focus:shadow-focus-outline outline-none cursor-pointer"
      />
      <div className="text-lg text-gray-900">{label}</div>
    </label>
  );
};

export default CheckBox;
