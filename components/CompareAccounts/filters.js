import slug from "slug";
import queryString from "query-string";

import {
  listAccountTypes,
  listAccountFeatures,
  listAccountAccess,
} from "./account-mapping";

class Filters {
  constructor(serverQuery) {
    this._serverQuery = serverQuery;
  }

  get query() {
    return this._serverQuery.q;
  }

  get accountTypes() {
    const types = listAccountTypes();
    return types.filter((t) => !!this._serverQuery[slug(t)]);
  }

  get accountFeatures() {
    const features = listAccountFeatures();
    return features.filter((f) => !!this._serverQuery[slug(f)]);
  }

  get accountAccess() {
    const access = listAccountAccess();
    return access.filter((a) => !!this._serverQuery[slug(a)]);
  }

  get count() {
    let result = 0;

    if (this.query) {
      result++;
    }
    result += this.accountTypes.length;
    result += this.accountFeatures.length;
    result += this.accountAccess.length;

    return result;
  }

  get sort() {
    return this._serverQuery.order || "random";
  }

  withoutFilter(filter) {
    const serverQuery = { ...this._serverQuery };
    delete serverQuery[slug(filter)];

    return new Filters(serverQuery);
  }

  withoutQuery() {
    const serverQuery = { ...this._serverQuery };
    delete serverQuery["q"];

    return new Filters(serverQuery);
  }

  get href() {
    return "?" + queryString.stringify(this._serverQuery);
  }
}

export default Filters;
