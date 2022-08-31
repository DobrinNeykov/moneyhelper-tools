import findAccounts from "./findAccounts";
import hydrateAccountFromJson from "./hydrateAccountFromJson";

describe("findAccounts", () => {
  const buildFakeAccount = (props) => {
    return Object.assign(
      {
        accountType: "standard",
        monthlyCharge: "0.00",
        productLandingPageURL: "www.blah.com",
      },
      props
    );
  };

  const buildFakeFilters = (props) => {
    props = props || {};

    props.order = props.order || "random";
    props.accountTypes = props.accountTypes || [];
    props.accountFeatures = props.accountFeatures || [];
    props.accountAccess = props.accountAccess || [];

    return props;
  };

  it("finds accounts by name", () => {
    const result = findAccounts(
      [
        hydrateAccountFromJson(
          buildFakeAccount({ productName: "Bluey" }, { productName: "Bingo" })
        ),
      ],
      buildFakeFilters({ searchQuery: "bluey" })
    );

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Bluey");
  });

  it("finds accounts by provider name", () => {
    const result = findAccounts(
      [
        hydrateAccountFromJson(buildFakeAccount({ providerName: "HSBC" })),
        hydrateAccountFromJson(
          buildFakeAccount({
            productName: "Match me",
            providerName: "Starling",
          })
        ),
      ],
      buildFakeFilters({ searchQuery: "starling" })
    );

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Match me");
  });

  it("filters accounts by type, features, and access", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({
          productName: "Matching 1",
          accountType: "young person",
          bacsSwitchService: "true",
          internetBanking: "true",
        })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({
          productName: "Matching 2",
          accountType: "premier",
          bacsSwitchService: "true",
          internetBanking: "true",
        })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({
          productName: "Not Matching 1",
          accountType: "standard",
        })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({
          productName: "Not Matching 2",
          accountType: "standard",
          bacsSwitchService: "true",
        })
      ),
    ];

    const filters = buildFakeFilters({
      accountTypes: ["Children/young person", "Premier"],
      accountFeatures: ["7-day switching"],
      accountAccess: ["Internet banking"],
    });

    const result = findAccounts(accounts, filters);
    const names = result.map((a) => a.name);

    expect(names).toContain("Matching 1");
    expect(names).toContain("Matching 2");
    expect(names).not.toContain("Not Matching 1");
    expect(names).not.toContain("Not Matching 2");
  });

  it("sorts accounts randomly by default", () => {
    const accounts = [
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 1" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 2" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 3" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 4" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 5" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 6" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 7" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 8" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 9" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "Account 10" })),
    ];

    const result = findAccounts(accounts, buildFakeFilters());

    expect(result.map((a) => a.name)).not.toEqual([
      "Account 1",
      "Account 2",
      "Account 3",
      "Account 4",
      "Account 5",
      "Account 6",
      "Account 7",
      "Account 8",
      "Account 9",
      "Account 10",
    ]);
  });

  it("sorts accounts by provider name A-Z", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 1", providerName: "C" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 2", providerName: "A" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 3", providerName: "B" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "provider-name-a-z" })
    );

    expect(result.map((a) => a.name)).toEqual([
      "Account 2",
      "Account 3",
      "Account 1",
    ]);
  });

  it("sorts accounts by provider name Z-A", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 1", providerName: "C" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 2", providerName: "A" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "Account 3", providerName: "B" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "provider-name-z-a" })
    );

    expect(result.map((a) => a.name)).toEqual([
      "Account 1",
      "Account 3",
      "Account 2",
    ]);
  });

  it("sorts accounts by account name A-Z", () => {
    const accounts = [
      hydrateAccountFromJson(buildFakeAccount({ productName: "B" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "C" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "A" })),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "account-name-a-z" })
    );

    expect(result.map((a) => a.name)).toEqual(["A", "B", "C"]);
  });

  it("sorts accounts by account name Z-A", () => {
    const accounts = [
      hydrateAccountFromJson(buildFakeAccount({ productName: "B" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "C" })),
      hydrateAccountFromJson(buildFakeAccount({ productName: "A" })),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "account-name-z-a" })
    );

    expect(result.map((a) => a.name)).toEqual(["C", "B", "A"]);
  });

  it("sorts accounts by monthly fee", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "A", monthlyCharge: "9.32" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "B", monthlyCharge: "19.22" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "C", monthlyCharge: "1.12" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "D", monthlyCharge: "4.42" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "monthly-account-fee-lowest-first" })
    );

    expect(result.map((a) => a.name).join("")).toEqual("CDAB");
  });

  it("sorts accounts by minimum monthly deposit", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "A", minimumMonthlyCredit: "9.32" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "B", minimumMonthlyCredit: "3.22" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "C", minimumMonthlyCredit: "2.12" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "D", minimumMonthlyCredit: "8.42" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "minimum-monthly-deposit-lowest-first" })
    );

    expect(result.map((a) => a.name).join("")).toEqual("CBDA");
  });

  it("sorts accounts by arranged overdraft rate", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "A", representativeAPR: "39" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "B", representativeAPR: "33" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "C", representativeAPR: "89" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "D", representativeAPR: "8" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({ order: "arranged-overdraft-rate-lowest-first" })
    );

    expect(result.map((a) => a.name).join("")).toEqual("DBAC");
  });

  it("sorts accounts by unarranged maximum monthly charge", () => {
    const accounts = [
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "A", unauthODMonthlyCap: "321.22" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "B", unauthODMonthlyCap: "89.12" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "C", unauthODMonthlyCap: "2.11" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "D", unauthODMonthlyCap: "8999.99" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "F", unauthODMonthlyCap: "" })
      ),
      hydrateAccountFromJson(
        buildFakeAccount({ productName: "E", unauthODMonthlyCap: "Infinity" })
      ),
    ];

    const result = findAccounts(
      accounts,
      buildFakeFilters({
        order: "unarranged-maximum-monthly-charge-lowest-first",
      })
    );

    expect(result.map((a) => a.name).join("")).toEqual("EFCBAD");
  });
});
