import { useState, useEffect, useId } from "react";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

import ExpandableSection from "../ExpandableSection";
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
    const [show, setShow] = useState(true);

    useEffect(() => setShow(false), []);

    const truncate = (str, max = 30) => {
      const array = str.trim().split(" ");

      return [array.slice(0, max).join(" "), array.slice(max).join(" ")];
    };
    const [summary, truncated] = truncate(value);

    const id = useId();

    return (
      <div className="border-b pb-12 italic">
        <div className="inline">* {summary}</div>
        {truncated && (
          <>
            {show || <div className="inline">...</div>}
            {show && <div className="inline">&nbsp;{truncated}</div>}
            &nbsp;
            <button
              htmlFor={id}
              type="button"
              className="select-none inline underline text-pink-800"
              onClick={() => setShow((s) => !s)}
            >
              {show ? "[read less]" : "[read more]"}
            </button>
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
              <div key={group.title} className="ml-2">
                <ExpandableSection title={group.title}>
                  <div className="space-y-4 ml-4 mb-12">
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
