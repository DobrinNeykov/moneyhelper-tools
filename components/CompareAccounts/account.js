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
    this.addMoneyField("unauthODMonthlyCap");
    this.addMoneyField("minimumMonthlyCredit");
    this.addMoneyField("arrangedODExample1");
    this.addMoneyField("arrangedODExample2");
    this.addMoneyField("debitCardIssueFee");
    // Yes, there is a typo in this field value.
    this.addMoneyField("debitCardReplacementFee", "debitCardReplacemntFee");

    this.addTextField("monthlyChargeBrochure");
    this.addTextField("minimumMonthlyCreditBrochure");
    this.addTextField("otherChargesBrochure");
    this.addTextField("intPaymentsInDetail");
    this.addTextField("intPaymentsOutDetail");
    this.addTextField("intCashWithdrawDetail");
    this.addTextField("ukCashWithdrawalDetail");
    this.addTextField("intDebitCardPayDetail");
    this.addTextField("transactionFeeBrochure");
    // Yes, there is a typo in this field value.
    this.addTextField(
      "debitCardReplacementFeeBrochure",
      "debitCardReplacemntFeeBrochure"
    );
    this.addTextField("unpaidItemDetail");
    this.addTextField("paidItemDetail");
    this.addTextField("unarrangedODDetail");
    this.addTextField("arrangedODDetail");
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

  addTextField(name, nameInDefaqtoAPI) {
    const value = this._json[nameInDefaqtoAPI || name];
    const isEmpty =
      !value || ["0", "0.00", "0.00. <br /> ", "0 <br /> "].includes(value);

    if (!isEmpty) {
      this[name] = value.replaceAll("{P}", "");
    }
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

  get details() {
    return [
      { title: "Monthly account fee", value: formatMoney(this.monthlyFee) },
      {
        title: "Min. monthly deposit requirement",
        value: formatMoney(this.minimumMonthlyCredit),
      },
      {
        title: "Arranged overdraft interest rate",
        value: formatPercentage(this.representativeAPR),
      },
      {
        title: "Unarranged overdraft max. monthly charge",
        value: formatMoney(this.unauthODMonthlyCap),
      },
    ];
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
      results.push("7-day switching");
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
                value: this.monthlyChargeBrochure,
              },
              {
                type: "detail",
                title: "Minimum monthly deposit",
                value: formatMoney(this.minimumMonthlyCredit),
              },
              {
                type: "read-more",
                value: this.minimumMonthlyCreditBrochure,
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
                value: this.arrangedODDetail,
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
                value: this.unauthODMonthlyCap
                  ? formatMoney(this.unauthODMonthlyCap)
                  : "Data not available",
              },
              {
                type: "read-more",
                value: this.unarrangedODDetail,
              },
            ],
          },
          {
            title: "Other related fees",
            items: [
              {
                type: "detail",
                title: "Refusing a payment due to a lack of funds",
                value: this.unpaidItemDetail,
              },
              {
                type: "detail",
                title: "Allowing a payment despite a lack of funds",
                value: this.paidItemDetail,
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
                value: this.debitCardReplacementFeeBrochure,
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
                value: this.transactionFeeBrochure,
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
                value: this.intDebitCardPayDetail,
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
                value: this.atmMaxFreeWithdrawalUK
                  ? formatMoney(this.atmMaxFreeWithdrawalUK)
                  : "No limit",
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
                value: this.ukCashWithdrawalDetail,
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
                value: this.intCashWithdrawDetail,
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
                value: this.payOutEUMaxChrg
                  ? [
                      formatMoney(this.payOutEUMinChrg),
                      formatMoney(this.payOutEUMaxChrg),
                    ].join(" - ")
                  : [
                      "Minimum charge: ",
                      formatMoney(this.payOutEUMinChrg),
                    ].join(""),
              },
              {
                type: "detail",
                title: "To worldwide",
                value: this.payOutWorldMaxChrg
                  ? [
                      formatMoney(this.payOutWorldMinChrg),
                      formatMoney(this.payOutWorldMaxChrg),
                    ].join(" - ")
                  : [
                      "Minimum charge: ",
                      formatMoney(this.payOutWorldMinChrg),
                    ].join(""),
              },
              {
                type: "read-more",
                value: this.intPaymentsOutDetail,
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
                value: this.intPaymentsInDetail,
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
                value: this.otherChargesBrochure,
              },
            ],
          },
        ],
      },
    ];
  }
}

export default Account;
