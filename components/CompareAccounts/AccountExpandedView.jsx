import { useId } from "react";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

import ExpandableSection from "./ExpandableSection";
import AccountCheckboxes from "./AccountCheckboxes";

const AccountExpandedView = ({ account }) => {
  const Detail = ({ title, value }) => {
    return (
      <div className="border-b grid grid-cols-2">
        <div className="">{title}</div>
        <div>{value}</div>
      </div>
    );
  };

  const ReadMore = ({ value }) => {
    const truncate = (str, max = 10) => {
      const array = str.trim().split(" ");

      return [array.slice(0, max).join(" "), array.slice(max).join(" ")];
    };
    const [summary, truncated] = truncate(value);

    const id = useId();
    return (
      <div className="">
        <div className="inline">{summary}</div>
        {truncated && (
          <>
            <input id={id} type="checkbox" className="peer opacity-0 w-0" />
            <div className="inline peer-focus:hidden">...</div>
            <div className="hidden peer-focus:inline"> {truncated}</div>{" "}
            <label
              htmlFor={id}
              className="cursor-pointer select-none inline underline text-pink-800 peer-focus:hidden"
            >
              [read more]
            </label>
            <label
              htmlFor={id}
              className="cursor-pointer select-none hidden underline text-pink-800 peer-focus:inline"
            >
              [read less]
            </label>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <ExpandableSection title="Account details and fees">
        <div className="space-y-4">
          <AccountCheckboxes
            title="Account access options"
            fields={listAccountAccess().map((a) => ({
              label: a,
              checked: account.access.includes(a),
            }))}
          />
          <AccountCheckboxes
            title="Account features"
            fields={listAccountFeatures().map((a) => ({
              label: a,
              checked: account.features.includes(a),
            }))}
          />
          <div>
            <div className="mb-3 text-lg font-bold">Account fees and costs</div>
            {account.expanded.map((group) => (
              <div key={group.title} className="">
                <ExpandableSection title={group.title}>
                  <div className="space-y-4">
                    {group.sections.map((section, i) => (
                      <div key={i}>
                        {section.title && (
                          <div className="text-lg font-bold mb-3">
                            {section.title}
                          </div>
                        )}
                        <div className="space-y-4">
                          {section.items.map((item, i) => (
                            <div key={i}>
                              {item.type === "detail" && (
                                <Detail title={item.title} value={item.value} />
                              )}
                              {item.type === "read-more" && item.value && (
                                <ReadMore value={item.value} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ExpandableSection>
              </div>
            ))}
          </div>
        </div>
      </ExpandableSection>
    </div>
  );
};

export default AccountExpandedView;
