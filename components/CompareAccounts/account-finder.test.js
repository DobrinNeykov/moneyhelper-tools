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

  it("filters accounts when filters are present", () => {
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
});
