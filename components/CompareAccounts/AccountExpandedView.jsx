import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

import ExpandableSection from "./ExpandableSection";
import AccountCheckboxes from "./AccountCheckboxes";

const AccountExpandedView = ({ account }) => {
  return (
    <div className="space-y-4">
      <ExpandableSection
        title="Show all account fees and charges"
        expandedTitle="Hide all account fees and charges"
      >
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
                                <div className="border-b grid grid-cols-2">
                                  <div className="">{item.title}</div>
                                  <div>{item.value}</div>
                                </div>
                              )}
                              {item.type === "read-more" && (
                                <div>{item.value}</div>
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
