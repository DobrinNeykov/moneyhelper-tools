import AccountFinder from "./account-finder";
import AccountList from "./account-list";

describe("AccountFinder", () => {
  it("finds accounts by name", () => {
    const accounts = new AccountList({
      items: [{ productName: "Bluey" }, { productName: "Bingo" }],
    });

    const query = { q: "bluey" };

    const finder = new AccountFinder(query, accounts);
    const result = finder.find();

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

    const query = { q: "starling" };

    const finder = new AccountFinder(query, accounts);
    const result = finder.find();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Match me");
  });

  it("filters accounts by type", () => {
    const accounts = new AccountList({
      items: [
        { accountType: "standard" },
        { productName: "Young Person Account", accountType: "young person" },
      ],
    });

    const query = { "childrens-and-young-persons-under-18": "on" };

    const finder = new AccountFinder(query, accounts);
    const result = finder.find();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Young Person Account");
  });

  it("filters accounts by features", () => {
    const accounts = new AccountList({
      items: [
        { productName: "Account without switch service" },
        {
          productName: "Account with switch service",
          bacsSwitchService: "true",
        },
      ],
    });

    const query = { "supports-7-day-switching": "on" };

    const finder = new AccountFinder(query, accounts);
    const result = finder.find();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Account with switch service");
  });

  it("filters accounts by access", () => {
    const accounts = new AccountList({
      items: [
        { productName: "Account without internet banking" },
        {
          productName: "Account with internet banking",
          internetBanking: "true",
        },
      ],
    });

    const query = { "internet-banking": "on" };
    const finder = new AccountFinder(query, accounts);
    const result = finder.find();
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Account with internet banking");
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

    const finder = new AccountFinder({}, accounts);
    const result = finder.find();
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

  it("sorts accounts by provider name", () => {
    const accounts = new AccountList({
      items: [
        { productName: "Account 1", providerName: "C" },
        { productName: "Account 2", providerName: "A" },
        { productName: "Account 3", providerName: "B" },
      ],
    });

    const finder = new AccountFinder({ order: "provider-name-a-z" }, accounts);
    const result = finder.find();
    expect(result.map((a) => a.name)).toEqual([
      "Account 2",
      "Account 3",
      "Account 1",
    ]);
  });

  it("sorts accounts by account name", () => {
    const accounts = new AccountList({
      items: [{ productName: "B" }, { productName: "C" }, { productName: "A" }],
    });

    const finder = new AccountFinder({ order: "account-name-a-z" }, accounts);
    const result = finder.find();
    expect(result.map((a) => a.name)).toEqual(["A", "B", "C"]);
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
      { order: "monthly-account-fee-lowest-first" },
      accounts
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
      { order: "minimum-monthly-deposit-lowest-first" },
      accounts
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
      { order: "arranged-overdraft-rate-lowest-first" },
      accounts
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
      ],
    });

    const result = new AccountFinder(
      { order: "unarranged-maximum-monthly-charge-lowest-first" },
      accounts
    ).find();

    expect(result.map((a) => a.name).join("")).toEqual("CBAD");
  });
});
