import { dinero, isZero } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

import numeral from "numeral";

import { accountTypeLabelFromDefaqtoAccountType } from "./account-mapping";
import formatMoney from "./formatMoney";
import formatPercentage from "./formatPercentage";

class Account {
  constructor(json) {
    this._json = json;

    this.addMoneyField("monthlyFee", "monthlyCharge");
    this.addMoneyField("transactionFee");
    this.addMoneyField("debitEU50Cost");
    this.addMoneyField("debitWorld50Cost");
    this.addMoneyField("atmMaxFreeWithdrawalUK");
    this.addMoneyField("atmWithdrawalCharge");
    this.addMoneyField("atmEU50Cost");
    this.addMoneyField("atmWorld50Cost");
    this.addMoneyField("directDebitCharge");
    this.addMoneyField("standingOrderCharge");
    this.addMoneyField("bacsCharge");
    this.addMoneyField("fasterPaymentsCharge");
    this.addMoneyField("chapsCharge");
    this.addMoneyField("payOutEUMinChrg");
    this.addMoneyField("payOutEUMaxChrg");
    this.addMoneyField("payOutWorldMinChrg");
    this.addMoneyField("payOutWorldMaxChrg");
    this.addMoneyField("payInEUMinChrg");
    this.addMoneyField("payInEUMaxChrg");
    this.addMoneyField("payInWorldMinChrg");
    this.addMoneyField("payInWorldMaxChrg");
    this.addMoneyField("stoppedChequeCharge");
  }

  addMoneyField(name, nameInDefaqtoAPI) {
    nameInDefaqtoAPI = nameInDefaqtoAPI || name;

    if (this._json[nameInDefaqtoAPI] === "Infinity") {
      this[name] = null;
      return;
    }

    const float = numeral(this._json[nameInDefaqtoAPI]);
    const cents = Math.round(float.value() * 100);
    this[name] = dinero({ amount: cents, currency: GBP });
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
    return numeral(this._json.representativeAPR || 0).value();
  }

  get unauthorisedOverdraftEar() {
    return numeral(this._json.unauthorisedOverdraftEar || 0).value();
  }

  get atmWithdrawalChargePercent() {
    return numeral(this._json.atmWithdrawalChargePercent || 0).value();
  }

  get unauthODMonthlyCap() {
    return this._json.unauthODMonthlyCap;
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
                value: formatPercentage(this.representativeAPR),
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
                value: formatPercentage(this.unauthorisedOverdraftEar),
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
          {
            title: "In pounds in the UK",
            items: [
              {
                type: "detail",
                title: "£ cost per debit card transaction",
                value: formatMoney(this.transactionFee),
              },
              {
                type: "read-more",
                value: this._json.transactionFeeBrochure,
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - £50 debit card transaction in the EU",
                value: formatMoney(this.debitEU50Cost),
              },
              {
                type: "detail",
                title: "Example - £50 debit card transaction worldwide",
                value: formatMoney(this.debitWorld50Cost),
              },
              {
                type: "read-more",
                value: this._json.intDebitCardPayDetail,
              },
            ],
          },
        ],
      },
      {
        title: "Cash withdrawal fees",
        sections: [
          {
            title: "In pounds in the UK",
            items: [
              {
                type: "detail",
                title: "Limit of fee-free cash withdrawals",
                value: formatMoney(this.atmMaxFreeWithdrawalUK),
              },
              {
                type: "detail",
                title: "£ cost per withdrawal",
                value: formatMoney(this.atmWithdrawalCharge),
              },
              {
                type: "detail",
                title: "% cost per withdrawal",
                value: formatPercentage(this.atmWithdrawalChargePercent),
              },
              {
                type: "read-more",
                value: this._json.ukCashWithdrawalDetail,
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - withdrawing £50 in the EU",
                value: formatMoney(this.atmEU50Cost),
              },
              {
                type: "detail",
                title: "Example - withdrawing £50 worldwide",
                value: formatMoney(this.atmWorld50Cost),
              },
              {
                type: "read-more",
                value: this._json.intCashWithdrawDetail,
              },
            ],
          },
        ],
      },
      {
        title: "Payment fees",
        sections: [
          {
            title: "Sending money within the UK",
            items: [
              {
                type: "detail",
                title: "Direct debit",
                value: formatMoney(this.directDebitCharge),
              },
              {
                type: "detail",
                title: "Standing order",
                value: formatMoney(this.standingOrderCharge),
              },
              {
                type: "detail",
                title: "BACS payment",
                value: formatMoney(this.bacsCharge),
              },
              {
                type: "detail",
                title: "Faster Payments",
                value: formatMoney(this.fasterPaymentsCharge),
              },
              {
                type: "detail",
                title: "CHAPS",
                value: formatMoney(this.chapsCharge),
              },
            ],
          },
          {
            title: "Sending money outside of the UK",
            items: [
              {
                type: "detail",
                title: "To the EU",
                value:
                  formatMoney(this.payOutEUMinChrg) +
                  " - " +
                  formatMoney(this.payOutEUMaxChrg),
              },
              {
                type: "detail",
                title: "To worldwide",
                value: "fdsfsd",
                value:
                  formatMoney(this.payOutWorldMinChrg) +
                  " - " +
                  formatMoney(this.payOutWorldMaxChrg),
              },
              {
                type: "read-more",
                value: this._json.intPaymentsOutDetail,
              },
            ],
          },
          {
            title: "Receiving money from outside of the UK",
            items: [
              {
                type: "detail",
                title: "From the EU",
                value:
                  formatMoney(this.payInEUMinChrg) +
                  " - " +
                  formatMoney(this.payInEUMaxChrg),
              },
              {
                type: "detail",
                title: "From worldwide",
                value:
                  formatMoney(this.payInWorldMinChrg) +
                  " - " +
                  formatMoney(this.payInWorldMaxChrg),
              },
              {
                type: "read-more",
                value: this._json.intPaymentsInDetail,
              },
            ],
          },
        ],
      },
      {
        title: "Other fees",
        sections: [
          {
            items: [
              {
                type: "detail",
                title: "Cancelling a cheque",
                value: formatMoney(this.stoppedChequeCharge),
              },
              {
                type: "read-more",
                value: this._json.otherChargesBrochure,
              },
            ],
          },
        ],
      },
    ];
  }
}

export default Account;
