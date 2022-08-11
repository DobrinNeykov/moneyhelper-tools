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

  it("has a human readable account type", () => {
    expect(new Account({ accountType: "standard" }).type).toEqual(
      "Standard current accounts"
    );
    expect(new Account({ accountType: "fee free basic account" }).type).toEqual(
      "Fee-free basic bank accounts"
    );
    expect(new Account({ accountType: "student" }).type).toEqual(
      "Student accounts"
    );
    expect(new Account({ accountType: "premier" }).type).toEqual(
      "Premier accounts"
    );
    expect(new Account({ accountType: "e-money account" }).type).toEqual(
      "Prepaid cards"
    );
    expect(new Account({ accountType: "added value" }).type).toEqual(
      "Packaged accounts"
    );
    expect(new Account({ accountType: "young person" }).type).toEqual(
      "Children's and young person's accounts (under 18)"
    );
    expect(new Account({ accountType: "graduate" }).type).toEqual(
      "Graduate accounts"
    );
  });

  it("has a monthlyFee", () => {
    expect(
      equal(
        new Account({ monthlyCharge: "0.00" }).monthlyFee,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ monthlyCharge: "122.98" }).monthlyFee,
        dinero({ amount: 12298, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has a minimumMonthlyCredit", () => {
    expect(
      equal(
        new Account({ minimumMonthlyCredit: "0" }).minimumMonthlyCredit,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ minimumMonthlyCredit: "122" }).minimumMonthlyCredit,
        dinero({ amount: 12200, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has an arrangedODExample1", () => {
    expect(
      equal(
        new Account({ arrangedODExample1: "0" }).arrangedODExample1,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ arrangedODExample1: "122.09" }).arrangedODExample1,
        dinero({ amount: 12209, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has an arrangedODExample2", () => {
    expect(
      equal(
        new Account({ arrangedODExample2: "0" }).arrangedODExample2,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ arrangedODExample2: "8.22" }).arrangedODExample2,
        dinero({ amount: 822, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has an unauthODMonthlyCap", () => {
    expect(
      equal(
        new Account({ unauthODMonthlyCap: "0" }).unauthODMonthlyCap,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ unauthODMonthlyCap: "32.01" }).unauthODMonthlyCap,
        dinero({ amount: 3201, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has a debitCardIssueFee", () => {
    expect(
      equal(
        new Account({ debitCardIssueFee: "0" }).debitCardIssueFee,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ debitCardIssueFee: "21.01" }).debitCardIssueFee,
        dinero({ amount: 2101, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has a debitCardReplacementFee", () => {
    expect(
      equal(
        new Account({ debitCardReplacemntFee: "0" }).debitCardReplacementFee,
        dinero({ amount: 0, currency: GBP })
      )
    ).toBeTruthy();

    expect(
      equal(
        new Account({ debitCardReplacemntFee: "12.08" })
          .debitCardReplacementFee,
        dinero({ amount: 1208, currency: GBP })
      )
    ).toBeTruthy();
  });

  it("has a representativeAPR", () => {
    expect(new Account({ representativeAPR: "43" }).representativeAPR).toEqual(
      "43%"
    );

    expect(new Account({ representativeAPR: "" }).representativeAPR).toEqual(
      "0%"
    );
  });

  it("has a unauthorisedOverdraftEar", () => {
    expect(
      new Account({ unauthorisedOverdraftEar: "42" }).unauthorisedOverdraftEar
    ).toEqual("42%");

    expect(
      new Account({ unauthorisedOverdraftEar: "" }).unauthorisedOverdraftEar
    ).toEqual("0%");
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
      "Supports 7-day switching"
    );
    expect(new Account({ bacsSwitchService: "false" }).features).not.toContain(
      "Supports 7-day switching"
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
            items: [],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [],
          },
        ],
      },
      {
        title: "Cash withdrawal fees",
        sections: [
          {
            title: "In pounds in the UK",
            items: [],
          },
          {
            title: "In a foreign currency outside of the UK",
            items: [],
          },
        ],
      },
      {
        title: "Payment fees",
        sections: [
          {
            title: "Sending money within the UK",
            items: [],
          },
          {
            title: "Sending money outside of the UK",
            items: [],
          },
          {
            title: "Receiving money from outside of the UK",
            items: [],
          },
        ],
      },
      {
        title: "Other fees",
        sections: [
          {
            items: [],
          },
        ],
      },
    ]);
  });
});
