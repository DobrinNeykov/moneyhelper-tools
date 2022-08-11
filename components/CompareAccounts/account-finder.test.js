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

    const query = { "childrens-and-young-persons-accounts-under-18": "on" };

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
});