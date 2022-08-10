import slug from "slug";
import { listAccountTypes } from "./account-mapping";

class AccountFinder {
  constructor(serverQuery, accounts) {
    this._serverQuery = serverQuery;
    this._accounts = accounts;
  }

  requestedAccountTypes() {
    const types = listAccountTypes();
    console.log(types);
    console.log(this._serverQuery);
    return types.filter((t) => !!this._serverQuery[slug(t)]);
  }

  find() {
    let matches = this._accounts.items;

    if (this._serverQuery.q) {
      // remote matches that don't contain search string
      const needle = this._serverQuery.q.toLowerCase();
      matches = matches.filter((a) => {
        const haystack = [a.name, a.providerName].join(" ").toLowerCase();
        return haystack.indexOf(needle) > -1;
      });
    }

    const accountTypes = this.requestedAccountTypes();
    console.log(accountTypes);
    if (accountTypes.length !== 0) {
      // keep only matches that have account types in the list
      matches = matches.filter((a) => accountTypes.indexOf(a.type) !== -1);
    }

    return matches;
  }
}

export default AccountFinder;
