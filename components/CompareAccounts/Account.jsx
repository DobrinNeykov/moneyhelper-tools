import AccountExpandedView from "./AccountExpandedView";

const Account = ({ account }) => {
  return (
    <div className="border border-slate-400 rounded-bl-3xl py-4 px-6">
      <div className="md:flex items-center">
        <div className="flex-grow text-2xl font-bold text-blue-900 mb-2">
          {account.providerName}
        </div>
        <div className="mb-2">
          <a
            href={account.url}
            target="_blank"
            rel="noreferrer"
            className="underline text-pink-900 flex items-center space-x-1"
          >
            <div>
              <span>Visit provider</span>
              <div className="sr-only"> {account.providerName} </div>
              <span>&nbsp;website</span>
              <div className="sr-only"> for account {account.name}</div>
            </div>

            <span className="sr-only">(opens in a new window)</span>
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.80582 0.443208L1.80581 3.27164L7.32125 3.27164C8.16978 3.27164 8.80617 3.90803 8.80617 4.75656L8.87688 10.3427L11.7053 10.3427L11.7053 4.40301C11.7053 2.14027 9.93754 0.372498 7.6748 0.372498L1.80582 0.443208Z"
                  fill="#AE0060"
                />
                <rect
                  x="2.81836"
                  y="11.4521"
                  width="3"
                  height="10"
                  transform="rotate(-135 2.81836 11.4521)"
                  fill="#AE0060"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div className="text-lg text-gray-900 mb-4">{account.name}</div>

      <table className="md:hidden table-fixed w-full mb-4">
        <tbody>
          {account.details.map(({ title, value }) => (
            <tr key={title} className="border-b border-slate-400">
              <td className="py-2 pr-3">{title}</td>
              <td className="font-bold">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="hidden md:block mb-4">
        <div className="grid grid-cols-4 gap-2 divide-x-2 border-slate-400">
          {account.details.map(({ title }) => (
            <div key={title} className="first:pl-0 pl-3 px-2">
              {title}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 divide-x-2">
          {account.details.map(({ value }) => (
            <div key={value} className="first:pl-0 pl-3 px-2 font-bold">
              {value}
            </div>
          ))}
        </div>
      </div>

      <AccountExpandedView account={account} />
    </div>
  );
};

export default Account;
