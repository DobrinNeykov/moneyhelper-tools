import slug from "slug";
import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

class AccountFinder {
  constructor(serverQuery, accounts) {
    this._serverQuery = serverQuery;
    this._accounts = accounts;
  }

  requestedAccountTypes() {
    const types = listAccountTypes();
    return types.filter((t) => !!this._serverQuery[slug(t)]);
  }

  requestedAccountFeatures() {
    const features = listAccountFeatures();
    return features.filter((f) => !!this._serverQuery[slug(f)]);
  }

  requestedAccountAccess() {
    const access = listAccountAccess();
    return access.filter((a) => !!this._serverQuery[slug(a)]);
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
    if (accountTypes.length !== 0) {
      matches = matches.filter((a) => accountTypes.indexOf(a.type) !== -1);
    }

    const accountFeatures = this.requestedAccountFeatures();
    if (accountFeatures.length !== 0) {
      matches = matches.filter((a) =>
        accountFeatures.some((r) => a.features.includes(r))
      );
    }

    const accountAccess = this.requestedAccountAccess();
    if (accountAccess.length !== 0) {
      matches = matches.filter((a) =>
        accountAccess.some((r) => a.access.includes(r))
      );
    }

    return matches;
  }
}

export default AccountFinder;
