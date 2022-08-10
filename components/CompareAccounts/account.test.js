import Account from "./account";

import { dinero, equal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";

describe("Account", () => {
  it("has some fields", () => {
    const account = new Account({
      id: "2323",
      providerName: "The Provider",
      productName: "The Name",
      representativeAPR: "APR",
      unauthODMonthlyCap: "Cap",
    });

    expect(account.id).toEqual("2323");
    expect(account.providerName).toEqual("The Provider");
    expect(account.name).toEqual("The Name");
    expect(account.representativeAPR).toEqual("APR");
    expect(account.unauthODMonthlyCap).toEqual("Cap");
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

  it("has a monthly fee", () => {
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

  it("has account access details", () => {
    const account = new Account({
      branchBanking: "true",
      internetBanking: "true",
      mobilePhoneApp: "true",
      postOfficeBanking: "true",
    });

    expect(account.accountAccess.branchBanking).toBeTruthy();
    expect(account.accountAccess.internetBanking).toBeTruthy();
    expect(account.accountAccess.mobilePhoneBanking).toBeTruthy();
    expect(account.accountAccess.postOfficeBanking).toBeTruthy();
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
});
