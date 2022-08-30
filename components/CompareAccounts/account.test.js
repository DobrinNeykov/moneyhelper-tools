import Account from "./account";

import { dinero, equal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

describe("Account", () => {
  it("has some fields", () => {
    const account = new Account({
      id: "2323",
      providerName: "The Provider",
      productName: "The Name",
    });

    expect(account.id).toEqual("2323");
    expect(account.providerName).toEqual("The Provider");
    expect(account.name).toEqual("The Name");
  });

  it("builds a url with a valid scheme, if required", () => {
    const accountWithoutScheme = new Account({
      productLandingPageURL: "www.blah.com",
    });
    expect(accountWithoutScheme.url).toEqual("https://www.blah.com");

    const accountWithScheme = new Account({
      productLandingPageURL: "https://www.blah.com",
    });
    expect(accountWithScheme.url).toEqual("https://www.blah.com");
  });

  it("has money fields", () => {
    const expectMoneyField = (name, nameInDefaqtoAPI) => {
      nameInDefaqtoAPI = nameInDefaqtoAPI || name;

      expect(
        equal(
          new Account({ [nameInDefaqtoAPI]: "0.00" })[name],
          dinero({ amount: 0, currency: GBP })
        )
      ).toBeTruthy();

      expect(
        equal(
          new Account({ [nameInDefaqtoAPI]: "21.98" })[name],
          dinero({ amount: 2198, currency: GBP })
        )
      ).toBeTruthy();

      expect(new Account({ [nameInDefaqtoAPI]: "Infinity" })[name]).toBeNull();
    };

    expectMoneyField("monthlyFee", "monthlyCharge");
    expectMoneyField("transactionFee");
    expectMoneyField("debitEU50Cost");
    expectMoneyField("debitWorld50Cost");
    expectMoneyField("atmMaxFreeWithdrawalUK");
    expectMoneyField("atmWithdrawalCharge");
    expectMoneyField("atmEU50Cost");
    expectMoneyField("atmWorld50Cost");
    expectMoneyField("directDebitCharge");
    expectMoneyField("standingOrderCharge");
    expectMoneyField("bacsCharge");
    expectMoneyField("fasterPaymentsCharge");
    expectMoneyField("chapsCharge");
    expectMoneyField("payOutEUMinChrg");
    expectMoneyField("payOutEUMaxChrg");
    expectMoneyField("payOutWorldMinChrg");
    expectMoneyField("payOutWorldMaxChrg");
    expectMoneyField("payInEUMinChrg");
    expectMoneyField("payInEUMaxChrg");
    expectMoneyField("payInWorldMinChrg");
    expectMoneyField("payInWorldMaxChrg");
    expectMoneyField("stoppedChequeCharge");
    expectMoneyField("unauthODMonthlyCap");
    expectMoneyField("minimumMonthlyCredit");
    expectMoneyField("arrangedODExample1");
    expectMoneyField("arrangedODExample2");
    expectMoneyField("debitCardIssueFee");
    // Yes, there is a typo in this field name.
    expectMoneyField("debitCardReplacementFee", "debitCardReplacemntFee");
  });

  it("has text fields", () => {
    const expectTextField = (name, nameInDefaqtoAPI) => {
      nameInDefaqtoAPI = nameInDefaqtoAPI || name;

      expect(new Account({ [nameInDefaqtoAPI]: "Some text" })[name]).toEqual(
        "Some text"
      );

      // the value has the string "{P}" in it for some reason
      expect(
        new Account({ [nameInDefaqtoAPI]: "Some text with {P}" })[name]
      ).toEqual("Some text with ");

      // the value has <br/> in it
      expect(
        new Account({ [nameInDefaqtoAPI]: "some<br/>string" })[name]
      ).toEqual("somestring");

      // the value has <br /> in it
      expect(
        new Account({ [nameInDefaqtoAPI]: "some<br />string" })[name]
      ).toEqual("somestring");

      // the value is just the string "0"
      expect(new Account({ [nameInDefaqtoAPI]: "0" })[name]).toBeUndefined();

      // the value is just the string "0.00"
      expect(new Account({ [nameInDefaqtoAPI]: "0.00" })[name]).toBeUndefined();

      // the value is just the string "0 <br /> "
      expect(
        new Account({ [nameInDefaqtoAPI]: "0 <br /> " })[name]
      ).toBeUndefined();
    };

    expectTextField("monthlyChargeBrochure");
    expectTextField("minimumMonthlyCreditBrochure");
    expectTextField("otherChargesBrochure");
    expectTextField("intPaymentsInDetail");
    expectTextField("intPaymentsOutDetail");
    expectTextField("intCashWithdrawDetail");
    expectTextField("ukCashWithdrawalDetail");
    expectTextField("intDebitCardPayDetail");
    expectTextField("transactionFeeBrochure");
    // Yes, there is a typo in this field value.
    expectTextField(
      "debitCardReplacementFeeBrochure",
      "debitCardReplacemntFeeBrochure"
    );
    expectTextField("unpaidItemDetail");
    expectTextField("paidItemDetail");
    expectTextField("unarrangedODDetail");
    expectTextField("arrangedODDetail");
  });

  it("has a human readable account type", () => {
    expect(new Account({ accountType: "standard" }).type).toEqual(
      "Standard current"
    );
    expect(new Account({ accountType: "fee free basic account" }).type).toEqual(
      "Fee-free basic bank"
    );
    expect(new Account({ accountType: "student" }).type).toEqual("Student");
    expect(new Account({ accountType: "premier" }).type).toEqual("Premier");
    expect(new Account({ accountType: "e-money account" }).type).toEqual(
      "E-money"
    );
    expect(new Account({ accountType: "added value" }).type).toEqual(
      "Packaged"
    );
    expect(new Account({ accountType: "young person" }).type).toEqual(
      "Children/young person"
    );
    expect(new Account({ accountType: "graduate" }).type).toEqual("Graduate");
  });

  it("has a representativeAPR", () => {
    expect(new Account({ representativeAPR: "43" }).representativeAPR).toEqual(
      43
    );

    expect(new Account({ representativeAPR: "" }).representativeAPR).toEqual(0);
  });

  it("has a unauthorisedOverdraftEar", () => {
    expect(
      new Account({ unauthorisedOverdraftEar: "42" }).unauthorisedOverdraftEar
    ).toEqual(42);

    expect(
      new Account({ unauthorisedOverdraftEar: "" }).unauthorisedOverdraftEar
    ).toEqual(0);
  });

  it("has an atmWithdrawalChargePercent", () => {
    expect(
      new Account({ atmWithdrawalChargePercent: "23" })
        .atmWithdrawalChargePercent
    ).toEqual(23);

    expect(
      new Account({ atmWithdrawalChargePercent: "" }).atmWithdrawalChargePercent
    ).toEqual(0);
  });

  it("has account access details", () => {
    const account1 = new Account({
      branchBanking: "true",
      internetBanking: "true",
      mobilePhoneApp: "true",
      postOfficeBanking: "true",
    });

    expect(account1.access).toContain("Branch banking");
    expect(account1.access).toContain("Internet banking");
    expect(account1.access).toContain("Mobile app banking");
    expect(account1.access).toContain("Post Office banking");

    const account2 = new Account({});
    expect(account2.access).not.toContain("Branch banking");
    expect(account2.access).not.toContain("Internet banking");
    expect(account2.access).not.toContain("Mobile app banking");
    expect(account2.access).not.toContain("Post Office banking");
  });

  it("has account features", () => {
    expect(new Account({ chequeBook: "Yes" }).features).toContain(
      "Cheque book available"
    );
    expect(new Account({ chequeBook: "Other" }).features).not.toContain(
      "Cheque book available"
    );

    expect(new Account({ monthlyCharge: "0.00" }).features).toContain(
      "No monthly fee"
    );
    expect(new Account({ monthlyCharge: "1.99" }).features).not.toContain(
      "No monthly fee"
    );

    expect(new Account({ existingCustomer: "false" }).features).toContain(
      "Open to new customers"
    );
    expect(new Account({ existingCustomer: "true" }).features).not.toContain(
      "Open to new customers"
    );

    expect(new Account({ overdraftFacility: "true" }).features).toContain(
      "Overdraft facilities"
    );
    expect(new Account({ overdraftFacility: "false" }).features).not.toContain(
      "Overdraft facilities"
    );

    expect(new Account({ bacsSwitchService: "true" }).features).toContain(
      "7-day switching"
    );
    expect(new Account({ bacsSwitchService: "false" }).features).not.toContain(
      "7-day switching"
    );
  });

  it("has expanded account details", () => {
    const account = new Account({
      monthlyCharge: "12.11",
      monthlyChargeBrochure: "this is some text bla bla",
      minimumMonthlyCredit: "10",
      minimumMonthlyCreditBrochure: "minimum monthly credit brochure",
      representativeAPR: "45",
      arrangedODExample1: "3.22",
      arrangedODExample2: "3.56",
      arrangedODDetail: "arranged od detail",
      unauthorisedOverdraftEar: "43.54",
      unauthODMonthlyCap: "32.31",
      unarrangedODDetail: "unarranged od detail",
      unpaidItemDetail: "unpaid item detail",
      paidItemDetail: "paid item detail",
      debitCardIssueFee: "12.33",
      debitCardReplacemntFee: "17.31",
      debitCardReplacemntFeeBrochure: "replacement fee brochure",
      transactionFee: "23.64",
      debitEU50Cost: "43.33",
      debitWorld50Cost: "65.23",
      atmMaxFreeWithdrawalUK: "512.34",
      atmWithdrawalCharge: "453.32",
      atmEU50Cost: "23.34",
      atmWorld50Cost: "54.32",
      directDebitCharge: "434.22",
      standingOrderCharge: "33.22",
      bacsCharge: "11.23",
      fasterPaymentsCharge: "65.56",
      chapsCharge: "54.44",
      payOutEUMinChrg: "67.23",
      payOutEUMaxChrg: "32.11",
      payOutWorldMinChrg: "64.23",
      payOutWorldMaxChrg: "23.21",
      payInEUMinChrg: "54.42",
      payInEUMaxChrg: "43.31",
      payInWorldMinChrg: "65.21",
      payInWorldMaxChrg: "53.23",
      stoppedChequeCharge: "23.11",
      transactionFeeBrochure: "text 1",
      intDebitCardPayDetail: "text 2",
      ukCashWithdrawalDetail: "text 3",
      intCashWithdrawDetail: "text 4",
      intPaymentsOutDetail: "text 5",
      intPaymentsInDetail: "text 6",
      otherChargesBrochure: "text 7",
    });

    expect(account.expanded).toEqual([
      {
        title: "General account fees",
        sections: [
          {
            items: [
              {
                type: "detail",
                title: "Maintaining the account",
                value: "£12.11",
              },
              {
                type: "read-more",
                value: "this is some text bla bla",
              },
              {
                type: "detail",
                title: "Minimum monthly deposit",
                value: "£10.00",
              },
              {
                type: "read-more",
                value: "minimum monthly credit brochure",
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
                value: "45%",
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 7 days",
                value: "£3.22",
              },
              {
                type: "detail",
                title: "Example - £ overdrawn for 30 days",
                value: "£3.56",
              },
              {
                type: "read-more",
                value: "arranged od detail",
              },
            ],
          },
          {
            title: "Unarranged overdraft",
            items: [
              {
                type: "detail",
                title: "Annual interest rate (APR/EAR)",
                value: "43.54%",
              },
              {
                type: "detail",
                title: "Monthly Maximum Charge",
                value: "£32.31",
              },
              {
                type: "read-more",
                value: "unarranged od detail",
              },
            ],
          },
          {
            title: "Other related fees",
            items: [
              {
                type: "detail",
                title: "Refusing a payment due to a lack of funds",
                value: "unpaid item detail",
              },
              {
                type: "detail",
                title: "Allowing a payment despite a lack of funds",
                value: "paid item detail",
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
                value: "£12.33",
              },
              {
                type: "detail",
                title: "Card replacement fee",
                value: "£17.31",
              },
              {
                type: "read-more",
                value: "replacement fee brochure",
              },
            ],
          },
          {
            title: "In pounds in the UK",
            items: [
              {
                type: "detail",
                title: "£ cost per debit card transaction",
                value: "£23.64",
              },
              {
                type: "read-more",
                value: "text 1",
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - £50 debit card transaction in the EU",
                value: "£43.33",
              },
              {
                type: "detail",
                title: "Example - £50 debit card transaction worldwide",
                value: "£65.23",
              },
              {
                type: "read-more",
                value: "text 2",
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
                value: "£512.34",
              },
              {
                type: "detail",
                title: "£ cost per withdrawal",
                value: "£453.32",
              },
              {
                type: "detail",
                title: "% cost per withdrawal",
                value: "0%",
              },
              {
                type: "read-more",
                value: "text 3",
              },
            ],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [
              {
                type: "detail",
                title: "Example - withdrawing £50 in the EU",
                value: "£23.34",
              },
              {
                type: "detail",
                title: "Example - withdrawing £50 worldwide",
                value: "£54.32",
              },
              {
                type: "read-more",
                value: "text 4",
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
                value: "£434.22",
              },
              {
                type: "detail",
                title: "Standing order",
                value: "£33.22",
              },
              {
                type: "detail",
                title: "BACS payment",
                value: "£11.23",
              },
              {
                type: "detail",
                title: "Faster Payments",
                value: "£65.56",
              },
              {
                type: "detail",
                title: "CHAPS",
                value: "£54.44",
              },
            ],
          },
          {
            title: "Sending money outside of the UK",
            items: [
              {
                type: "detail",
                title: "To the EU",
                value: "£67.23 - £32.11",
              },
              {
                type: "detail",
                title: "To worldwide",
                value: "£64.23 - £23.21",
              },
              {
                type: "read-more",
                value: "text 5",
              },
            ],
          },
          {
            title: "Receiving money from outside of the UK",
            items: [
              {
                type: "detail",
                title: "From the EU",
                value: "£54.42 - £43.31",
              },
              {
                type: "detail",
                title: "From worldwide",
                value: "£65.21 - £53.23",
              },
              {
                type: "read-more",
                value: "text 6",
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
                value: "£23.11",
              },
              {
                type: "read-more",
                value: "text 7",
              },
            ],
          },
        ],
      },
    ]);
  });

  it("special cases payOutEUMaxChrg", () => {
    expect(
      new Account({
        payOutEUMaxChrg: "32.11",
        payOutEUMinChrg: "67.23",
      }).expanded[4].sections[1].items[0]
    ).toEqual({
      type: "detail",
      title: "To the EU",
      value: "£67.23 - £32.11",
    });

    expect(
      new Account({
        payOutEUMaxChrg: "Infinity",
        payOutEUMinChrg: "67.23",
      }).expanded[4].sections[1].items[0]
    ).toEqual({
      type: "detail",
      title: "To the EU",
      value: "Minimum charge: £67.23",
    });
  });

  it("special cases payOutWorldMaxChrg", () => {
    expect(
      new Account({
        payOutWorldMinChrg: "19.23",
        payOutWorldMaxChrg: "31.18",
      }).expanded[4].sections[1].items[1]
    ).toEqual({
      type: "detail",
      title: "To worldwide",
      value: "£19.23 - £31.18",
    });

    expect(
      new Account({
        payOutWorldMinChrg: "19.23",
        payOutWorldMaxChrg: "Infinity",
      }).expanded[4].sections[1].items[1]
    ).toEqual({
      type: "detail",
      title: "To worldwide",
      value: "Minimum charge: £19.23",
    });
  });

  it("special cases unauthODMonthlyCap", () => {
    expect(
      new Account({
        unauthODMonthlyCap: "19.23",
      }).expanded[1].sections[1].items[1]
    ).toEqual({
      type: "detail",
      title: "Monthly Maximum Charge",
      value: "£19.23",
    });

    expect(
      new Account({
        unauthODMonthlyCap: "Infinity",
      }).expanded[1].sections[1].items[1]
    ).toEqual({
      type: "detail",
      title: "Monthly Maximum Charge",
      value: "Data not available",
    });
  });

  it("special cases atmMaxFreeWithdrawalUK", () => {
    expect(
      new Account({
        atmMaxFreeWithdrawalUK: "12.11",
      }).expanded[3].sections[0].items[0]
    ).toEqual({
      type: "detail",
      title: "Limit of fee-free cash withdrawals",
      value: "£12.11",
    });

    expect(
      new Account({
        atmMaxFreeWithdrawalUK: "Infinity",
      }).expanded[3].sections[0].items[0]
    ).toEqual({
      type: "detail",
      title: "Limit of fee-free cash withdrawals",
      value: "No limit",
    });
  });
});
