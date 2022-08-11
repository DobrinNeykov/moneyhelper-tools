import { dinero, isZero } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

import numeral from "numeral";

import { accountTypeLabelFromDefaqtoAccountType } from "./account-mapping";
import formatMoney from "./formatMoney";

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
    return `${this._json.representativeAPR || 0}%`;
  }

  get unauthorisedOverdraftEar() {
    return `${this._json.unauthorisedOverdraftEar || 0}%`;
  }

  get unauthODMonthlyCap() {
    return this._json.unauthODMonthlyCap;
  }

  get monthlyFee() {
    const float = numeral(this._json.monthlyCharge);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get minimumMonthlyCredit() {
    const float = numeral(this._json.minimumMonthlyCredit);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get arrangedODExample1() {
    const float = numeral(this._json.arrangedODExample1);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get arrangedODExample2() {
    const float = numeral(this._json.arrangedODExample2);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get unauthODMonthlyCap() {
    const float = numeral(this._json.unauthODMonthlyCap);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get debitCardIssueFee() {
    const float = numeral(this._json.debitCardIssueFee);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP });
  }

  get debitCardReplacementFee() {
    // Yes, there is a typo in this field value.
    const float = numeral(this._json.debitCardReplacemntFee);
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

  get expanded() {
    return [
      {
        title: "General account fees",
        sections: [
          {
            items: [
              {
                type: "detail",
                title: "Maintaining the account",
                value: formatMoney(this.monthlyFee),
              },
              {
                type: "read-more",
                value: this._json.monthlyChargeBrochure,
              },
              {
                type: "detail",
                title: "Minimum monthly deposit",
                value: formatMoney(this.minimumMonthlyCredit),
              },
              {
                type: "read-more",
                value: this._json.minimumMonthlyCreditBrochure,
              },
            ],
          },
        ],
      },
      {
        title: "Overdraft fees",
        sections: [
          {
            title: "Arranged overdraft",
            items: [
              {
                type: "detail",
                title: "Annual interest rate (APR)",
                value: this.representativeAPR,
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 7 days",
                value: formatMoney(this.arrangedODExample1),
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 30 days",
                value: formatMoney(this.arrangedODExample2),
              },
              {
                type: "read-more",
                value: this._json.arrangedODDetail,
              },
            ],
          },
          {
            title: "Unarranged overdraft",
            items: [
              {
                type: "detail",
                title: "Annual interest rate (APR/EAR)",
                value: this.unauthorisedOverdraftEar,
              },
              {
                type: "detail",
                title: "Monthly Maximum Charge",
                value: formatMoney(this.unauthODMonthlyCap),
              },
              {
                type: "read-more",
                value: this._json.unarrangedODDetail,
              },
            ],
          },
          {
            title: "Other related fees",
            items: [
              {
                type: "detail",
                title: "Refusing a payment due to a lack of funds",
                value: this._json.unpaidItemDetail,
              },
              {
                type: "detail",
                title: "Allowing a payment despite a lack of funds",
                value: this._json.paidItemDetail,
              },
            ],
          },
        ],
      },
      {
        title: "Debit card fees",
        sections: [
          {
            items: [
              {
                type: "detail",
                title: "Card issue fee",
                value: formatMoney(this.debitCardIssueFee),
              },
              {
                type: "detail",
                title: "Card replacement fee",
                value: formatMoney(this.debitCardReplacementFee),
              },
              {
                type: "read-more",
                value: this._json.debitCardReplacemntFeeBrochure,
              },
            ],
          },
        ],
      },
    ];
  }
}

export default Account;
