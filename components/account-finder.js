class AccountFinder {
  constructor(accounts) {
    this._accounts = accounts;
  }

  find({ query }) {
    if (!query) {
      return this._accounts.items;
    }

    const needle = query.toLowerCase();

    return this._accounts.items.filter((a) => {
      const haystack = [a.name, a.providerName].join(" ").toLowerCase();
      return haystack.indexOf(needle) > -1;
    });
  }
}

export default AccountFinder;
