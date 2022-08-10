import { dinero, isZero } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

import numeral from "numeral";

import { accountTypeLabelFromDefaqtoAccountType } from "./account-mapping";

class Account {
  constructor(json) {
    this._json = json;
  }

  get id() {
    return this._json.id;
  }

  get providerName() {
    return this._json.providerName;
  }

  get name() {
    return this._json.productName;
  }

  get url() {
    const prefix = "https://";
    if (this._json.productLandingPageURL.indexOf(prefix) === 0) {
      return this._json.productLandingPageURL;
    } else {
      return [prefix, this._json.productLandingPageURL].join("");
    }
  }

  get type() {
    const label = accountTypeLabelFromDefaqtoAccountType(
      this._json.accountType
    );
    return label;
  }

  get representativeAPR() {
    return this._json.representativeAPR;
  }

  get unauthODMonthlyCap() {
    return this._json.unauthODMonthlyCap;
  }

  get monthlyFee() {
    const float = numeral(this._json.monthlyCharge);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get accountAccess() {
    const trueValue = "true";

    return {
      branchBanking: this._json.branchBanking === trueValue,
      internetBanking: this._json.internetBanking === trueValue,
      mobilePhoneBanking: this._json.mobilePhoneApp === trueValue,
      postOfficeBanking: this._json.postOfficeBanking === trueValue,
    };
  }

  get accountFeatures() {
    return {
      chequeBook: this._json.chequeBook === "Yes",
      noMonthlyFee: isZero(this.monthlyFee),
      openToNewCustomers: !(this._json.existingCustomer === "true"),
      overdraftFacility: this._json.overdraftFacility === "true",
      supportsSevenDaySwitching: this._json.bacsSwitchService === "true",
    };
  }
}

export default Account;
