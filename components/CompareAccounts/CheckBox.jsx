const CheckBox = ({ id, name, label, value, onChange }) => {
  return (
    <div key={name} className="flex">
      <div className="mr-2 flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="w-4 h-4 rounded accent-pink-600"
        />
      </div>
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
