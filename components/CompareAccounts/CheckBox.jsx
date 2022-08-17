const CheckBox = ({ id, name, label, value, onChange }) => {
  return (
    <label className="mr-2 flex items-center py-1 space-x-2 cursor-pointer">
      <div className="w-8 h-8">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="w-8 h-8 rounded accent-pink-600 focus:shadow-focus-outline outline-none cursor-pointer"
        />
      </div>
      <div className="text-lg text-gray-900">{label}</div>
    </label>
  );
};

export default CheckBox;
