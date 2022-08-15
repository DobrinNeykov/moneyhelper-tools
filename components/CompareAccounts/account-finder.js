import { getDayOfYear, getHours } from "date-fns";

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

    if (this._filters.sort === "random") {
      return this.shuffle(matches);
    }
  }

  shuffle(array) {
    let seed = this.generateSeed();
    var m = array.length;
    var t;
    var i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(this.random(seed) * m--); // <-- MODIFIED LINE

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed; // <-- ADDED LINE
    }

    return array;
  }

  random(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  generateSeed() {
    // This allows us to generate a stable search sort, which will only change every other hour.
    // We add this number to the day of the year so that we get 365 more possible seeds.
    const now = new Date();
    return getDayOfYear(now) + getHours(now);
  }
}

export default AccountFinder;
