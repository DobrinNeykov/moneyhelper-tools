import Filters from "./filters";

class AccountFinder {
  constructor(serverQuery, accounts) {
    this._filters = new Filters(serverQuery);
    this._accounts = accounts;
  }

  find() {
    let matches = this._accounts.items;

    if (this._filters.query) {
      const needle = this._filters.query.toLowerCase();
      matches = matches.filter((a) => {
        const haystack = [a.name, a.providerName].join(" ").toLowerCase();
        return haystack.indexOf(needle) > -1;
      });
    }

    const accountTypes = this._filters.accountTypes;
    if (accountTypes.length !== 0) {
      matches = matches.filter((a) => accountTypes.indexOf(a.type) !== -1);
    }

    const accountFeatures = this._filters.accountFeatures;
    if (accountFeatures.length !== 0) {
      matches = matches.filter((a) =>
        accountFeatures.some((r) => a.features.includes(r))
      );
    }

    const accountAccess = this._filters.accountAccess;
    if (accountAccess.length !== 0) {
      matches = matches.filter((a) =>
        accountAccess.some((r) => a.access.includes(r))
      );
    }

    return matches;
  }
}

export default AccountFinder;
