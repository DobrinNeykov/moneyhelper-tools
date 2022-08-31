import { getYear, getDayOfYear, getHours } from "date-fns";
import { dinero, greaterThan } from "dinero.js";
import formatMoney from "./formatMoney.js";

const findAccounts = (
  accounts,
  { searchQuery, order, accountTypes, accountFeatures, accountAccess }
) => {
  const searchMatches = (matches) => {
    if (searchQuery) {
      const needle = searchQuery.toLowerCase();
      matches = matches.filter((a) => {
        const haystack = [a.name, a.providerName].join(" ").toLowerCase();
        return haystack.indexOf(needle) > -1;
      });
    }

    return matches;
  };

  const orderMatches = (matches) => {
    if (order === "random") {
      return shuffle(matches);
    } else if (order === "provider-name-a-z") {
      return orderByStringField("providerName", matches);
    } else if (order === "provider-name-z-a") {
      return orderByStringFieldInReverse("providerName", matches);
    } else if (order === "account-name-a-z") {
      return orderByStringField("name", matches);
    } else if (order === "account-name-z-a") {
      return orderByStringFieldInReverse("name", matches);
    } else if (order === "monthly-account-fee-lowest-first") {
      return orderByMoneyField("monthlyFee", matches);
    } else if (order === "minimum-monthly-deposit-lowest-first") {
      return orderByMoneyField("minimumMonthlyCredit", matches);
    } else if (order === "arranged-overdraft-rate-lowest-first") {
      return orderByPercentageField("representativeAPR", matches);
    } else if (order === "unarranged-maximum-monthly-charge-lowest-first") {
      return orderByMoneyField("unauthODMonthlyCap", matches);
    }
  };

  const filterMatches = (matches) => {
    if (
      accountTypes.length === 0 &&
      accountFeatures.length === 0 &&
      accountAccess.length === 0
    ) {
      return matches;
    }

    return matches.filter((a) => {
      return (
        (accountTypes.length === 0 || accountTypes.includes(a.type)) &&
        (accountFeatures.length === 0 ||
          accountFeatures.every((r) => a.features.includes(r))) &&
        (accountAccess.length === 0 ||
          accountAccess.every((r) => a.access.includes(r)))
      );
    });
  };

  const orderByStringField = (field, array) => {
    return array.slice().sort((a, b) => (a[field] > b[field] ? 1 : -1));
  };

  const orderByStringFieldInReverse = (field, array) => {
    return array.slice().sort((a, b) => (a[field] < b[field] ? 1 : -1));
  };

  const orderByPercentageField = (field, array) => {
    return array.slice().sort((a, b) => (a[field] > b[field] ? 1 : -1));
  };

  const orderByMoneyField = (field, array) => {
    return array.slice().sort((a, b) => {
      if (!a[field]) {
        return -1;
      } else if (!b[field]) {
        return 1;
      }

      if (greaterThan(dinero(b[field]), dinero(a[field]))) {
        return -1;
      } else if (greaterThan(dinero(a[field]), dinero(b[field]))) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const shuffle = (array) => {
    let seed = generateSeed();
    var m = array.length;
    var t;
    var i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed; // <-- ADDED LINE
    }

    return array;
  };

  const random = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const generateSeed = () => {
    // This allows us to generate a stable search sort, which will only change every other hour.
    // We add this number to the day of the year so that we get 365 more possible seeds.
    const now = new Date();
    return getYear(now) + getDayOfYear(now) + getHours(now);
  };

  let matches = accounts;

  matches = searchMatches(matches);
  matches = filterMatches(matches);
  matches = orderMatches(matches);

  return matches;
};

export default findAccounts;
