import { dinero, isZero } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

import numeral from "numeral";

import { accountTypeLabelFromDefaqtoAccountType } from "./account-mapping";
import formatMoney from "./formatMoney";
import formatPercentage from "./formatPercentage";

const hydrateAccountFromJson = (json) => {
  const retrieveUrl = () => {
    const prefix = "https://";
    if (json.productLandingPageURL.indexOf(prefix) === 0) {
      return json.productLandingPageURL;
    } else {
      return [prefix, json.productLandingPageURL].join("");
    }
  };

  const result = {
    id: json.id,
    name: json.productName,
    providerName: json.providerName,
    url: retrieveUrl(),
    type: accountTypeLabelFromDefaqtoAccountType(json.accountType),
  };

  const retrieveMoneyField = (nameInDefaqtoAPI) => {
    if (json[nameInDefaqtoAPI] === "Infinity") {
      return null;
    }

    const float = numeral(json[nameInDefaqtoAPI]);
    const cents = Math.round(float.value() * 100);
    return dinero({ amount: cents, currency: GBP }).toJSON();
  };

  const retrieveTextField = (nameInDefaqtoAPI) => {
    const value = json[nameInDefaqtoAPI];
    const isEmpty =
      !value || ["0", "0.00", "0.00. <br /> ", "0 <br /> "].includes(value);

    if (!isEmpty) {
      return value
        .replaceAll("{P}", "")
        .replaceAll("<br/>", "")
        .replaceAll("<br />", "");
    }

    return null;
  };

  const retrieveNumberField = (name) => {
    return numeral(json[name] || 0).value();
  };

  const details = () => {
    return [
      { title: "Monthly account fee", value: formatMoney(result.monthlyFee) },
      {
        title: "Min. monthly deposit requirement",
        value: formatMoney(result.minimumMonthlyCredit),
      },
      {
        title: "Arranged overdraft interest rate",
        value: formatPercentage(result.representativeAPR),
      },
      {
        title: "Unarranged overdraft max. monthly charge",
        value: formatMoney(result.unauthODMonthlyCap),
      },
    ];
  };

  const access = () => {
    const results = [];
    const trueValue = "true";

    if (json.branchBanking === trueValue) {
      results.push("Branch banking");
    }
    if (json.internetBanking === trueValue) {
      results.push("Internet banking");
    }
    if (json.mobilePhoneApp === trueValue) {
      results.push("Mobile app banking");
    }
    if (json.postOfficeBanking === trueValue) {
      results.push("Post Office banking");
    }

    return results;
  };

  const features = () => {
    const results = [];

    if (json.chequeBook === "Yes") {
      results.push("Cheque book available");
    }

    if (!result.monthlyFee || isZero(dinero(result.monthlyFee))) {
      results.push("No monthly fee");
    }

    if (json.existingCustomer !== "true") {
      results.push("Open to new customers");
    }

    if (json.overdraftFacility === "true") {
      results.push("Overdraft facilities");
    }

    if (json.bacsSwitchService === "true") {
      results.push("7-day switching");
    }

    return results;
  };

  const expanded = () => {
    return [
      {
        title: "General account fees",
        sections: [
          {
            items: [
              {
                type: "detail",
                title: "Maintaining the account",
                value: formatMoney(result.monthlyFee),
              },
              {
                type: "read-more",
                value: result.monthlyChargeBrochure,
              },
              {
                type: "detail",
                title: "Minimum monthly deposit",
                value: formatMoney(result.minimumMonthlyCredit),
              },
              {
                type: "read-more",
                value: result.minimumMonthlyCreditBrochure,
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
                value: formatPercentage(result.representativeAPR),
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 7 days",
                value: formatMoney(result.arrangedODExample1),
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 30 days",
                value: formatMoney(result.arrangedODExample2),
              },
              {
                type: "read-more",
                value: result.arrangedODDetail,
              },
            ],
          },
          {
            title: "Unarranged overdraft",
            items: [
              {
                type: "detail",
                title: "Annual interest rate (APR/EAR)",
                value: formatPercentage(result.unauthorisedOverdraftEar),
              },
              {
                type: "detail",
                title: "Monthly Maximum Charge",
                value: result.unauthODMonthlyCap
                  ? formatMoney(result.unauthODMonthlyCap)
                  : "Data not available",
              },
              {
                type: "read-more",
                value: result.unarrangedODDetail,
              },
            ],
          },
          {
            title: "Other related fees",
            items: [
              {
                type: "detail",
                title: "Refusing a payment due to a lack of funds",
                value: result.unpaidItemDetail,
              },
              {
                type: "detail",
                title: "Allowing a payment despite a lack of funds",
                value: result.paidItemDetail,
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
                value: formatMoney(result.debitCardIssueFee),
              },
              {
                type: "detail",
                title: "Card replacement fee",
                value: formatMoney(result.debitCardReplacementFee),
              },
              {
                type: "read-more",
                value: result.debitCardReplacementFeeBrochure,
              },
            ],
          },
          {
            title: "In pounds in the UK",
            items: [
              {
                type: "detail",
                title: "£ cost per debit card transaction",
                value: formatMoney(result.transactionFee),
              },
              {
                type: "read-more",
                value: result.transactionFeeBrochure,
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - £50 debit card transaction in the EU",
                value: formatMoney(result.debitEU50Cost),
              },
              {
                type: "detail",
                title: "Example - £50 debit card transaction worldwide",
                value: formatMoney(result.debitWorld50Cost),
              },
              {
                type: "read-more",
                value: result.intDebitCardPayDetail,
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
                value: result.atmMaxFreeWithdrawalUK
                  ? formatMoney(result.atmMaxFreeWithdrawalUK)
                  : "No limit",
              },
              {
                type: "detail",
                title: "£ cost per withdrawal",
                value: formatMoney(result.atmWithdrawalCharge),
              },
              {
                type: "detail",
                title: "% cost per withdrawal",
                value: formatPercentage(result.atmWithdrawalChargePercent),
              },
              {
                type: "read-more",
                value: result.ukCashWithdrawalDetail,
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - withdrawing £50 in the EU",
                value: formatMoney(result.atmEU50Cost),
              },
              {
                type: "detail",
                title: "Example - withdrawing £50 worldwide",
                value: formatMoney(result.atmWorld50Cost),
              },
              {
                type: "read-more",
                value: result.intCashWithdrawDetail,
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
                value: formatMoney(result.directDebitCharge),
              },
              {
                type: "detail",
                title: "Standing order",
                value: formatMoney(result.standingOrderCharge),
              },
              {
                type: "detail",
                title: "BACS payment",
                value: formatMoney(result.bacsCharge),
              },
              {
                type: "detail",
                title: "Faster Payments",
                value: formatMoney(result.fasterPaymentsCharge),
              },
              {
                type: "detail",
                title: "CHAPS",
                value: formatMoney(result.chapsCharge),
              },
            ],
          },
          {
            title: "Sending money outside of the UK",
            items: [
              {
                type: "detail",
                title: "To the EU",
                value: result.payOutEUMaxChrg
                  ? [
                      formatMoney(result.payOutEUMinChrg),
                      formatMoney(result.payOutEUMaxChrg),
                    ].join(" - ")
                  : [
                      "Minimum charge: ",
                      formatMoney(result.payOutEUMinChrg),
                    ].join(""),
              },
              {
                type: "detail",
                title: "To worldwide",
                value: result.payOutWorldMaxChrg
                  ? [
                      formatMoney(result.payOutWorldMinChrg),
                      formatMoney(result.payOutWorldMaxChrg),
                    ].join(" - ")
                  : [
                      "Minimum charge: ",
                      formatMoney(result.payOutWorldMinChrg),
                    ].join(""),
              },
              {
                type: "read-more",
                value: result.intPaymentsOutDetail,
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
                  formatMoney(result.payInEUMinChrg) +
                  " - " +
                  formatMoney(result.payInEUMaxChrg),
              },
              {
                type: "detail",
                title: "From worldwide",
                value:
                  formatMoney(result.payInWorldMinChrg) +
                  " - " +
                  formatMoney(result.payInWorldMaxChrg),
              },
              {
                type: "read-more",
                value: result.intPaymentsInDetail,
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
                value: formatMoney(result.stoppedChequeCharge),
              },
              {
                type: "read-more",
                value: result.otherChargesBrochure,
              },
            ],
          },
        ],
      },
    ];
  };

  // Yes, this field is renamed.
  result["monthlyFee"] = retrieveMoneyField("monthlyCharge");
  result["transactionFee"] = retrieveMoneyField("transactionFee");
  result["debitEU50Cost"] = retrieveMoneyField("debitEU50Cost");
  result["debitWorld50Cost"] = retrieveMoneyField("debitWorld50Cost");
  result["atmMaxFreeWithdrawalUK"] = retrieveMoneyField(
    "atmMaxFreeWithdrawalUK"
  );
  result["atmWithdrawalCharge"] = retrieveMoneyField("atmWithdrawalCharge");
  result["atmEU50Cost"] = retrieveMoneyField("atmEU50Cost");
  result["atmWorld50Cost"] = retrieveMoneyField("atmWorld50Cost");
  result["directDebitCharge"] = retrieveMoneyField("directDebitCharge");
  result["standingOrderCharge"] = retrieveMoneyField("standingOrderCharge");
  result["bacsCharge"] = retrieveMoneyField("bacsCharge");
  result["fasterPaymentsCharge"] = retrieveMoneyField("fasterPaymentsCharge");
  result["chapsCharge"] = retrieveMoneyField("chapsCharge");
  result["payOutEUMinChrg"] = retrieveMoneyField("payOutEUMinChrg");
  result["payOutEUMaxChrg"] = retrieveMoneyField("payOutEUMaxChrg");
  result["payOutWorldMinChrg"] = retrieveMoneyField("payOutWorldMinChrg");
  result["payOutWorldMaxChrg"] = retrieveMoneyField("payOutWorldMaxChrg");
  result["payInEUMinChrg"] = retrieveMoneyField("payInEUMinChrg");
  result["payInEUMaxChrg"] = retrieveMoneyField("payInEUMaxChrg");
  result["payInWorldMinChrg"] = retrieveMoneyField("payInWorldMinChrg");
  result["payInWorldMaxChrg"] = retrieveMoneyField("payInWorldMaxChrg");
  result["stoppedChequeCharge"] = retrieveMoneyField("stoppedChequeCharge");
  result["unauthODMonthlyCap"] = retrieveMoneyField("unauthODMonthlyCap");
  result["minimumMonthlyCredit"] = retrieveMoneyField("minimumMonthlyCredit");
  result["arrangedODExample1"] = retrieveMoneyField("arrangedODExample1");
  result["arrangedODExample2"] = retrieveMoneyField("arrangedODExample2");
  result["debitCardIssueFee"] = retrieveMoneyField("debitCardIssueFee");
  // Yes, there is a typo in this field value.
  result["debitCardReplacementFee"] = retrieveMoneyField(
    "debitCardReplacemntFee"
  );

  result["monthlyChargeBrochure"] = retrieveTextField("monthlyChargeBrochure");
  result["minimumMonthlyCreditBrochure"] = retrieveTextField(
    "minimumMonthlyCreditBrochure"
  );
  result["otherChargesBrochure"] = retrieveTextField("otherChargesBrochure");
  result["intPaymentsInDetail"] = retrieveTextField("intPaymentsInDetail");
  result["intPaymentsOutDetail"] = retrieveTextField("intPaymentsOutDetail");
  result["intCashWithdrawDetail"] = retrieveTextField("intCashWithdrawDetail");
  result["ukCashWithdrawalDetail"] = retrieveTextField(
    "ukCashWithdrawalDetail"
  );
  result["intDebitCardPayDetail"] = retrieveTextField("intDebitCardPayDetail");
  result["transactionFeeBrochure"] = retrieveTextField(
    "transactionFeeBrochure"
  );
  // Yes, there is a typo in this field value.
  result["debitCardReplacementFeeBrochure"] = retrieveTextField(
    "debitCardReplacemntFeeBrochure"
  );
  result["unpaidItemDetail"] = retrieveTextField("unpaidItemDetail");
  result["paidItemDetail"] = retrieveTextField("paidItemDetail");
  result["unarrangedODDetail"] = retrieveTextField("unarrangedODDetail");
  result["arrangedODDetail"] = retrieveTextField("arrangedODDetail");

  result["representativeAPR"] = retrieveNumberField("representativeAPR");
  result["unauthorisedOverdraftEar"] = retrieveNumberField(
    "unauthorisedOverdraftEar"
  );
  result["atmWithdrawalChargePercent"] = retrieveNumberField(
    "atmWithdrawalChargePercent"
  );

  result["details"] = details();
  result["features"] = features();
  result["access"] = access();
  result["expanded"] = expanded();

  return result;
};

export default hydrateAccountFromJson;
