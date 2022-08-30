const AccountCheckboxes = ({ title, fields }) => {
  return (
    <div>
      <div className="mb-3 text-lg font-bold font-gray-700">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center space-x-2">
            {field.checked ? (
              <div className="text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="24"
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                  ></path>
                </svg>
              </div>
            )}
            <div>{field.label}</div>
            {field.checked ? (
              <div className="sr-only">&nbsp;(checked)</div>
            ) : (
              <div className="sr-only">&nbsp;(not checked)</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountCheckboxes;
