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

  get access() {
    const results = [];
    const trueValue = "true";

    if (this._json.branchBanking === trueValue) {
      results.push("Branch banking");
    }
    if (this._json.internetBanking === trueValue) {
      results.push("Internet banking");
    }
    if (this._json.mobilePhoneApp === trueValue) {
      results.push("Mobile app banking");
    }
    if (this._json.postOfficeBanking === trueValue) {
      results.push("Post Office banking");
    }

    return results;
  }

  get features() {
    const results = [];

    if (this._json.chequeBook === "Yes") {
      results.push("Cheque book available");
    }

    if (isZero(this.monthlyFee)) {
      results.push("No monthly fee");
    }

    if (this._json.existingCustomer !== "true") {
      results.push("Open to new customers");
    }

    if (this._json.overdraftFacility === "true") {
      results.push("Overdraft facilities");
    }

    if (this._json.bacsSwitchService === "true") {
      results.push("Supports 7-day switching");
    }

    return results;
  }
}

export default Account;
