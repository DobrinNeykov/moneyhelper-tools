import AccountFinder from "./account-finder";
import AccountList from "./account-list";

describe("AccountFinder", () => {
  const buildFakeFilters = (props) => {
    props = props || {};

    props.order = props.order || "random";
    props.accountTypes = props.accountTypes || [];
    props.accountFeatures = props.accountFeatures || [];
    props.accountAccess = props.accountAccess || [];

    return props;
  };

  it("finds accounts by name", () => {
    const accounts = new AccountList({
      items: [{ productName: "Bluey" }, { productName: "Bingo" }],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ searchQuery: "bluey" })
    ).find();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Bluey");
  });

  it("finds accounts by provider name", () => {
    const accounts = new AccountList({
      items: [
        { providerName: "HSBC" },
        { productName: "Match me", providerName: "Starling" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ searchQuery: "starling" })
    ).find();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Match me");
  });

  it("filters accounts by type, features, and access", () => {
    const accounts = new AccountList({
      items: [
        {
          productName: "Matching 1",
          accountType: "young person",
          bacsSwitchService: "true",
          internetBanking: "true",
        },
        {
          productName: "Matching 2",
          accountType: "premier",
          bacsSwitchService: "true",
          internetBanking: "true",
        },
        {
          productName: "Not Matching 1",
          accountType: "standard",
        },
        {
          productName: "Not Matching 2",
          accountType: "standard",
          bacsSwitchService: "true",
        },
      ],
    });

    const filters = buildFakeFilters({
      accountTypes: ["Children/young person", "Premier"],
      accountFeatures: ["7-day switching"],
      accountAccess: ["Internet banking"],
    });

    const result = new AccountFinder(accounts, filters).find();
    const names = result.map((a) => a.name);

    expect(names).toContain("Matching 1");
    expect(names).toContain("Matching 2");
    expect(names).not.toContain("Not Matching 1");
    expect(names).not.toContain("Not Matching 2");
  });

  it("sorts accounts randomly by default", () => {
    const accounts = new AccountList({
      items: [
        { productName: "Account 1" },
        { productName: "Account 2" },
        { productName: "Account 3" },
        { productName: "Account 4" },
        { productName: "Account 5" },
        { productName: "Account 6" },
        { productName: "Account 7" },
        { productName: "Account 8" },
        { productName: "Account 9" },
        { productName: "Account 10" },
      ],
    });

    const result = new AccountFinder(accounts, buildFakeFilters()).find();

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
    const accounts = new AccountList({
      items: [
        { productName: "Account 1", providerName: "C" },
        { productName: "Account 2", providerName: "A" },
        { productName: "Account 3", providerName: "B" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "provider-name-a-z" })
    ).find();

    expect(result.map((a) => a.name)).toEqual([
      "Account 2",
      "Account 3",
      "Account 1",
    ]);
  });

  it("sorts accounts by provider name Z-A", () => {
    const accounts = new AccountList({
      items: [
        { productName: "Account 1", providerName: "C" },
        { productName: "Account 2", providerName: "A" },
        { productName: "Account 3", providerName: "B" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "provider-name-z-a" })
    ).find();

    expect(result.map((a) => a.name)).toEqual([
      "Account 1",
      "Account 3",
      "Account 2",
    ]);
  });

  it("sorts accounts by account name A-Z", () => {
    const accounts = new AccountList({
      items: [{ productName: "B" }, { productName: "C" }, { productName: "A" }],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "account-name-a-z" })
    ).find();

    expect(result.map((a) => a.name)).toEqual(["A", "B", "C"]);
  });

  it("sorts accounts by account name Z-A", () => {
    const accounts = new AccountList({
      items: [{ productName: "B" }, { productName: "C" }, { productName: "A" }],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "account-name-z-a" })
    ).find();

    expect(result.map((a) => a.name)).toEqual(["C", "B", "A"]);
  });

  it("sorts accounts by monthly fee", () => {
    const accounts = new AccountList({
      items: [
        { productName: "A", monthlyCharge: "9.32" },
        { productName: "B", monthlyCharge: "19.22" },
        { productName: "C", monthlyCharge: "1.12" },
        { productName: "D", monthlyCharge: "4.42" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "monthly-account-fee-lowest-first" })
    ).find();

    expect(result.map((a) => a.name).join("")).toEqual("CDAB");
  });

  it("sorts accounts by minimum monthly deposit", () => {
    const accounts = new AccountList({
      items: [
        { productName: "A", minimumMonthlyCredit: "9.32" },
        { productName: "B", minimumMonthlyCredit: "3.22" },
        { productName: "C", minimumMonthlyCredit: "2.12" },
        { productName: "D", minimumMonthlyCredit: "8.42" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "minimum-monthly-deposit-lowest-first" })
    ).find();

    expect(result.map((a) => a.name).join("")).toEqual("CBDA");
  });

  it("sorts accounts by arranged overdraft rate", () => {
    const accounts = new AccountList({
      items: [
        { productName: "A", representativeAPR: "39" },
        { productName: "B", representativeAPR: "33" },
        { productName: "C", representativeAPR: "89" },
        { productName: "D", representativeAPR: "8" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({ order: "arranged-overdraft-rate-lowest-first" })
    ).find();

    expect(result.map((a) => a.name).join("")).toEqual("DBAC");
  });

  it("sorts accounts by unarranged maximum monthly charge", () => {
    const accounts = new AccountList({
      items: [
        { productName: "A", unauthODMonthlyCap: "321.22" },
        { productName: "B", unauthODMonthlyCap: "89.12" },
        { productName: "C", unauthODMonthlyCap: "2.11" },
        { productName: "D", unauthODMonthlyCap: "8999.99" },
        { productName: "F", unauthODMonthlyCap: "" },
        { productName: "E", unauthODMonthlyCap: "Infinity" },
      ],
    });

    const result = new AccountFinder(
      accounts,
      buildFakeFilters({
        order: "unarranged-maximum-monthly-charge-lowest-first",
      })
    ).find();

    expect(result.map((a) => a.name).join("")).toEqual("EFCBAD");
  });
});
