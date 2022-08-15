import { getDayOfYear, getHours } from "date-fns";
import { greaterThan } from "dinero.js";
import formatMoney from "./formatMoney.js";

class AccountFinder {
  constructor(filters, accounts) {
    this._filters = filters;
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

    const order = this._filters.order;

    if (order === "random") {
      return this.shuffle(matches);
    } else if (order === "provider-name-a-z") {
      return this.orderByStringField("providerName", matches);
    } else if (order === "account-name-a-z") {
      return this.orderByStringField("name", matches);
    } else if (order === "monthly-account-fee-lowest-first") {
      return this.orderByMoneyField("monthlyFee", matches);
    } else if (order === "minimum-monthly-deposit-lowest-first") {
      return this.orderByMoneyField("minimumMonthlyCredit", matches);
    } else if (order === "arranged-overdraft-rate-lowest-first") {
      return this.orderByPercentageField("representativeAPR", matches);
    } else if (order === "unarranged-maximum-monthly-charge-lowest-first") {
      return this.orderByMoneyField("unauthODMonthlyCap", matches);
    }
  }

  orderByStringField(field, array) {
    return array.slice().sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  orderByPercentageField(field, array) {
    return array.slice().sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  orderByMoneyField(field, array) {
    return array.slice().sort((a, b) => {
      if (greaterThan(b[field], a[field])) {
        return -1;
      } else if (greaterThan(a[field], b[field])) {
        return 1;
      } else {
        return 0;
      }
    });
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
